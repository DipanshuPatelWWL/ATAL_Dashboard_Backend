const express = require("express");
const router = express.Router();
const productController = require("../controller/product-controller");

const upload = require("../middleware/multer"); // make sure multer.js is in middleware folder

router.post(
    "/addProduct",
    upload.fields([
        { name: "product_image_collection", maxCount: 10 },
        { name: "product_lens_image1", maxCount: 1 },
        { name: "product_lens_image2", maxCount: 1 },
    ]),
    productController.addProduct
);

router.get("/getAllProduct", productController.getAllProducts);
router.get("/getProductById/:id", productController.getProductById);

router.put(
    "/updateProduct/:id",
    upload.fields([
        { name: "product_image_collection", maxCount: 10 },
        { name: "product_lens_image1", maxCount: 1 },
        { name: "product_lens_image2", maxCount: 1 },
    ]),
    productController.updateProduct
);

router.delete("/deleteProduct/:id", productController.deleteProduct);
router.get("/getProducts/:cat_sec/:subCategoryName", productController.getProdcutByCategoryname)
router.get("/getproductbyid/:id",productController.getProductByid)

module.exports = router;
