import React, { useState } from 'react';

const BookingPage = ({ patients, doctors, onBookAppointment, onAddPatient }) => {
  // Option to use existing patient or register new
  const [patientMode, setPatientMode] = useState('existing'); // 'existing' or 'new'
  
  // Patient Fields (for new patient)
  const [patName, setPatName] = useState('');
  const [patEmail, setPatEmail] = useState('');
  const [patPhone, setPatPhone] = useState('');
  const [patBloodGroup, setPatBloodGroup] = useState('A+');
  const [patAge, setPatAge] = useState('');

  // Selected existing patient
  const [selectedPatientId, setSelectedPatientId] = useState('');

  // Booking fields
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [reason, setReason] = useState('');
  
  // Messaging
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Predefined options
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM'
  ];

  // Only show available doctors
  const availableDoctors = doctors.filter(d => d.available);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    let finalPatientId = '';

    if (patientMode === 'existing') {
      if (!selectedPatientId) {
        setError('Please select a patient.');
        return;
      }
      finalPatientId = parseInt(selectedPatientId);
    } else {
      // Validate new patient
      if (!patName || !patEmail || !patPhone || !patAge) {
        setError('Please fill in all patient details.');
        return;
      }
      // Add new patient
      const newPatient = {
        name: patName,
        email: patEmail,
        phone: patPhone,
        bloodGroup: patBloodGroup,
        age: parseInt(patAge)
      };
      // Call parent to add patient and get the returned new patient object or id
      const addedPatient = onAddPatient(newPatient);
      finalPatientId = addedPatient.id;
    }

    // Validate booking fields
    if (!selectedDoctorId) {
      setError('Please select a doctor.');
      return;
    }
    if (!date) {
      setError('Please select a date.');
      return;
    }
    if (!timeSlot) {
      setError('Please select a time slot.');
      return;
    }
    if (!reason) {
      setError('Please enter a reason for the appointment.');
      return;
    }

    // Book the appointment
    const newAppointment = {
      patientId: finalPatientId,
      doctorId: parseInt(selectedDoctorId),
      date,
      timeSlot,
      status: 'pending', // Starts as pending
      reason
    };

    onBookAppointment(newAppointment);

    // Reset Form fields
    setPatName('');
    setPatEmail('');
    setPatPhone('');
    setPatBloodGroup('A+');
    setPatAge('');
    setSelectedPatientId('');
    setSelectedDoctorId('');
    setDate('');
    setTimeSlot('');
    setReason('');
    setSuccess('Appointment booked successfully as PENDING!');
    
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page booking-page">
      <h2>Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="student-form booking-form">
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        {/* Section 1: Patient Selection / Registration */}
        <div className="form-section">
          <h3>1. Patient Information</h3>
          
          <div className="mode-selector">
            <label className="radio-label">
              <input 
                type="radio" 
                name="patientMode" 
                value="existing"
                checked={patientMode === 'existing'}
                onChange={() => setPatientMode('existing')} 
              />
              Select Existing Patient
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="patientMode" 
                value="new"
                checked={patientMode === 'new'}
                onChange={() => setPatientMode('new')} 
              />
              Register & Book New Patient
            </label>
          </div>

          {patientMode === 'existing' ? (
            <div className="form-group">
              <label htmlFor="select-patient">Choose Patient:</label>
              <select 
                id="select-patient"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="student-select"
              >
                <option value="">-- Choose Patient --</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Age: {p.age}, Blood: {p.bloodGroup})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="new-patient-fields">
              <div className="form-group">
                <label htmlFor="new-pat-name">Full Name:</label>
                <input 
                  type="text" 
                  id="new-pat-name"
                  value={patName}
                  onChange={(e) => setPatName(e.target.value)}
                  placeholder="Patient Name"
                  className="student-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-pat-email">Email:</label>
                <input 
                  type="email" 
                  id="new-pat-email"
                  value={patEmail}
                  onChange={(e) => setPatEmail(e.target.value)}
                  placeholder="patient@example.com"
                  className="student-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-pat-phone">Phone Number:</label>
                <input 
                  type="text" 
                  id="new-pat-phone"
                  value={patPhone}
                  onChange={(e) => setPatPhone(e.target.value)}
                  placeholder="9876543210"
                  className="student-input"
                />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="new-pat-age">Age:</label>
                  <input 
                    type="number" 
                    id="new-pat-age"
                    value={patAge}
                    onChange={(e) => setPatAge(e.target.value)}
                    placeholder="e.g. 35"
                    min="0"
                    max="120"
                    className="student-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="new-pat-blood">Blood Group:</label>
                  <select 
                    id="new-pat-blood"
                    value={patBloodGroup}
                    onChange={(e) => setPatBloodGroup(e.target.value)}
                    className="student-select"
                  >
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Appointment Details */}
        <div className="form-section">
          <h3>2. Appointment Details</h3>

          <div className="form-group">
            <label htmlFor="select-doctor">Select Doctor:</label>
            <select 
              id="select-doctor"
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="student-select"
            >
              <option value="">-- Select Available Doctor --</option>
              {availableDoctors.length === 0 ? (
                <option disabled>No doctors available currently</option>
              ) : (
                availableDoctors.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.specialisation})
                  </option>
                ))
              )}
            </select>
            {availableDoctors.length === 0 && (
              <span className="help-text-warning">Note: Register or make doctors available in the Doctors Page.</span>
            )}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="appt-date">Preferred Date:</label>
              <input 
                type="date" 
                id="appt-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="student-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="appt-time">Time Slot:</label>
              <select 
                id="appt-time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="student-select"
              >
                <option value="">-- Choose Slot --</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="appt-reason">Reason for Appointment:</label>
            <textarea 
              id="appt-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe symptoms or reasons (e.g. Regular Checkup)"
              rows="3"
              className="student-textarea"
            />
          </div>
        </div>

        <button type="submit" className="student-btn btn-booking-submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
