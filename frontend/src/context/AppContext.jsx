import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userData, setUserData] = useState(null)
    const [appointments, setAppointments] = useState([])  
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/doctor/list'
            )

            if (data.success) {
                setDoctors(data.doctors)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error fetching doctors:", error)
            toast.error(error.message)


        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {headers: authHeaders})
            if (data.success) {
                setUserData(data.userData)
            } else{
                toast.error(data.message)
            }

            
        } catch (error) {
            console.error("Error fetching doctors:", error)
            if (error.response?.status === 401) {
                setToken('')
                localStorage.removeItem('token')
            }
            toast.error(error.response?.data?.message || error.message)
            
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if(token){
            loadUserProfileData()
            getUserAppointments()
        } else{
            setUserData(null)
            setAppointments([])
        }
        }, [token])

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/my-appointments', {headers: authHeaders})
            if (data.success) {
                setAppointments(data.appointments)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error fetching appointments:", error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', 
                {appointmentId}, 
                {headers: authHeaders})
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    const value = {
        doctors, getDoctorsData,
        currencySymbol, token, setToken, backendUrl, userData, setUserData, loadUserProfileData,
        appointments, getUserAppointments, cancelAppointment

    }



    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
