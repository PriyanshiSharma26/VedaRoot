  
// import mongoose from "mongoose";

// const remedieSchema = new mongoose.Schema({
    
//     remedy_name:String,
//     ingrediants:String,
//     description:String,
//     instructions:String,
//     imageUrl:[],
//     caution:String,
//     categoryId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "Category",   
//         required: true  
//     }
// });
// export const Remedies=mongoose.model("remedies",remedieSchema)

 
  
import mongoose from "mongoose";

const remedieSchema = new mongoose.Schema({
    
    remedyName:String,
    description:String,
    ingredients:String,
    instructions:String,
    imageUrl:[],
    caution:String,
    categoryname: String
});
export const Remedies=mongoose.model("remedies",remedieSchema)

 

 

 
 

 