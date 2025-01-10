import Category from  "../model/category.js";


export const addCategories = (req,res,next) => {

       console.log(req.body);
       
          
         Category.insertMany(req.body).then(result => {

              return res.status(200).json({message : "categories added successfully"});
         }).catch(err => {

               console.log(err);
               return res.status(500).json({error: "Internal server error"});
               
         })
         
}

export const viewCategories = (req,res,next) => {
            //  console.log(req.body);
             

        Category.find().then(result => {

               console.log(result);
               
             return res.status(200).json({categories: result});
              
        }).catch(err => {

               console.log(err);
               return res.status(500).json({error: "Internal server error"});
               
        });
}

export const deleteCategory =  (req,res,next) =>
{
           Category.deleteOne({_id: req.params.id}).then(result => {

                  return res.status(200).json({message: "category deleted"});
                   
           }).catch(err => {

                  console.log(err);
                  return res.status(500).json({error: "Internal server"});
                  
           })

}

export const updateCategory = (req,res,next) => {

           
         let  { categoryName } = req.body;             
          Category.updateOne({_id :req.params.id},{ $set: {name : categoryName}}).then(

              result => {

                        return res.status(200).json({message: "category updated"});
              }
          ).catch(err => {

              return res.status(500).json({error: "Internal server error"});
       })
}

