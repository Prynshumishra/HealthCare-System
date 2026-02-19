import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { appointments, getUserAppointments, cancelAppointment, token, currencySymbol } = useContext(AppContext)

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  const formatSlotDate = (slotDate) => {
    if (!slotDate) return 'N/A'
    const [day, month, year] = slotDate.split('_')
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    return `${day}, ${monthNames[parseInt(month) - 1]}, ${year}`
  }

  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      await cancelAppointment(appointmentId)
    }
  }

  const getStatusBadge = (appointment) => {
    if (appointment.cancelled) {
      return <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium'>Cancelled</span>
    }
    if (appointment.isCompleted) {
      return <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium'>Completed</span>
    }
    if (appointment.payment) {
      return <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium'>Paid</span>
    }
    return <span className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium'>Pending</span>
  }

  const filteredAppointments = appointments.filter(apt => !apt.cancelled)

  return (
    <div className='mt-12'>
      <p className='pb-3 font-medium text-zinc-700 border-b mb-6'>My Appointments</p>
      
      {!token ? (
        <div className='text-center py-12 text-gray-500'>
          <p>Please login to view your appointments</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className='text-center py-12 text-gray-500'>
          <p>No appointments found</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredAppointments.map((appointment) => (
            <div 
              key={appointment._id} 
              className='grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 p-4 border rounded-lg hover:shadow-md transition-shadow bg-white'
            >
              {/* Doctor Image */}
              <div className='flex justify-center sm:justify-start'>
                <img 
                  className='w-32 h-32 object-cover rounded-lg bg-indigo-50' 
                  src={appointment.docData?.image || 'https://via.placeholder.com/150'} 
                  alt={appointment.docData?.name || 'Doctor'} 
                />
              </div>

              {/* Appointment Details */}
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold text-lg mb-1'>
                  {appointment.docData?.name || 'N/A'}
                </p>
                <p className='text-gray-500 mb-2'>{appointment.docData?.speciality || 'N/A'}</p>
                
                <div className='space-y-1'>
                  <p className='text-zinc-700 font-medium mt-3'>Address</p>
                  <p className='text-xs'>
                    {appointment.docData?.address?.line1 || 'N/A'}
                  </p>
                  <p className='text-xs'>
                    {appointment.docData?.address?.line2 || ''}
                  </p>
                  
                  <p className='text-xs mt-3'>
                    <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{' '}
                    {formatSlotDate(appointment.slotDate)} | {appointment.slotTime || 'N/A'}
                  </p>
                  
                  <p className='text-sm mt-2'>
                    <span className='text-neutral-700 font-medium'>Amount:</span>{' '}
                    {currencySymbol}{appointment.amount || 0}
                  </p>
                  
                  <div className='mt-2'>
                    {getStatusBadge(appointment)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col gap-2 justify-start sm:justify-center'>
                {!appointment.cancelled && !appointment.isCompleted && (
                  <>
                    {!appointment.payment && (
                      <button 
                        className='text-sm text-stone-500 text-center sm:min-w-48 py-2 px-4 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                        onClick={() => toast.info('Payment integration coming soon!')}
                      >
                        Pay Online
                      </button>
                    )}
                    <button 
                      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 px-4 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                      onClick={() => handleCancel(appointment._id)}
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
                {appointment.isCompleted && (
                  <p className='text-sm text-gray-400 text-center'>Appointment Completed</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
