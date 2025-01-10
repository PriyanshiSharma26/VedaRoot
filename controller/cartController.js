import { Cart } from "../model/cart.js";
// import { User } from "../model/user.js";
import { Product } from "../model/product.js";

export  const addToCart = async (req,res,next) => {

       try {

          // add to cart
               const { userId,productId, quantity} = req.body;

                // const user = await User.findById(userId);

            // if(!user)
            // {
            //        return res.status(404).json({message: "user not found"});
            // }

            const product = await Product.findById(productId);

            if(!product)
            {
                 return res.status(404).json({message : "product not found"});
                 
            }

             const existingCartItem = await Cart.findOne({userId,productId});

             if(existingCartItem)
             {
                    existingCartItem.quantity += quantity;
                    existingCartItem.price = product.price * existingCartItem.quantity;
                    existingCartItem.updatedAt = Date.now();


                    await existingCartItem.save();

                    return res.status(200).json({

                        message:"Product quantity updated in cart",
                          cartIem: existingCartItem
                    });

             } else {

                   const newcartItem  = new Cart({

                        userId,
                        productId,
                         quantity,
                          price: product.price * quantity,
                          createdAt: Date.now(),
                          updatedAt: Date.now() 
                   });

                   await newcartItem.save();

                    return res.status(201).json({
                        message: "product added to cart",
                          cartItem: newcartItem
                    });
             }
       }
       
       catch(err)
       {
            console.log(err);
            return res.status(500).json({ message: 'Server error', error: err.message });

       }
      
}

export const fetchCart = (req,res,next) => {

       Cart.find().then(result => {

        console.log(result);
        
      return res.status(200).json({cart: result});
       
 }).catch(err => {

        console.log(err);
        return res.status(500).json({error: "Internal server error"});
        
 });
}


export const  removeItems = (req,res,next) => {

     Cart.deleteOne({_id: req.params.id}).then(
         result => {
               
              return res.status(200).json({message: "cart item is removed"});
         }
     ).catch(err => {

           return res.status(500).json({error: "Internal server error"});
     })
}