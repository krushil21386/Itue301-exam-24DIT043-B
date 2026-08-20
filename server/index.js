import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const doctors = [
  { id: 1, name: 'Dr. Aarav Mehta', email: 'aarav.mehta@hospital.com', specialisation: 'Cardiology', available: true },
  { id: 2, name: 'Dr. Sneha Rao', email: 'sneha.rao@hospital.com', specialisation: 'Pediatrics', available: true },
  { id: 3, name: 'Dr. Vikram Sen', email: 'vikram.sen@hospital.com', specialisation: 'Dermatology', available: false }
];

const appointments = [
  { patientId: 1, doctorId: 1, date: '2026-08-25', timeSlot: '10:00 AM - 11:00 AM', status: 'confirmed', reason: 'Monthly cardiovascular checkup' },
  { patientId: 2, doctorId: 2, date: '2026-08-26', timeSlot: '11:00 AM - 12:00 PM', status: 'pending', reason: 'Child routine vaccination' },
  { patientId: 3, doctorId: 1, date: '2026-08-27', timeSlot: '02:00 PM - 03:00 PM', status: 'cancelled', reason: 'Consultation for high blood pressure' }
];

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.path} [${timestamp}]`);
  next();
};

app.use(requestLogger);

app.get('/api/v1/appointments', (req, res, next) => {
  try {
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
});

app.post('/api/v1/appointments', (req, res, next) => {
  try {
    const { patientId, doctorId, date, timeSlot, status, reason } = req.body;
    if (!patientId || !doctorId || !date || !timeSlot || !status) {
      const err = new Error('Missing required fields');
      err.statusCode = 400;
      throw err;
    }
    const newAppointment = {
      patientId: parseInt(patientId),
      doctorId: parseInt(doctorId),
      date,
      timeSlot,
      status,
      reason: reason || ''
    };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
});

app.get('/api/v1/doctors', (req, res, next) => {
  try {
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
});

app.get('/api/v1/trigger-error', (req, res, next) => {
  next(new Error('This is a simulated unhandled server error.'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
