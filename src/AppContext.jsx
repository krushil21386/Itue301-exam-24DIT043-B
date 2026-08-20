import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const initialPatients = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', phone: '9876543210', bloodGroup: 'O+', age: 28 },
  { id: 2, name: 'Priya Patel', email: 'priya.patel@yahoo.com', phone: '8765432109', bloodGroup: 'A-', age: 34 },
  { id: 3, name: 'Amit Kumar', email: 'amit.kumar@outlook.com', phone: '7654321098', bloodGroup: 'B+', age: 45 }
];

const initialDoctors = [
  { id: 1, name: 'Dr. Aarav Mehta', email: 'aarav.mehta@hospital.com', specialisation: 'Cardiology', available: true },
  { id: 2, name: 'Dr. Sneha Rao', email: 'sneha.rao@hospital.com', specialisation: 'Pediatrics', available: true },
  { id: 3, name: 'Dr. Vikram Sen', email: 'vikram.sen@hospital.com', specialisation: 'Dermatology', available: false }
];

const initialAppointments = [
  { patientId: 1, doctorId: 1, date: '2026-08-25', timeSlot: '10:00 AM - 11:00 AM', status: 'confirmed', reason: 'Monthly cardiovascular checkup' },
  { patientId: 2, doctorId: 2, date: '2026-08-26', timeSlot: '11:00 AM - 12:00 PM', status: 'pending', reason: 'Child routine vaccination' },
  { patientId: 3, doctorId: 1, date: '2026-08-27', timeSlot: '02:00 PM - 03:00 PM', status: 'cancelled', reason: 'Consultation for high blood pressure' }
];

export const AppProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('patients');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('doctors');
    return saved ? JSON.parse(saved) : initialDoctors;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleUpdateStatus = (index, newStatus) => {
    setAppointments(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: newStatus };
      return updated;
    });
  };

  const handleToggleAvailability = (doctorId) => {
    setDoctors(prev => prev.map(doc => 
      doc.id === doctorId ? { ...doc, available: !doc.available } : doc
    ));
  };

  const handleAddDoctor = (newDoc) => {
    setDoctors(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(d => d.id)) + 1 : 1;
      return [...prev, { id: nextId, ...newDoc }];
    });
  };

  const handleAddPatient = (newPat) => {
    const nextId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    const createdPatient = { id: nextId, ...newPat };
    setPatients(prev => [...prev, createdPatient]);
    return createdPatient;
  };

  const handleBookAppointment = (newAppt) => {
    setAppointments(prev => [...prev, newAppt]);
  };

  return (
    <AppContext.Provider value={{
      patients,
      doctors,
      appointments,
      handleUpdateStatus,
      handleToggleAvailability,
      handleAddDoctor,
      handleAddPatient,
      handleBookAppointment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
