import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [amount, setAmount] = useState(0);
  // const [orderId, setOrderId] = useState(null);
  console.log(amount);

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/payment", {
        amount,
      });
      console.log(response.data);

      const options = {
        key: "rzp_test_f8Y5JFvsPLL5sN",
        amount: response.data.amount, // Amount in paise
        currency: response.data.currency,
        name: "Payment Gateway",
        description: "Test Transaction",
        order_id: response.data.id, // This is the order ID returned by your backend
        handler: function (response) {
          // Handle successful payment here
          console.log("Payment successful:", response);
          alert("Payment successful! Order ID: " + response.razorpay_order_id);
          Swal.fire({
            title: "Payment Successful",
            text: "Successfully paid ₹" + amount,
            icon: "success",
          });
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <>
      <h1>Payment Gateway</h1>
      <label htmlFor="amount">Amount : </label>
      <input
        type="number"
        placeholder="Enter Amoumt"
        onChange={(e) => setAmount(e.target.value)}
      />
      {amount > 0 && (
        <div>
          <h2>Amount to be paid: ₹{amount}</h2>
          <button
            onClick={() => {
              handlePayment();
            }}
          >
            Confirm Payment
          </button>
        </div>
      )}
    </>
  );
}

export default App;
