import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
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
        required: true,
        unique: true
    },
    lastLogin: {
        type: Date,
        
    }
});

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
