import os
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/cafe_fausse")
TOTAL_TABLES = 30


def get_db():
    conn = psycopg2.connect(DATABASE_URL)
    return conn


def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS customers (
            customer_id   SERIAL PRIMARY KEY,
            customer_name VARCHAR(255) NOT NULL,
            email         VARCHAR(255) NOT NULL UNIQUE,
            phone_number  VARCHAR(50),
            newsletter_signup BOOLEAN DEFAULT FALSE
        );
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS reservations (
            reservation_id SERIAL PRIMARY KEY,
            customer_id    INTEGER REFERENCES customers(customer_id),
            time_slot      TIMESTAMPTZ NOT NULL,
            table_number   INTEGER NOT NULL,
            UNIQUE (time_slot, table_number)
        );
    """)
    # Add unique constraint to existing tables if missing (idempotent migration)
    cur.execute("""
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM pg_constraint
                WHERE conname = 'reservations_time_slot_table_number_key'
            ) THEN
                ALTER TABLE reservations
                ADD CONSTRAINT reservations_time_slot_table_number_key
                UNIQUE (time_slot, table_number);
            END IF;
        END $$;
    """)
    conn.commit()
    cur.close()
    conn.close()


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/reserve", methods=["POST"])
def reserve():
    data = request.get_json()

    # Validate required fields
    required = ["name", "email", "time_slot", "guests"]
    for field in required:
        if not data.get(field):
            return jsonify({"success": False, "message": f"Missing required field: {field}"}), 400

    name = data["name"].strip()
    email = data["email"].strip().lower()
    phone = data.get("phone", "").strip()
    time_slot = data["time_slot"]
    guests = data["guests"]
    newsletter = bool(data.get("newsletter", False))

    try:
        conn = get_db()
        conn.autocommit = False  # explicit transaction
        cur = conn.cursor(cursor_factory=RealDictCursor)

        # Lock all existing reservations for this time slot to prevent races.
        # Cast the incoming ISO string to TIMESTAMPTZ so comparison is exact.
        cur.execute(
            """
            SELECT table_number
            FROM reservations
            WHERE time_slot = %s::timestamptz
            FOR UPDATE
            """,
            (time_slot,)
        )
        booked = [row["table_number"] for row in cur.fetchall()]

        if len(booked) >= TOTAL_TABLES:
            conn.rollback()
            cur.close()
            conn.close()
            return jsonify({
                "success": False,
                "message": "Sorry, all tables are fully booked for that time slot. Please choose a different time."
            }), 409

        # Pick a random available table
        available = list(set(range(1, TOTAL_TABLES + 1)) - set(booked))
        table_number = random.choice(available)

        # Upsert customer
        cur.execute(
            """
            INSERT INTO customers (customer_name, email, phone_number, newsletter_signup)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (email) DO UPDATE
              SET customer_name = EXCLUDED.customer_name,
                  phone_number  = EXCLUDED.phone_number,
                  newsletter_signup = EXCLUDED.newsletter_signup
            RETURNING customer_id
            """,
            (name, email, phone or None, newsletter)
        )
        customer_id = cur.fetchone()["customer_id"]

        # Insert reservation — the UNIQUE(time_slot, table_number) constraint
        # acts as a final safety net against any concurrent duplicates.
        cur.execute(
            """
            INSERT INTO reservations (customer_id, time_slot, table_number)
            VALUES (%s, %s::timestamptz, %s)
            RETURNING reservation_id
            """,
            (customer_id, time_slot, table_number)
        )
        reservation_id = cur.fetchone()["reservation_id"]

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({
            "success": True,
            "message": f"Reservation confirmed! Your table #{table_number} is reserved for {time_slot}.",
            "reservation_id": reservation_id,
            "table_number": table_number
        })

    except Exception as e:
        try:
            conn.rollback()
            conn.close()
        except Exception:
            pass
        return jsonify({"success": False, "message": f"Server error: {str(e)}"}), 500


@app.route("/api/newsletter", methods=["POST"])
def newsletter():
    data = request.get_json()
    email = (data.get("email") or "").strip().lower()

    if not email or "@" not in email:
        return jsonify({"success": False, "message": "Please provide a valid email address."}), 400

    try:
        conn = get_db()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute(
            """
            INSERT INTO customers (customer_name, email, newsletter_signup)
            VALUES (%s, %s, TRUE)
            ON CONFLICT (email) DO UPDATE SET newsletter_signup = TRUE
            RETURNING customer_id
            """,
            ("Newsletter Subscriber", email)
        )
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"success": True, "message": "You've been subscribed to our newsletter!"})

    except Exception as e:
        return jsonify({"success": False, "message": f"Server error: {str(e)}"}), 500


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
