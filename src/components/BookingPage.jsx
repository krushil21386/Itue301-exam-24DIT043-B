import React, { useState } from 'react';
import { useAppState } from '../AppContext';

const BookingPage = () => {
  const { patients, doctors, handleBookAppointment, handleAddPatient } = useAppState();

  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    timeSlot: '',
    reason: ''
  });

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM'
  ];

  const availableDoctors = doctors.filter(d => d.available);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.patientName.trim()) {
      setError('Please enter patient name.');
      return;
    }
    if (!selectedDoctor) {
      setError('Please select a doctor.');
      return;
    }
    if (!formData.date) {
      setError('Please select a date.');
      return;
    }
    if (!formData.timeSlot) {
      setError('Please select a time slot.');
      return;
    }

    let patient = patients.find(p => p.name.toLowerCase() === formData.patientName.trim().toLowerCase());
    if (!patient) {
      patient = handleAddPatient({
        name: formData.patientName.trim(),
        email: `${formData.patientName.trim().toLowerCase().replace(/\s+/g, '')}@example.com`,
        phone: '0000000000',
        bloodGroup: 'O+',
        age: 30
      });
    }

    handleBookAppointment({
      patientId: patient.id,
      doctorId: parseInt(selectedDoctor),
      date: formData.date,
      timeSlot: formData.timeSlot,
      status: 'pending',
      reason: formData.reason || 'General consultation'
    });

    setFormData({
      patientName: '',
      date: '',
      timeSlot: '',
      reason: ''
    });
    setSelectedDoctor('');
    setSuccess('Appointment successfully scheduled!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page booking-page">
      <h2>Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="student-form booking-form">
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        <div className="form-section">
          <h3>Appointment Form</h3>

          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input 
              type="text" 
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              placeholder="Enter patient full name"
              className="student-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="selectedDoctor">Select Doctor:</label>
            <select 
              id="selectedDoctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="student-select"
            >
              <option value="">-- Choose Doctor --</option>
              {availableDoctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialisation})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input 
                type="date" 
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="student-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeSlot">Time Slot:</label>
              <select 
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
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
            <label htmlFor="reason">Reason (Optional):</label>
            <textarea 
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Describe symptoms or reasons"
              rows="3"
              className="student-textarea"
            />
          </div>
        </div>

        <div style={{ margin: '15px 0', padding: '10px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
          <h4>Live Form Preview:</h4>
          <p><strong>Patient Name:</strong> {formData.patientName || '(Waiting for input...)'}</p>
          <p><strong>Doctor Selected:</strong> {selectedDoctor ? doctors.find(d => d.id === parseInt(selectedDoctor))?.name : '(None selected)'}</p>
          <p><strong>Date:</strong> {formData.date || '(Not set)'}</p>
          <p><strong>Time Slot:</strong> {formData.timeSlot || '(Not set)'}</p>
        </div>

        <button type="submit" className="student-btn btn-booking-submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
