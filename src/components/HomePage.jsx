import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';

const HomePage = ({ appointments, patients, doctors, onUpdateStatus }) => {
  const [statusFilter, setStatusFilter] = useState('all');

  // Helper to find patient name from patientId
  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  // Helper to find doctor name from doctorId
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter(app => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  // Calculate statistics
  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;

  return (
    <div className="page home-page">
      <h2>Dashboard & Appointments</h2>
      
      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">{totalCount}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{confirmedCount}</div>
          <div className="stat-label">Confirmed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{cancelledCount}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <label htmlFor="status-filter">Filter by Status: </label>
        <select 
          id="status-filter" 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="student-select"
        >
          <option value="all">All Appointments</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Appointment Cards Grid */}
      <div className="appointments-grid">
        {filteredAppointments.length === 0 ? (
          <p className="no-data">No appointments found matching this status.</p>
        ) : (
          filteredAppointments.map((app, index) => {
            // Find absolute index in the original array
            const originalIndex = appointments.indexOf(app);
            return (
              <div key={index} className="card-container">
                <AppointmentCard
                  patientName={getPatientName(app.patientId)}
                  doctorName={getDoctorName(app.doctorId)}
                  date={app.date}
                  timeSlot={app.timeSlot}
                  status={app.status}
                  reason={app.reason}
                />
                <div className="card-actions">
                  {app.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => onUpdateStatus(originalIndex, 'confirmed')}
                        className="student-btn btn-confirm"
                      >
                        Confirm
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(originalIndex, 'cancelled')}
                        className="student-btn btn-cancel"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {app.status === 'confirmed' && (
                    <button 
                      onClick={() => onUpdateStatus(originalIndex, 'cancelled')}
                      className="student-btn btn-cancel"
                    >
                      Cancel
                    </button>
                  )}
                  {app.status === 'cancelled' && (
                    <button 
                      onClick={() => onUpdateStatus(originalIndex, 'pending')}
                      className="student-btn btn-reopen"
                    >
                      Set Pending
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Patient List (showing Patient data structure) */}
      <div className="patient-list-section">
        <h3>Registered Patients</h3>
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Blood Group</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.bloodGroup}</td>
                  <td>{patient.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
