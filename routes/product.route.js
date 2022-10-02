const express = require('express');
// const { post } = require('../app');
const router = express.Router();
const productController = require('../controllers/product.controller');
const multer = require("multer");

const uploader = multer({ dest: "images/" })

router.post("/file-upload", uploader.single("image"), productController.fileUpload);



router.route("/bulk-update").patch(productController.bulkUpdateProduct)
router.route("/bulk-delete").delete(productController.bulkDeleteProduct)

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)

router.route("/:id")
    .patch(productController.updateProduct)
    .delete(productController.deleteProductById)

module.exports = router;