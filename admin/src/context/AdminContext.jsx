import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext =  createContext()

const AdminContextProvider = (props) => {


    const [aToken, setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'): '')
    const [doctors, setDoctors] = useState([])
    const [dashboardStats, setDashboardStats] = useState(null)
    const [appointments, setAppointments] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () =>{

        try{
           const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{aToken}})
           if(data.success){
            setDoctors(data.doctors)
            console.log(data.doctors);

           } else{
            toast.error(data.message)
           }
        } catch(error){
            toast.error(error.message)
             
        }
    }



    const changeAvailability = async (docId) =>{
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            } else{
                toast.error(data.message)
            }

        } catch(error){
            toast.error(error.message)
        }
    }


    

    const getDashboardStats = async () => {
        try{
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard-stats', {headers:{aToken}})
            if(data.success){
                setDashboardStats(data.stats)
            } else{
                toast.error(data.message)
            }
        } catch(error){
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try{
            const {data} = await axios.get(backendUrl + '/api/admin/all-appointments', {headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
            } else{
                toast.error(data.message)
            }
        } catch(error){
            toast.error(error.message)
        }
    }

    const updateAppointmentStatus = async (appointmentId, action) => {
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/update-appointment-status', 
                {appointmentId, action}, 
                {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
                getDashboardStats()
            } else{
                toast.error(data.message)
            }
        } catch(error){
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken, backendUrl, doctors, getAllDoctors, changeAvailability, 
        dashboardStats, getDashboardStats, appointments, getAllAppointments, updateAppointmentStatus

    }
    return (
        <AdminContext.Provider value = {value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider