import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { dashboardStats, getDashboardStats, aToken } = useContext(AdminContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getDashboardStats()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aToken])

  const stats = [
    {
      title: 'Total Doctors',
      value: dashboardStats?.totalDoctors || 0,
      icon: assets.doctor_icon,
      color: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Patients',
      value: dashboardStats?.totalUsers || 0,
      icon: assets.patients_icon,
      color: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Appointments',
      value: dashboardStats?.totalAppointments || 0,
      icon: assets.appointments_icon,
      color: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Revenue',
      value: `$${dashboardStats?.totalRevenue || 0}`,
      icon: assets.earning_icon,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    }
  ]

  const appointmentStats = [
    {
      title: 'Pending',
      value: dashboardStats?.pendingAppointments || 0,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Completed',
      value: dashboardStats?.completedAppointments || 0,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Cancelled',
      value: dashboardStats?.cancelledAppointments || 0,
      color: 'bg-red-50 border-red-200'
    }
  ]

  return (
    <div className='m-5 w-full'>
      <h1 className='text-2xl font-semibold mb-6 text-gray-800'>Dashboard Overview</h1>
      
      {/* Main Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'>
        {stats.map((stat, index) => (
          <div key={index} className='bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm mb-1'>{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <img src={stat.icon} alt={stat.title} className='w-6 h-6' />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Status */}
      <div className='bg-white border rounded-lg p-6 shadow-sm'>
        <h2 className='text-lg font-semibold mb-4 text-gray-800'>Appointment Status</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {appointmentStats.map((stat, index) => (
            <div key={index} className={`${stat.color} border rounded-lg p-4`}>
              <p className='text-gray-600 text-sm mb-2'>{stat.title} Appointments</p>
              <p className='text-2xl font-bold text-gray-800'>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className='mt-6 bg-white border rounded-lg p-6 shadow-sm'>
        <h2 className='text-lg font-semibold mb-4 text-gray-800'>Quick Actions</h2>
        <div className='flex flex-wrap gap-3'>
          <button 
            onClick={() => navigate('/all-appointments')}
            className='bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors'
          >
            View All Appointments
          </button>
          <button 
            onClick={() => navigate('/add-doctor')}
            className='bg-green-600 text-white px-6 py-2 rounded-full text-sm hover:bg-green-700 transition-colors'
          >
            Add New Doctor
          </button>
          <button 
            onClick={() => navigate('/doctor-list')}
            className='bg-gray-600 text-white px-6 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors'
          >
            Manage Doctors
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
