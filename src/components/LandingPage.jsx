import React, { useState } from 'react';

const LandingPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Patient');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }
    setError('');
    onLogin({ name: username, role });
  };

  return (
    <div className="page landing-page">
      <div className="landing-hero">
        <h2>Welcome to City Hospital</h2>
        <p className="landing-subtitle">Appointment Management & Scheduling System</p>
      </div>

      <div className="login-box">
        <h3>Portal Login</h3>
        <form onSubmit={handleLoginSubmit} className="student-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="login-username">Username / Name:</label>
            <input
              type="text"
              id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="student-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-role">Select Role:</label>
            <select
              id="login-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="student-select"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Administrator</option>
            </select>
          </div>

          <button type="submit" className="student-btn btn-submit">
            Login & Enter Portal
          </button>
        </form>
      </div>

      <div className="quick-info-section">
        <h4>System Features</h4>
        <ul className="info-bullets">
          <li><strong>Patients:</strong> Schedule new appointments and track status.</li>
          <li><strong>Doctors:</strong> Manage directory and toggle immediate availability.</li>
          <li><strong>Admins:</strong> Oversee appointments and approve/cancel bookings.</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
