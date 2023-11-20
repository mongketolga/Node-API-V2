const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getSingleProduct);
router.put("/:id", updateSingleProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
