import React, { useContext, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    const adminLinks = useMemo(() => ([
        { to: '/admin-dashboard', label: 'Dashboard', icon: assets.home_icon },
        { to: '/all-appointments', label: 'Appointments', icon: assets.appointment_icon },
        { to: '/add-doctor', label: 'Add Doctor', icon: assets.add_icon },
        { to: '/doctor-list', label: 'Doctors List', icon: assets.people_icon }
    ]), [])

    const doctorLinks = useMemo(() => ([
        { to: '/doctor-dashboard', label: 'Dashboard', icon: assets.home_icon },
        { to: '/doctor-appointments', label: 'Appointments', icon: assets.appointment_icon },
        { to: '/doctor-profile', label: 'Profile', icon: assets.doctor_icon }
    ]), [])

    const renderLinks = (links, label) => (
        <div className='mt-6'>
            <p className='text-xs tracking-[0.3em] uppercase text-gray-400 px-3 md:px-8 mb-2'>{label}</p>
            <ul className='text-[#515151] space-y-1'>
                {links.map((item) => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 py-3.5 px-3 md:px-8 rounded-r-2xl md:min-w-64 transition-colors ${
                                    isActive
                                        ? 'bg-[#EEF1FF] text-primary shadow-sm shadow-primary/10'
                                        : 'hover:bg-gray-50'
                                }`
                            }
                        >
                            <span className='relative'>
                                <span className='absolute inset-0 rounded-full bg-primary/10 scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition' />
                                <img src={item.icon} alt={item.label} className='relative w-5 h-5' />
                            </span>
                            <p className='hidden md:block font-medium text-sm'>{item.label}</p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )

    if (!aToken && !dToken) {
        return null
    }

    return (
        <aside className='min-h-screen w-full max-w-[280px] bg-gradient-to-b from-white via-white to-[#F5F7FF] border-r border-gray-100 shadow-sm sticky top-0 flex flex-col'>
            <div className='px-5 py-6 border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                    <img src={assets.admin_logo} alt='Prescripto' className='w-10 h-10 rounded-full' />
                    <div>
                        <p className='text-sm font-semibold text-gray-800'>Prescripto Panel</p>
                        <p className='text-xs text-gray-500'>{aToken ? 'Admin access' : 'Doctor access'}</p>
                    </div>
                </div>
            </div>

            <div className='flex-1 overflow-y-auto pb-6 custom-scroll'>
                {aToken && renderLinks(adminLinks, 'Admin')}
                {dToken && renderLinks(doctorLinks, 'Doctor')}
            </div>
        </aside>
    )
}

export default Sidebar
