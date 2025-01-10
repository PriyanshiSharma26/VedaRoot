import Category from "../model/category.js";
import { Product } from "../model/product.js";

// Add multiple products
export const addProducts = async (req, res, next) => {
  try {
    const products = req.body; // Assuming products are sent in an array

    // Optional: Validate each product here if needed
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: "Invalid data format. Expected an array of products." });
    }

    await Product.insertMany(products); // Bulk insert products
    return res.status(200).json({ message: "Products added successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// View all products
// export const viewProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find(); // Consider adding pagination if needed

//     if (!products || products.length === 0) {
//       return res.status(404).json({ message: "No products found." });
//     }

//     return res.status(200).json({ products });

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Delete a product by ID
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a product by ID
export const updateProduct = async (req, res, next) => {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const result = await Product.updateOne({ _id: req.params.id }, { $set: { name: productName } });

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Product not found or no changes made" });
    }

    return res.status(200).json({ message: "Product updated" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get products with their associated categories
export const getProductWithCategories = async (req, res, next) => {
  try {
    const products = await Product.find().populate("categoryId");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }

    return res.status(200).json({ products });

  } catch (err) {
    console.error("Error:", err); 
    return res.status(500).json({ error: "Failed to fetch products with categories" });
  }
};


// export const createProduct = async (req, res) => {
//   try {
//     // Find the category (make sure it exists)
//     const category = await Category.findById(req.body.categoryId); // Assuming categoryId is passed in the request body

//     if (!category) {
//       return res.status(404).send("Category not found");
//     }

//     // Create the new product and associate it with the category
//     const newProduct = new Product({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       ingredients: req.body.ingredients,
//       dosage: req.body.dosage,
//       stock: req.body.stock,
//       rating: req.body.rating,
//       brand: req.body.brand,
//       images: req.body.images,
//       size: req.body.size,
//       organic: req.body.organic,
//       certifications: req.body.certifications,
//       expiry_date: req.body.expiry_date,
//       category: category._id, // Set the category reference
//     });

//     await newProduct.save(); // Save the product to the database

//     res.status(201).json(newProduct); // Return the newly created product
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error creating product");
//   }
// };

