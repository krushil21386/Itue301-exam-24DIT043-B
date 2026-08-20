import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import DoctorsPage from './components/DoctorsPage';
import BookingPage from './components/BookingPage';
import { AppProvider } from './AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <header className="app-header">
            <h1>City Hospital Appointment Portal</h1>
          </header>
          
          <nav className="student-navbar">
            <Link to="/" className="nav-btn">Home (Dashboard)</Link>
            <Link to="/doctors" className="nav-btn">Doctors Page</Link>
            <Link to="/booking" className="nav-btn">Book Appointment</Link>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/booking" element={<BookingPage />} />
            </Routes>
          </main>

          <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '12px', color: '#666', borderTop: '1px solid #ccc', paddingTop: '15px' }}>
            <p>Hospital Appointment System - CIE Practical Exam Project</p>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
