import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Patient, Doctor, Appointment } from './models.js';

dotenv.config();

const formatMongooseError = (err) => {
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return {
      success: false,
      errorType: 'ValidationError',
      errors: messages
    };
  }
  return {
    success: false,
    message: err.message || 'An unexpected error occurred'
  };
};

const run = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!');

    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    console.log('Cleaned up existing database collections.');

    console.log('\n--- DEMONSTRATION 1: SUCCESSFUL INSERTION ---');
    const doctor = await Doctor.create({
      name: 'Dr. Jane Foster',
      email: 'jane.foster@hospital.com',
      specialisation: 'Neurology',
      available: true
    });
    console.log(`Doctor created: ${doctor.name} (ID: ${doctor._id})`);

    const patient = await Patient.create({
      name: 'Bruce Banner',
      email: 'bruce.banner@gmail.com',
      phone: '555-0199',
      bloodGroup: 'AB+',
      age: 42
    });
    console.log(`Patient created: ${patient.name} (ID: ${patient._id})`);

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor._id,
      date: '2026-09-10',
      timeSlot: '09:00 AM - 10:00 AM',
      status: 'pending',
      reason: 'Regular consultation for anger management'
    });
    console.log(`Appointment created successfully with ID: ${appointment._id}`);

    console.log('\n--- DEMONSTRATION 2: VALIDATION FAILURE (INVALID BLOOD GROUP) ---');
    try {
      await Patient.create({
        name: 'Tony Stark',
        email: 'tony@starkindustries.com',
        bloodGroup: 'Z-',
        age: 48
      });
    } catch (err) {
      console.log('Raw error caught, formatting...');
      const formatted = formatMongooseError(err);
      console.log('Meaningful formatted error response:', JSON.stringify(formatted, null, 2));
    }

    console.log('\n--- DEMONSTRATION 3: VALIDATION FAILURE (REASON EXCEEDING 300 CHARS) ---');
    try {
      const extremelyLongReason = 'a'.repeat(301);
      await Appointment.create({
        patientId: patient._id,
        doctorId: doctor._id,
        date: '2026-09-12',
        timeSlot: '11:00 AM - 12:00 PM',
        status: 'confirmed',
        reason: extremelyLongReason
      });
    } catch (err) {
      console.log('Raw error caught, formatting...');
      const formatted = formatMongooseError(err);
      console.log('Meaningful formatted error response:', JSON.stringify(formatted, null, 2));
    }

    console.log('\n--- DEMONSTRATION 4: VALIDATION FAILURE (MISSING REQUIRED FIELD) ---');
    try {
      await Doctor.create({
        email: 'nameless@hospital.com'
      });
    } catch (err) {
      console.log('Raw error caught, formatting...');
      const formatted = formatMongooseError(err);
      console.log('Meaningful formatted error response:', JSON.stringify(formatted, null, 2));
    }

  } catch (error) {
    console.error('Database script execution error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB. Demonstration finished.');
  }
};

run();
