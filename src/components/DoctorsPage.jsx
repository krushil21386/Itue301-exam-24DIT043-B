import React, { useState } from 'react';

const DoctorsPage = ({ doctors, onToggleAvailability, onAddDoctor }) => {
  // Local state for the Add Doctor form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !specialisation) {
      setError('Please fill in all fields.');
      setSuccess('');
      return;
    }

    const newDoctor = {
      name,
      email,
      specialisation,
      available
    };

    onAddDoctor(newDoctor);

    // Reset form
    setName('');
    setEmail('');
    setSpecialisation('');
    setAvailable(true);
    setError('');
    setSuccess('Doctor registered successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="page doctors-page">
      <h2>Doctor Management</h2>

      <div className="doctors-content">
        {/* Doctors Directory List */}
        <div className="doctors-list-section">
          <h3>Doctor Directory</h3>
          <div className="doctors-cards-container">
            {doctors.length === 0 ? (
              <p className="no-data">No doctors registered yet.</p>
            ) : (
              doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-card-header">
                    <h4>{doctor.name}</h4>
                    <span className={`status-pill ${doctor.available ? 'pill-available' : 'pill-unavailable'}`}>
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <div className="doctor-card-body">
                    <p><strong>Email:</strong> {doctor.email}</p>
                    <p><strong>Specialisation:</strong> {doctor.specialisation}</p>
                  </div>
                  <div className="doctor-card-footer">
                    <button 
                      onClick={() => onToggleAvailability(doctor.id)}
                      className="student-btn btn-toggle"
                    >
                      Toggle Availability
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Doctor Form (Student style) */}
        <div className="add-doctor-section">
          <h3>Register New Doctor</h3>
          <form onSubmit={handleSubmit} className="student-form">
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <div className="form-group">
              <label htmlFor="doc-name">Doctor Name:</label>
              <input 
                type="text" 
                id="doc-name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Dr. John Smith"
                className="student-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="doc-email">Email Address:</label>
              <input 
                type="email" 
                id="doc-email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="john.smith@hospital.com"
                className="student-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="doc-spec">Specialisation:</label>
              <input 
                type="text" 
                id="doc-spec" 
                value={specialisation} 
                onChange={(e) => setSpecialisation(e.target.value)} 
                placeholder="Cardiology, Pediatrics, etc."
                className="student-input"
              />
            </div>

            <div className="form-group checkbox-group">
              <input 
                type="checkbox" 
                id="doc-available" 
                checked={available} 
                onChange={(e) => setAvailable(e.target.checked)} 
              />
              <label htmlFor="doc-available">Mark as Immediately Available</label>
            </div>

            <button type="submit" className="student-btn btn-submit">
              Register Doctor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
