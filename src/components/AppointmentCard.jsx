import React from 'react';

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status, reason }) => {
  let statusClass = 'status-pending';
  if (status === 'confirmed') {
    statusClass = 'status-confirmed';
  } else if (status === 'cancelled') {
    statusClass = 'status-cancelled';
  }

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <span className={`status-badge ${statusClass}`}>{status.toUpperCase()}</span>
      </div>
      <div className="appointment-body">
        <div className="info-row">
          <span className="info-label">Patient:</span>
          <span className="info-value">{patientName}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Doctor:</span>
          <span className="info-value">{doctorName}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Date:</span>
          <span className="info-value">{date}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Time Slot:</span>
          <span className="info-value">{timeSlot}</span>
        </div>
        {reason && (
          <div className="info-row">
            <span className="info-label">Reason:</span>
            <span className="info-value reason-text">{reason}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
