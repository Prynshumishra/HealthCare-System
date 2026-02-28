import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from "mongoose";


import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'


import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import applicationRoutes from './routes/applicationRoutes.js'
import Contact from "./models/Contact.js";


//App Config

const app = express()
const port = process.env.port || 4000


connectDB()
connectCloudinary() 



//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors())

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  "http://localhost:5173",   
  "http://localhost:5174",   
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use("/uploads", express.static("uploads"));

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.use("/api", applicationRoutes);


app.post("/api/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact Saved Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save contact" });
  }
});




app.get('/', (req, res)=>{
    res.send("API working")
} )

app.listen(port, ()=> console.log("Server Started", port))
