from flask import Flask, request, jsonify
from flask_cors import CORS
import razorpay
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

razorpay_client = razorpay.Client(auth=(
    os.getenv("RAZORPAY_KEY_ID"),
    os.getenv("RAZORPAY_KEY_SECRET")
))

@app.route("/payment", methods=["POST"])
def create_order():
    try:
        data = request.get_json()
        print("Received data:", data)
        amount = int(data["amount"]) * 100  # Convert to paise

        order = razorpay_client.order.create({
            "amount": amount,
            "currency": "INR",
            "receipt": f"receipt_{os.urandom(4).hex()}",
            "payment_capture": 1
        })

        return jsonify(order)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=3000, debug=True)
