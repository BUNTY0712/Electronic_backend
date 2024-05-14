const Product = require('../models/productModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage }).single("image");

exports.insertProductController = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
          error: err.message
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
          error: err.message
        });
      }

      const { price, productName, productDescription, Brand, offerPrice, productVariation } = req.body;
      const image = req.file.filename;

      const product = new Product({
        price,
        productName,
        productDescription,
        Brand,
        offerPrice,
        productVariation,
        image
      });

      const savedProduct = await product.save();

      return res.status(201).json({
        success: true,
        product: {
          ...savedProduct._doc,
          image: savedProduct.image.replace('image/', '') // removing 'image/' from image path
        }
      });
    });
  } catch (error) {
    console.error("Error while inserting product:", error);
    return res.status(500).json({
      success: false,
      message: "Error inserting product",
      error: error.message
    });
  }
};

exports.getAllProductController = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      products: products.map(product => ({
        ...product._doc,
        image: product.image.replace('image/', '') // removing 'image/' from image path
      }))
    });
  } catch (error) {
    console.error("Error while getting products:", error);
    return res.status(500).json({
      success: false,
      message: "Error getting products",
      error: error.message
    });
  }
};



// const Product = require('../models/productModel');

// exports.insertProductController = async (req, res) => {
//     try {
//         const {
//             image,
//             price,
//             productName,
//             productDescription,
//             Brand,
//             offerPrice,
//             productVariation
//         } = req.body;
//         if(!image || !price || !productName || !productDescription || !Brand || !offerPrice || !productVariation ){
//             return res.status(400).send({
//                success: false,
//                message: "Please fill all fields"
//             });
//         }
//         const newProduct = new Product({
//             image,
//             price,
//             productName,
//             productDescription,
//             Brand,
//             offerPrice,
//             productVariation
//         })
//         await newProduct.save();
//         return res.status(200).json({
//             success: true,
//             message: "Product Created Successfully",
//             product: newProduct
//         });
//     } catch (error) {
//         console.error("Error while inserting:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error inserting rating",
//             error: error.message
//         });
//     }
// }

// exports.getAllProductController = async (req, res) => {
//     try {
//         const products = await Product.find();
//         return res.status(200).json({
//             success: true,
//             products: products
//         });
//     } catch (error) {
//         console.error("Error while getting products:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error getting products",
//             error: error.message
//         });
//     }
// }




//best get 

// exports.getAllProductController = async (req, res) => {
//     try {
//       const products = await Product.find();
//       return res.status(200).json({
//         success: true,
//         products: products.map(product => ({
//           ...product._doc,
//           image: product.image.replace('image\\', '') // removing 'image\' from image path
//         }))
//       });
//     } catch (error) {
//       console.error("Error while getting products:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error getting products",
//         error: error.message
//       });
//     }
//   };