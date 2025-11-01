import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes.js';
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use("/",paymentRoutes)

const port = process.env.Port || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
