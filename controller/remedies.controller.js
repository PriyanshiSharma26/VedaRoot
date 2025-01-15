 
import { Remedies } from "../model/remedies.model.js";
export const addRemedies = (request, response, next) => {
    console.log(request.body);
    Remedies.insertMany(request.body)
        .then(result => {
            return response.status(201).json({ message: "all remedies add" });
        }).catch(err => {
            return response.status(500).json({ error: "Internal server error" });
        })
}

export const viewRemedies = (request, response, next) => {
    Remedies.find(request.body)
        .then(result => {
            return response.status(201).json({ message: "all remedies view... "  , result});
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error" })
        })
}

export const saveInBulk = (request, response, next) => {
    console.log(request.body);
    Remedies.insertMany(request.body)
        .then(result => {
            return response.status(201).json({ message: "All Remedies Saved..." });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error...." });
        })
}

export const getRemedies = async (request, response, next) => {
    try {

        const remedies_name = request.params.remedies_name;
          console.log(remedies_name);
          
        if (!remedies_name) {
            return response.status(400).json({ error: "Remedies name is required" });
        }
        const remedies = await Remedies.findOne({remedy_name:remedies_name});
        console.log(remedies);
        if (remedies) {
            return response.status(200).json({ remedies });
        }
        return response.status(404).json({ err: "Requested resource not available | name not found" });

    } catch (err) {
                 
        return response.status(500).json({
            err: "Internal Server Error...",
            details: err.message
        });
    }
};


export const deleteRemedies =(request,response,next)=>{
    let remediesId = request.params.remediesId;
   Remedies.deleteOne({ _id: remediesId })

    .then(result =>{
        console.log(result);
        return response.status(200).json({message :"Remedies delete Success....."});
    }).catch(err =>{
        console.log(err)
        return response.status(404).json({error:"Internal Server Error...."})
    })
}
