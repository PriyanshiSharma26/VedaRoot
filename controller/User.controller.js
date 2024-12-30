import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../model/User.model.js'; 
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Bad request', details: errors.array() });
        }

        const { userName, email, password, contactNo, address, city, state, pinCode, gender } = req.body;

        
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const user = new User({
            userName,
            email,
            password: hashedPassword,
            contactNo,
            address,
            city,
            state,
            pinCode,
            gender
        });

    
        await user.save();

        
        user.password = undefined;

        
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




export const signIn = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Bad request', details: errors.array() });
        }

    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password',  });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        
        user.password = undefined;

    
        res.status(200).json({ message: 'Sign-in successful', user ,token: generateToken(user._id)});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const generateToken = (userId)=>{
    let token = jwt.sign({payload: userId},"fsdfsdrereioruxvxncnv");
    return token; 
 }
