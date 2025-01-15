 
// import mongoose from "mongoose";

// const yogaSchema = mongoose.Schema({
//     yoga_name:String, 
//     benefits:String,
//     description:String,
//     image_url:[],
//     categoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Category",   
//         required: true   
//     }


// });

// export const Yoga = mongoose.model("Yoga",yogaSchema);
 
 
import mongoose from "mongoose";

const yogaSchema = mongoose.Schema({
    yogaName:String, 
    benefits:String,
    instructions:String,
    imageUrl:[],
    videoUrl:[],
    categoryname:String
      
    


});

export const Yoga = mongoose.model("Yoga",yogaSchema);
 

 
 