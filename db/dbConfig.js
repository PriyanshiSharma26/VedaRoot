import mongoose from "mongoose";


const connectToDatabase=async()=>{
mongoose.connect("mongodb://localhost:27017/AyurvedDB")
.then(()=>{
    console.log("Database connected....");
}).catch(err=>{
    console.log(err);
})
}

export default connectToDatabase