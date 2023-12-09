const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  postNewProduct,
  getOneProduct,
  deleteOneProduct,
  updateOneProduct,
} = require("../models/product.model");

const {
  verifyToken,
  verifyTokenAdmin,
  verifySecretAdmin,
} = require("../middlewares/authMidllewares");

router.route("/addProduct").post(postNewProduct);

router.route("/products").get(getAllProducts);

router
  .route("/products/:id")
  .get(getOneProduct)
  .delete(deleteOneProduct)
  .put(updateOneProduct);

module.exports = router;
