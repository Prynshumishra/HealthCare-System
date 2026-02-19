import express from 'express'
import { addDoctor, allDoctors, loginAdmin, getDashboardStats, getAllAppointments, updateAppointmentStatus } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/dashboard-stats', authAdmin, getDashboardStats)
adminRouter.get('/all-appointments', authAdmin, getAllAppointments)
adminRouter.post('/update-appointment-status', authAdmin, updateAppointmentStatus)

export default adminRouter