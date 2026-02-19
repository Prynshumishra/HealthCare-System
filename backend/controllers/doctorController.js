import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability Changed " });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get doctor appointments for doctor dashboard
const doctorAppointments = async (req, res) => {
  try {
    const docId = req.doctor?.docId;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const appointments = await appointmentModel
      .find({ docId })
      .sort({ createdAt: -1 });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Api to mark appointment as completed or cancelled by doctor
const appointementComplete = async (req, res) => {
  try {
    const docId = req.doctor?.docId;
    const { appointmentId } = req.body;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const appointmentData = await appointmentModel.findOne({
      _id: appointmentId,
      docId,
    });

    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.cancelled) {
      return res.status(400).json({
        success: false,
        message: "Cancelled appointments cannot be completed",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
      payment: true,
    });

    res.json({ success: true, message: "Appointment marked as completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const appointementCancel = async (req, res) => {
  try {
    const docId = req.doctor?.docId;
    const { appointmentId } = req.body;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const appointmentData = await appointmentModel.findOne({
      _id: appointmentId,
      docId,
    });

    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.isCompleted) {
      return res.status(400).json({
        success: false,
        message: "Completed appointments cannot be cancelled",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//API to get doctor appointments for doctor dashboard
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.doctor?.docId;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const appointments = await appointmentModel
      .find({ docId })
      .sort({ createdAt: -1 });

    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//API to get doctor profile details for doctor dashboard
const doctorProfile = async (req, res) => {
  try {
    const docId = req.doctor?.docId;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to update doctor profile details for doctor dashboard
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.doctor?.docId;
    const { fees, address, available } = req.body;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  doctorAppointments,
  appointementComplete,
  appointementCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
