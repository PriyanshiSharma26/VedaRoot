import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  userName: {
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
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pinCode: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
    
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
    set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() // Normalizes input to 'Male', 'Female', 'Other'
  }
});


const User = mongoose.model('User', UserSchema);

export default User;
