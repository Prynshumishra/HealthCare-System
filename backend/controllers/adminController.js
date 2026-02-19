import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body;

    // 1️⃣ Validate required fields
    if (
      !name || !email || !password || !speciality ||
      !degree || !experience || !about || !fees || !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing Details"
      });
    }

    // 2️⃣ Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email"
      });
    }

    // 3️⃣ Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password"
      });
    }

    // 4️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5️⃣ Upload image to Cloudinary (ONLY if exists)
    let imageUrl = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        { resource_type: "image" }
      );
      imageUrl = uploadResult.secure_url;
    }

    // 6️⃣ Create doctor object
    const doctorData = {
      name,
      email,
      image: imageUrl, // ✅ Cloudinary URL
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };

    // 7️⃣ Save to DB
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor Added Successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// API for admin login
const loginAdmin = async (req, res) =>{
  try{

    const {email, password} = req.body
     
    if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){

      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({success:true, token})
       
    } else{
      res.json({success:false, message:"Invalid Credentials"})
    }

  } catch(error){
     console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}


//API to get all doctors  list for admin panel
const allDoctors = async(req, res) =>{
  try{
    const doctors = await doctorModel.find({}).select('-password')
    res.json({success:true, doctors})

  } catch(error){
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }

}

// API to get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await doctorModel.countDocuments()
    const totalUsers = await userModel.countDocuments()
    const totalAppointments = await appointmentModel.countDocuments()
    const totalRevenue = await appointmentModel.aggregate([
      { $match: { payment: true, cancelled: false } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])

    const pendingAppointments = await appointmentModel.countDocuments({ 
      payment: false, 
      cancelled: false 
    })
    const completedAppointments = await appointmentModel.countDocuments({ 
      isCompleted: true, 
      cancelled: false 
    })
    const cancelledAppointments = await appointmentModel.countDocuments({ 
      cancelled: true 
    })

    res.json({
      success: true,
      stats: {
        totalDoctors,
        totalUsers,
        totalAppointments,
        totalRevenue: totalRevenue[0]?.total || 0,
        pendingAppointments,
        completedAppointments,
        cancelledAppointments
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// API to get all appointments for admin
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .populate('docId', 'name speciality')
      .lean()

    res.json({
      success: true,
      appointments
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// API to update appointment status (cancel/complete)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const { action } = req.body // 'cancel' or 'complete'

    if (!appointmentId || !action) {
      return res.status(400).json({
        success: false,
        message: "Missing appointment ID or action"
      })
    }

    const appointment = await appointmentModel.findById(appointmentId)
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      })
    }

    if (action === 'cancel') {
      appointment.cancelled = true
      // Remove slot from doctor's booked slots
      const doctor = await doctorModel.findById(appointment.docId)
      if (doctor && doctor.slots_booked && doctor.slots_booked[appointment.slotDate]) {
        doctor.slots_booked[appointment.slotDate] = doctor.slots_booked[appointment.slotDate].filter(
          slot => slot !== appointment.slotTime
        )
        await doctor.save()
      }
    } else if (action === 'complete') {
      appointment.isCompleted = true
    }

    await appointment.save()

    res.json({
      success: true,
      message: `Appointment ${action}ed successfully`
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export { addDoctor, loginAdmin, allDoctors, getDashboardStats, getAllAppointments, updateAppointmentStatus };
