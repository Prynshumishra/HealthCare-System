import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(
        localStorage.getItem('dToken') 
            ? localStorage.getItem('dToken') 
            : null
    );

    const [appointments, setAppointments] = useState([]);

    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    // ✅ Fetch Doctor Appointments
    const getDoctorAppointments = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/doctor/appointments`,
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
                    },
                }
            );

            if (data.success) {
                
                setAppointments(data.appointments);
                console.log(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctor appointments:", error);
            toast.error(error.message);
        }
    };

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/complete-appointment`,
                { appointmentId },
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
                    },
                }
            );
            if (data.success) {
                toast.success(data.message);
                getDoctorAppointments();
            } else {
                toast.error(data.message);
            }   
        } catch (error) {
            console.error("Error completing appointment:", error);
            toast.error(error.message);
        }   
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(

                `${backendUrl}/api/doctor/cancel-appointment`,
                { appointmentId },
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
                    },
                }
            );
            if (data.success) {
                toast.success(data.message);
                getDoctorAppointments();
            }   
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error);
            toast.error(error.message);
        }   
    };


    const getDashData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/doctor/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
                    },
                }
            );
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error(error.message);
            }
        }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/doctor/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
                    },
                }
            );
            if (data.success) {
                setProfileData(data.profileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {

            console.error("Error fetching profile data:", error);
            toast.error(error.message);
        }
    };


    const value = {
        dToken,
        setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getDoctorAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        setDashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
