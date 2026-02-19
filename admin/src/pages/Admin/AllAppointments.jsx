import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AllAppointments = () => {

  const {
    appointments = [],
    getAllAppointments,
    updateAppointmentStatus,
    aToken,
  } = useContext(AdminContext)

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
    // eslint-disable-next-line
  }, [aToken])

  const formatSlotDate = (slotDate) => {
    if (!slotDate) return 'N/A'
    const [day, month, year] = slotDate.split('_')
    return `${day}/${month}/${year}`
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

  // 🔍 Combined Filters
  const filteredAppointments = appointments.filter((apt) => {

    // Status Filter
    if (filter === 'pending' && (apt.cancelled || apt.isCompleted)) return false
    if (filter === 'completed' && !apt.isCompleted) return false
    if (filter === 'cancelled' && !apt.cancelled) return false

    // Search Filter
    const patientName = apt.userId?.name?.toLowerCase() || ''
    const doctorName = apt.docId?.name?.toLowerCase() || ''
    const search = searchTerm.toLowerCase()

    if (search && !patientName.includes(search) && !doctorName.includes(search)) {
      return false
    }

    // Date Filter
    if (selectedDate && apt.slotDate) {
      const formattedDate = apt.slotDate.replace(/_/g, '-')
      if (formattedDate !== selectedDate) return false
    }

    return true
  })

  // 📤 Export CSV
  const exportToCSV = (data) => {
    if (!data.length) return alert("No data to export")

    const headers = [
      "Patient Name",
      "Patient Email",
      "Doctor Name",
      "Speciality",
      "Date",
      "Time",
      "Amount",
      "Status"
    ]

    const rows = data.map((apt) => [
      apt.userId?.name || '',
      apt.userId?.email || '',
      apt.docId?.name || '',
      apt.docId?.speciality || '',
      apt.slotDate?.replace(/_/g, '/') || '',
      apt.slotTime || '',
      apt.amount || 0,
      apt.cancelled
        ? "Cancelled"
        : apt.isCompleted
        ? "Completed"
        : "Pending"
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "appointments.csv")
    document.body.appendChild(link)
    link.click()
  }

    return (
  <div className="p-6 w-full bg-gray-50 min-h-screen">

    {/* Header Section */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Appointments Dashboard
      </h1>
      <p className="text-gray-500 mt-1">
        Manage and monitor all appointments efficiently.
      </p>
    </div>

    {/* Filter Card */}
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

      {/* Top Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">

        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                filter === status
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search + Date + Export */}
        <div className="flex flex-wrap gap-3 items-center">

          <input
            type="text"
            placeholder="Search patient or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            onClick={() => exportToCSV(filteredAppointments)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>

    {/* Table Card */}
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">S.No</th>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Date & Time</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  No appointments found
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment, index) => (
                <tr key={appointment._id} className="hover:bg-gray-50 transition">

                  <td className="px-6 py-4 font-medium text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">
                      {appointment.userId?.name || 'N/A'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {appointment.userId?.email || 'N/A'}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">
                      {appointment.docId?.name || 'N/A'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {appointment.docId?.speciality || 'N/A'}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p>{formatSlotDate(appointment.slotDate)}</p>
                    <p className="text-gray-500 text-xs">
                      {appointment.slotTime || 'N/A'}
                    </p>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    ${appointment.amount || 0}
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(appointment)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3 text-sm font-medium">
                      {!appointment.cancelled && !appointment.isCompleted && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment._id, 'complete')}
                            className="text-green-600 hover:text-green-800 transition"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment._id, 'cancel')}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {appointment.isCompleted && (
                        <span className="text-gray-400">No actions</span>
                      )}
                      {appointment.cancelled && (
                        <span className="text-gray-400">Cancelled</span>
                      )}
                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
    </div>

    {/* Summary Card */}
    <div className="mt-6 bg-white rounded-xl shadow p-4 text-sm text-gray-600">
      Showing <span className="font-semibold text-gray-800">
        {filteredAppointments.length}
      </span> of {appointments.length} appointments
    </div>

  </div>
)

  
}

export default AllAppointments
