require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const Product = require("../schema/product");

cloudinary.config({
  cloud_name: "dwsb4wnhn",
  api_key: "369441825263223",
  api_secret: "AwoR08f77vI5MgphE75z2jeYnC0",
});

const postNewProduct = async (req, res) => {
  try {
    const {
      productName,
      productType,
      productCategory,
      productSize,
      productGender,
      productPrice,
      productQuantity,
      productColor,
      productImages,
      productDescription,
    } = req.body;

    console.log(req.body);

    let productImagesUrls = [];
    // Iterate over productImages and upload each image to Cloudinary
    for (const image of productImages) {
      const photoUrl = await cloudinary.uploader.upload(image);
      productImagesUrls.push(photoUrl.url);
    }

    console.log(productImagesUrls);

    // Create a new product using the extracted data
    const newProduct = new Product({
      productName,
      productType,
      productCategory,
      productSize,
      productGender,
      productPrice,
      productQuantity,
      productColor,
      productImages: productImagesUrls, // Use the updated array
      productDescription,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    console.log(savedProduct);

    res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    console.log(products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch products, please try again",
    });
  }
};

const deleteOneProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a parameter

    // Use Mongoose to find and delete the product by its ID
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to delete the product, please try again",
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Use Mongoose to find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to retrieve the product, please try again",
    });
  }
};

const updateOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    if (req.body.image) {
      const photoUrl = await cloudinary.uploader.upload(req.body.image);
      req.body.image = photoUrl.url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    console.log(updatedProduct);

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to update the product, please try again",
    });
  }
};

module.exports = {
  getAllProducts,
  postNewProduct,
  getOneProduct,
  deleteOneProduct,
  updateOneProduct,
};
