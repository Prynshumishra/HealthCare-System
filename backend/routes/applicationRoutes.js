import express from "express";
const router = express.Router();
import multer from "multer";
import Application from "../models/Application.js";



// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });






router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const newApplication = new Application({
      ...req.body,
      resume: req.file.path,
    });

    await newApplication.save();


    res.status(201).json({ message: "Application saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
