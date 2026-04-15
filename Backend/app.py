from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# DB Connection
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Aayush04",   # 🔥 CHANGE THIS (very important)
        database="leave_db"
    )
    cursor = db.cursor(dictionary=True)
    print("✅ Database Connected")

except Exception as e:
    print("❌ DB Error:", e)
    db = None
    cursor = None

cursor = db.cursor(dictionary=True)

# ---------------- AUTH ---------------- #

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    cursor.execute("SELECT * FROM employees WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()

    if user:
        return jsonify({"success": True, "user": user})
    return jsonify({"success": False, "message": "Invalid credentials"})


# ---------------- APPLY LEAVE ---------------- #

@app.route('/apply-leave', methods=['POST'])
def apply_leave():
    data = request.json

    query = """
    INSERT INTO leaves (employee_id, reason, from_date, to_date)
    VALUES (%s, %s, %s, %s)
    """

    values = (
        data['employee_id'],
        data['reason'],
        data['from_date'],
        data['to_date']
    )

    cursor.execute(query, values)
    db.commit()

    return jsonify({"message": "Leave applied successfully"})


# ---------------- GET EMPLOYEE LEAVES ---------------- #

@app.route('/employee-leaves/<int:employee_id>', methods=['GET'])
def employee_leaves(employee_id):
    cursor.execute("SELECT * FROM leaves WHERE employee_id=%s", (employee_id,))
    result = cursor.fetchall()
    return jsonify(result)


# ---------------- GET ALL LEAVES (MANAGER) ---------------- #

@app.route('/all-leaves', methods=['GET'])
def all_leaves():
    cursor.execute("""
        SELECT leaves.*, employees.name 
        FROM leaves 
        JOIN employees ON leaves.employee_id = employees.id
    """)
    result = cursor.fetchall()
    return jsonify(result)


# ---------------- UPDATE STATUS ---------------- #

@app.route('/update-status/<int:id>', methods=['PUT'])
def update_status(id):
    data = request.json
    status = data['status']

    cursor.execute("UPDATE leaves SET status=%s WHERE id=%s", (status, id))
    db.commit()

    return jsonify({"message": "Status updated"})


# ---------------- DELETE LEAVE ---------------- #

@app.route('/delete-leave/<int:id>', methods=['DELETE'])
def delete_leave(id):
    cursor.execute("DELETE FROM leaves WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Leave deleted"})


if __name__ == '__main__':
    app.run(debug=True)