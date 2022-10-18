const express = require('express');
// const { post } = require('../app');
const router = express.Router();
const productController = require('../controllers/product.controller');
const uploader = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');
const authorization = require("../middleware/authorization");

// router.use(verifyToken);

// const multer = require("multer");

// const uploader = multer({ dest: "images/" })

// router.post("/file-upload", uploader.single("image"), productController.fileUpload);
router.post("/file-upload", uploader.array("image"), productController.fileUpload);

// <input type = "file" name = "image" />
// const formData = new FormData();
// formData.append("image",formData);


router.route("/bulk-update").patch(productController.bulkUpdateProduct)
router.route("/bulk-delete").delete(productController.bulkDeleteProduct)

router.route('/')
    .get(productController.getProducts)
    .post(verifyToken, authorization("admin","store-manager"), productController.createProduct);

router.route("/:id")
    .patch(productController.updateProduct)
    .delete(authorization("admin"), productController.deleteProductById)

module.exports = router;