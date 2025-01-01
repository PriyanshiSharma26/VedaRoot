import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import Doctor from '../model/Doctor.model.js'; 
import jwt from 'jsonwebtoken';

export const doctorSignUp = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Bad request', details: errors.array() });
        }

        
        const { name, email, password, contactNo, registrationNo, specialization, startTime, endTime, availableDays, gender } = req.body;

    
        let existingDoctor = await Doctor.findOne({ $or: [{ email }, { contactNo }] });
        if (existingDoctor) {
            return res.status(400).json({ error: 'Email or contact number is already in use' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const doctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            contactNo,
            registrationNo,
            specialization,
            startTime,
            endTime,
            availableDays,
            gender
        });

    
        await doctor.save();

        
        doctor.password = undefined;

        
        res.status(201).json({ message: 'Doctor created successfully', doctor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




export const doctorSignIn = async (req, res) => {
    try {
        
        const { email, password } = req.body;


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Bad request', details: errors.array() });
        }

        
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

    
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        
        doctor.password = undefined;


        const token = generateToken(doctor._id);

        
        res.status(200).json({
            message: 'Sign-in successful',
            doctor,
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const generateToken = (doctorId) => {
    return jwt.sign({ payload: doctorId }, "fsdfsdrereioruxvxncnv");
};


