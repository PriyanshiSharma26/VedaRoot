import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String,
        required: true 
    },

    contactNo: { 
        type: String,
        required: true,
        unique: true 
    },

    registrationNo: { 
        type: String,
        required: true, 
        unique: true 
    },

    specialization: { 
        type: String,
        required: true 
    },

    // General availability (start and end time) + working days
    availableDays: [
      { 
        type: String, 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], 
        required: true
      }
    ],
    startTime: { 
        type: String, 
        required: true 
    },
    endTime: { 
        type: String, 
        required: true 
    },

    qualification: { 
        type: String 
    },

    experienceYears: { 
        type: Number 
    },

    clinicName: { 
        type: String 
    },

    clinicAddress: { 
        type: String 
    },

    bio: { 
        type: String, 
        maxlength: 1000 
    },

    consultationFee: { 
        type: Number,
        min: [0, 'Consultation fee cannot be negative']
    },

    availability: { 
        type: String, 
        enum: ['available', 'unavailable', 'on leave'], 
        default: 'available' 
    },

    profilePicture: { 
        type: String, 
        match: [/^https?:\/\/[^\s]+$/, 'Please provide a valid URL for the profile picture'] 
    },

    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }
});


const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor

