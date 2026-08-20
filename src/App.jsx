import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import DoctorsPage from './components/DoctorsPage';
import BookingPage from './components/BookingPage';

function App() {
  const [user, setUser] = useState(null); // Simple auth state
  const [activeTab, setActiveTab] = useState('home');

  // 1. Patient Data Entities State
  const [patients, setPatients] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', phone: '9876543210', bloodGroup: 'O+', age: 28 },
    { id: 2, name: 'Priya Patel', email: 'priya.patel@yahoo.com', phone: '8765432109', bloodGroup: 'A-', age: 34 },
    { id: 3, name: 'Amit Kumar', email: 'amit.kumar@outlook.com', phone: '7654321098', bloodGroup: 'B+', age: 45 }
  ]);

  // 2. Doctor Data Entities State
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Aarav Mehta', email: 'aarav.mehta@hospital.com', specialisation: 'Cardiology', available: true },
    { id: 2, name: 'Dr. Sneha Rao', email: 'sneha.rao@hospital.com', specialisation: 'Pediatrics', available: true },
    { id: 3, name: 'Dr. Vikram Sen', email: 'vikram.sen@hospital.com', specialisation: 'Dermatology', available: false }
  ]);

  // 3. Appointment Data Entities State
  const [appointments, setAppointments] = useState([
    { patientId: 1, doctorId: 1, date: '2026-08-25', timeSlot: '10:00 AM - 11:00 AM', status: 'confirmed', reason: 'Monthly cardiovascular checkup' },
    { patientId: 2, doctorId: 2, date: '2026-08-26', timeSlot: '11:00 AM - 12:00 PM', status: 'pending', reason: 'Child routine vaccination' },
    { patientId: 3, doctorId: 1, date: '2026-08-27', timeSlot: '02:00 PM - 03:00 PM', status: 'cancelled', reason: 'Consultation for high blood pressure' }
  ]);

  // Login handler
  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setActiveTab('home');
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
  };

  // Handle appointment status updates (confirmed, pending, cancelled)
  const handleUpdateStatus = (index, newStatus) => {
    setAppointments(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: newStatus };
      return updated;
    });
  };

  // Handle doctor availability toggle
  const handleToggleAvailability = (doctorId) => {
    setDoctors(prev => prev.map(doc => 
      doc.id === doctorId ? { ...doc, available: !doc.available } : doc
    ));
  };

  // Add new doctor
  const handleAddDoctor = (newDoc) => {
    setDoctors(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(d => d.id)) + 1 : 1;
      return [...prev, { id: nextId, ...newDoc }];
    });
  };

  // Add new patient (and return the created patient with its auto-incremented ID)
  const handleAddPatient = (newPat) => {
    const nextId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    const createdPatient = { id: nextId, ...newPat };
    setPatients(prev => [...prev, createdPatient]);
    return createdPatient;
  };

  // Book a new appointment
  const handleBookAppointment = (newAppt) => {
    setAppointments(prev => [...prev, newAppt]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>City Hospital Appointment Portal</h1>
        {user && (
          <div className="user-badge-bar">
            <span>Logged in as: <strong>{user.name}</strong> ({user.role})</span>
            <button onClick={handleLogout} className="student-btn btn-logout">Logout</button>
          </div>
        )}
      </header>

      {/* Show Landing/Login Page if user is not logged in */}
      {!user ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <>
          {/* Navigation menu for switching pages */}
          <nav className="student-navbar">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            >
              Home (Dashboard)
            </button>
            <button 
              onClick={() => setActiveTab('doctors')} 
              className={`nav-btn ${activeTab === 'doctors' ? 'active' : ''}`}
            >
              Doctors Page
            </button>
            <button 
              onClick={() => setActiveTab('booking')} 
              className={`nav-btn ${activeTab === 'booking' ? 'active' : ''}`}
            >
              Book Appointment
            </button>
          </nav>

          {/* Page rendering according to selected tab */}
          <main>
            {activeTab === 'home' && (
              <HomePage 
                appointments={appointments}
                patients={patients}
                doctors={doctors}
                onUpdateStatus={handleUpdateStatus}
              />
            )}

            {activeTab === 'doctors' && (
              <DoctorsPage 
                doctors={doctors}
                onToggleAvailability={handleToggleAvailability}
                onAddDoctor={handleAddDoctor}
              />
            )}

            {activeTab === 'booking' && (
              <BookingPage 
                patients={patients}
                doctors={doctors}
                onBookAppointment={handleBookAppointment}
                onAddPatient={handleAddPatient}
              />
            )}
          </main>
        </>
      )}

      <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '15px' }}>
        <p>Hospital Appointment System - CIE Practical Exam Project</p>
      </footer>
    </div>
  );
}

export default App;
