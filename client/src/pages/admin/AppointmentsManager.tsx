import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Appointment } from "@shared/schema";
import { AppointmentStatus } from "@shared/types";

export default function AppointmentsManager() {
  const [activeStatus, setActiveStatus] = useState<AppointmentStatus | null>(null);
  const [viewingAppointment, setViewingAppointment] = useState<Appointment | null>(null);
  
  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });
  
  const filteredAppointments = activeStatus 
    ? appointments?.filter(appointment => appointment.status === activeStatus)
    : appointments;
  
  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Appointments</h1>
        </div>
        
        <div className="mb-6 flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${activeStatus === null ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setActiveStatus(null)}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeStatus === AppointmentStatus.New ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setActiveStatus(AppointmentStatus.New)}
          >
            New
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeStatus === AppointmentStatus.Confirmed ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setActiveStatus(AppointmentStatus.Confirmed)}
          >
            Confirmed
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeStatus === AppointmentStatus.Completed ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setActiveStatus(AppointmentStatus.Completed)}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeStatus === AppointmentStatus.Cancelled ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setActiveStatus(AppointmentStatus.Cancelled)}
          >
            Cancelled
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading appointments...</div>
        ) : filteredAppointments && filteredAppointments.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium">{appointment.patientName}</div>
                        <div className="text-sm text-neutral-500">{appointment.patientEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.serviceId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{new Date(appointment.appointmentDate).toLocaleDateString()}</div>
                      <div className="text-sm text-neutral-500">{appointment.appointmentTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${appointment.status === AppointmentStatus.New ? 'bg-blue-100 text-blue-800' : 
                        appointment.status === AppointmentStatus.Confirmed ? 'bg-green-100 text-green-800' : 
                        appointment.status === AppointmentStatus.Completed ? 'bg-purple-100 text-purple-800' : 
                        'bg-red-100 text-red-800'}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-primary hover:text-primary/80 mr-4"
                        onClick={() => setViewingAppointment(appointment)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-neutral-500">No appointments found.</p>
          </div>
        )}
      </div>
      
      {/* Modal for viewing appointment details would go here */}
    </div>
  );
}