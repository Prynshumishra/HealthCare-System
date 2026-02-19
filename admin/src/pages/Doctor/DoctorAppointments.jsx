import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
    const {
        dToken,
        appointments,
        getDoctorAppointments,
        completeAppointment,
        cancelAppointment
    } = useContext(DoctorContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        if (dToken) {
            getDoctorAppointments()
        }
    }, [dToken])

    const sortedAppointments = useMemo(
        () => [...appointments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        [appointments]
    )

    const filteredAppointments = useMemo(() => {
        switch (filter) {
            case 'pending':
                return sortedAppointments.filter((apt) => !apt.cancelled && !apt.isCompleted)
            case 'completed':
                return sortedAppointments.filter((apt) => apt.isCompleted)
            case 'cancelled':
                return sortedAppointments.filter((apt) => apt.cancelled)
            default:
                return sortedAppointments
        }
    }, [sortedAppointments, filter])

    const summary = useMemo(() => ({
        all: appointments.length,
        pending: appointments.filter((apt) => !apt.cancelled && !apt.isCompleted).length,
        completed: appointments.filter((apt) => apt.isCompleted).length,
        cancelled: appointments.filter((apt) => apt.cancelled).length
    }), [appointments])

    const statusBadge = (apt) => {
        if (apt.cancelled) {
            return <span className='badge badge-error'>Cancelled</span>
        }
        if (apt.isCompleted) {
            return <span className='badge badge-success'>Completed</span>
        }
        return <span className='badge badge-warning'>Scheduled</span>
    }

    const renderActions = (apt) => {
        if (apt.cancelled) {
            return <p className='text-xs font-semibold text-red-400'>Cancelled</p>
        }
        if (apt.isCompleted) {
            return <p className='text-xs font-semibold text-green-500'>Completed</p>
        }
        return (
            <div className='flex items-center gap-2'>
                <button
                    type='button'
                    onClick={() => cancelAppointment(apt._id)}
                    className='action-pill action-pill--danger'
                >
                    <img src={assets.cancel_icon} alt='Cancel' className='w-4 h-4' />
                    Cancel
                </button>
                <button
                    type='button'
                    onClick={() => completeAppointment(apt._id)}
                    className='action-pill action-pill--success'
                >
                    <img src={assets.tick_icon} alt='Complete' className='w-4 h-4' />
                    Complete
                </button>
            </div>
        )
    }

    return (
        <div className='w-full max-w-6xl m-5 space-y-5'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                    <p className='text-xl font-semibold text-gray-800'>Appointments</p>
                    <p className='text-sm text-gray-500'>Manage today’s patient schedule and statuses.</p>
                </div>
                <div className='flex gap-2 flex-wrap text-xs uppercase tracking-wide'>
                    {['all', 'pending', 'completed', 'cancelled'].map((key) => (
                        <button
                            key={key}
                            type='button'
                            onClick={() => setFilter(key)}
                            className={`status-chip ${filter === key ? 'status-chip--active' : ''}`}
                        >
                            {key} ({summary[key] || 0})
                        </button>
                    ))}
                </div>
            </div>

            <div className='bg-white border rounded-2xl shadow-sm text-sm min-h-[50vh] max-h-[80vh] overflow-y-auto custom-scroll'>
                <div className='hidden sm:grid grid-cols-[0.6fr_2fr_1fr_1fr_2fr_1fr_1.4fr] gap-3 py-4 px-6 border-b text-xs font-semibold text-gray-500 uppercase'>
                    <span>#</span>
                    <span>Patient</span>
                    <span>Payment</span>
                    <span>Age</span>
                    <span>Date & Time</span>
                    <span>Fees</span>
                    <span>Status / Actions</span>
                </div>

                {filteredAppointments.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 text-gray-400 gap-3'>
                        <img src={assets.appointments_icon} alt='No appointments' className='w-12 h-12 opacity-80' />
                        <p>No appointments match this filter.</p>
                    </div>
                ) : (
                    filteredAppointments.map((apt, index) => (
                        <div
                            key={apt._id}
                            className='flex flex-wrap sm:grid grid-cols-[0.6fr_2fr_1fr_1fr_2fr_1fr_1.4fr] gap-3 items-center text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition'
                        >
                            <span className='text-xs text-gray-400 hidden sm:block'>{index + 1}</span>
                            <div className='flex items-center gap-3 min-w-[180px]'>
                                <img src={apt.userData?.image} alt={apt.userData?.name} className='w-10 h-10 rounded-full object-cover border' />
                                <div>
                                    <p className='font-medium text-sm text-gray-800'>{apt.userData?.name}</p>
                                    <p className='text-xs text-gray-500'>{apt.userData?.email}</p>
                                </div>
                            </div>
                            <span className='text-xs font-semibold inline-flex items-center gap-1 px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5'>
                                {apt.payment ? 'Online' : 'Cash'}
                            </span>
                            <span className='text-xs font-medium hidden sm:block'>{calculateAge(apt.userData?.dob)}</span>
                            <div>
                                <p className='text-sm font-medium text-gray-700'>{slotDateFormat(apt.slotDate)}</p>
                                <p className='text-xs text-gray-500'>{apt.slotTime}</p>
                            </div>
                            <p className='text-sm font-semibold text-gray-800'>{currency}{apt.amount}</p>
                            <div className='flex flex-col gap-2'>{statusBadge(apt)}{renderActions(apt)}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default DoctorAppointments
