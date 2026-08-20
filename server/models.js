import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Patient name is required']
  },
  email: {
    type: String,
    required: [true, 'Patient email is required'],
    unique: true
  },
  phone: {
    type: String
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-'
    }
  },
  age: {
    type: Number
  }
});

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required']
  },
  email: {
    type: String
  },
  specialisation: {
    type: String,
    required: [true, 'Specialisation is required']
  },
  available: {
    type: Boolean,
    default: true
  }
});

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient ID is required']
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor ID is required']
  },
  date: {
    type: String,
    required: [true, 'Appointment date is required']
  },
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'confirmed', 'cancelled'],
      message: 'Status must be pending, confirmed, or cancelled'
    },
    default: 'pending'
  },
  reason: {
    type: String,
    maxlength: [300, 'Reason cannot exceed 300 characters']
  }
});

export const Patient = mongoose.model('Patient', patientSchema);
export const Doctor = mongoose.model('Doctor', doctorSchema);
export const Appointment = mongoose.model('Appointment', appointmentSchema);
