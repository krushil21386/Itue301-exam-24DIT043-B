import React, { useState, useEffect } from 'react';

const DoctorsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/v1/doctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctor data');
        }
        const result = await response.json();
        setData(result);
        setApiError(null);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !specialisation) {
      setError('Please fill in all fields.');
      setSuccess('');
      return;
    }

    const newDoctor = {
      id: data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1,
      name,
      email,
      specialisation,
      available
    };

    setData(prev => [...prev, newDoctor]);

    setName('');
    setEmail('');
    setSpecialisation('');
    setAvailable(true);
    setError('');
    setSuccess('Doctor registered successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleToggleAvailability = (doctorId) => {
    setData(prev => prev.map(doc => 
      doc.id === doctorId ? { ...doc, available: !doc.available } : doc
    ));
  };

  return (
    <div className="page doctors-page">
      <h2>Doctor Management</h2>

      <div className="doctors-content">
        <div className="doctors-list-section">
          <h3>Doctor Directory</h3>
          
          {loading && <div className="loading-indicator">Loading doctor details...</div>}
          
          {apiError && <div className="error-message">Error: {apiError}</div>}
          
          {!loading && !apiError && (
            <div className="doctors-cards-container">
              {data.length === 0 ? (
                <p className="no-data">No doctors registered yet.</p>
              ) : (
                data.map((doctor) => (
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
                        onClick={() => handleToggleAvailability(doctor.id)}
                        className="student-btn btn-toggle"
                      >
                        Toggle Availability
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

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
