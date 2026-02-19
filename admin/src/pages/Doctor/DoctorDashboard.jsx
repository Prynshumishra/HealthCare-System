import React, { useContext, useEffect, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dToken]);

  const handleRefresh = () => {
    if (dToken) {
      getDashData();
    }
  };

  const summaryCards = useMemo(() => {
    if (!dashData) {
      return [];
    }
    return [
      {
        label: "Total Earnings",
        value: `${currency}${dashData.earnings || 0}`,
        icon: assets.earning_icon,
        accent: "bg-green-50 text-green-600",
      },
      {
        label: "Appointments",
        value: dashData.appointments || 0,
        icon: assets.appointments_icon,
        accent: "bg-blue-50 text-blue-600",
      },
      {
        label: "Unique Patients",
        value: dashData.patients || 0,
        icon: assets.patients_icon,
        accent: "bg-purple-50 text-purple-600",
      },
    ];
  }, [dashData, currency]);

  const latestAppointments = dashData?.latestAppointments || [];
  const formatSlot = (slotDate) => {
    if (!slotDate) return "N/A";
    try {
      return slotDateFormat(slotDate);
    } catch (error) {
      return slotDate;
    }
  };

  const renderContent = () => {
    if (!dashData) {
      return (
        <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
          <p className="text-sm">Loading your dashboard...</p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="bg-white border rounded-2xl p-5 flex items-center gap-4 shadow-sm"
            >
              <div className={`p-3 rounded-xl ${card.accent}`}>
                <img src={card.icon} alt={card.label} className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white border rounded-2xl shadow-sm">
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Latest Appointments</h3>
                <p className="text-sm text-gray-500">Most recent five bookings</p>
              </div>
              <button
                onClick={handleRefresh}
                className="text-sm text-primary font-medium hover:underline"
              >
                Refresh
              </button>
            </div>
            <div className="divide-y">
              {latestAppointments.length === 0 ? (
                <p className="p-6 text-sm text-gray-500 text-center">
                  No recent appointments yet.
                </p>
              ) : (
                latestAppointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="flex items-center justify-between p-5"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {appointment.userData?.name || "Patient"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatSlot(appointment.slotDate)} · {appointment.slotTime || ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {currency}
                        {appointment.amount || 0}
                      </p>
                      <p
                        className={`text-xs font-medium uppercase ${
                          appointment.isCompleted
                            ? "text-green-600"
                            : appointment.cancelled
                            ? "text-red-600"
                            : "text-yellow-500"
                        }`}
                      >
                        {appointment.cancelled
                          ? "Cancelled"
                          : appointment.isCompleted
                          ? "Completed"
                          : "Scheduled"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Workflow Tips</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="text-primary font-semibold">•</span>
                Review upcoming appointments each morning to avoid surprises.
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">•</span>
                Mark visits as completed promptly so earnings stay accurate.
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">•</span>
                Encourage patients to upload reports before the consultation.
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold">•</span>
                Toggle availability in settings whenever your schedule changes.
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-6xl m-5 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xl font-semibold text-gray-800">Dashboard</p>
          <p className="text-sm text-gray-500">
            Quick overview of earnings, appointments, and patients.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-white transition"
        >
          Refresh Data
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default DoctorDashboard;
