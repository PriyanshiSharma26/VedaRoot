
import { Yoga } from "../model/yoga.model.js";
export const addYoga = (request, response, next) => {
    // console.log(request.body);
    Yoga.insertOne(request.body)
        .then(result => {
            return response.status(201).json({ message: "all yoga add" });
        }).catch(err => {
            return response.status(500).json({ error: "Internal server error" });
        })
}

export const saveInBulk = (request, response, next) => {
    console.log(request.body);
    Yoga.insertMany(request.body)
        .then(result => {
            return response.status(201).json({ message: "All yoga Saved..." });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error...." });
        })
}

export const viewYoga = (request, response, next) => {
    console.log("ok")
    console.log(request.body);
    Yoga.find()
        .then(result => {
            console.log("all view yoga");
            return response.status(201).json({ message: "all yoga view... " , result });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error" });
        })
    // response.end("ok")
}



export const getYoga = async (request, response, next) => {
    try {

        const yoga_name = request.params.yoga_name;

        if (!yoga_name) {
            return response.status(400).json({  error: "Yoga name is required" });
        }
        const yoga = await Yoga.findOne({ yoga_name: yoga_name });
        if (yoga) {
            return response.status(200).json({ yoga });
        }
        return response.status(404).json({ error: "Requested resource not available | name not found" });

    } catch (err) {
        console.error('Error in getyoga function:', err);
        return response.status(500).json({
            error: "Internal Server Error...",
            details: err.message
        });
    }
};


export const deleteYoga =(request,response,next)=>{
    let yogaId = request.params.yogaId;
   Yoga.deleteOne({ _id: yogaId })

    .then(result =>{
        console.log(result);
        return response.status(200).json({message :"Yoga delete Success....."});
    }).catch(err =>{
        console.log(err)
        return response.status(404).json({error:"Internal Server Error...."})
    })
}
