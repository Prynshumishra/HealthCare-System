import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Razorpay from 'razorpay'

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" })
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" })
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword
    })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ success: true, token })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// ================= LOGIN USER =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ success: true, token })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// ================= GET PROFILE =================
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId

    const userData = await userModel
      .findById(userId)
      .select('-password')

    res.json({ success: true, userData })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.status(400).json({ success: false, message: "Missing Details" })
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: address ? JSON.parse(address) : {},
      dob,
      gender
    })

    if (imageFile) {
      const uploadRes = await cloudinary.uploader.upload(imageFile.path)
      await userModel.findByIdAndUpdate(userId, {
        image: uploadRes.secure_url
      })
    }

    res.json({ success: true, message: "Profile Updated Successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.userId
    const { docId, slotDate, slotTime } = req.body

    if (!docId || !slotDate || !slotTime) {
      return res.status(400).json({
        success: false,
        message: "Missing appointment details"
      })
    }

    const docData = await doctorModel.findById(docId)
    if (!docData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      })
    }

    if (!docData.available) {
      return res.status(400).json({
        success: false,
        message: "Doctor not available"
      })
    }

    // Check if slot is already booked in existing appointments
    const existingAppointment = await appointmentModel.findOne({
      docId,
      slotDate,
      slotTime,
      cancelled: false
    })

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "Slot not available"
      })
    }

    let slots_booked = docData.slots_booked || {}

    // Update doctor's booked slots
    if (slots_booked[slotDate]) {
      if (!slots_booked[slotDate].includes(slotTime)) {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = [slotTime]
    }

    const userData = await userModel
      .findById(userId)
      .select('-password')

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // update doctor slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully"
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// API to get user's appointments
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.userId

    const appointments = await appointmentModel
      .find({ userId })
      .sort({ createdAt: -1 })
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

// API to cancel user's appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.userId
    const { appointmentId } = req.body

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Missing appointment ID"
      })
    }

    const appointment = await appointmentModel.findById(appointmentId)
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      })
    }

    // Verify appointment belongs to user
    if (appointment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      })
    }

    if (appointment.cancelled) {
      return res.status(400).json({
        success: false,
        message: "Appointment already cancelled"
      })
    }

    // Cancel appointment
    appointment.cancelled = true
    await appointment.save()

    // Remove slot from doctor's booked slots
    const doctor = await doctorModel.findById(appointment.docId)
    if (doctor && doctor.slots_booked && doctor.slots_booked[appointment.slotDate]) {
      doctor.slots_booked[appointment.slotDate] = doctor.slots_booked[appointment.slotDate].filter(
        slot => slot !== appointment.slotTime
      )
      await doctor.save()
    }

    res.json({
      success: true,
      message: "Appointment cancelled successfully"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}




export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getUserAppointments, cancelAppointment }
