import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.keyId,
    key_secret: process.env.secretKey,
})

export const createOrder = async(req,res)=>{
    const options = {
        amount: req.body.amount*100,
        currency: "INR"
    }

    try {
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
        
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}