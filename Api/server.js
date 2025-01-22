import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import cors from 'cors'
import paymentRouter from "./routes/PaymentRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { configDotenv } from "dotenv";


// Load environment variables


const app = express();
const port = 4000;

app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"], // Exact origin of your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Auth"],
}));
//dot env config

configDotenv()

// Middleware to parse JSON
app.use(bodyParser.json());

// Routes
app.use('/v1/ecommerce/api', userRouter);
app.use("/api/v1/",adminRouter)
app.use('/api/v1/products', productRouter);
app.use('/api/v1/',cartRouter)
app.use('/api/v1/payment/',paymentRouter)
app.use('/api/v1/',orderRouter)
app.use('/images',express.static(('uploads')))

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
  dbName: "E_CommerceWebsite"
}).then(() => {
  console.log("Database connected....");
}).catch((err) => {
  console.log("Error:", err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
