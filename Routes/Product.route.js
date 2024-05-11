const express = require("express");
const router = express.Router();
const multer = require("multer");
const CreateProductverify = require("../middleware/createproduct");
const upload = require("../middleware/storage.middleware");
const image_video_upload = upload.fields([
  { name: "images", maxCount: 4 },
  { name: "videos", maxCount: 4 },
]);

const ProductController = require("../Controllers/Product.Controller");
router.post(
  "/:productId/uploadimage_video",
  image_video_upload,
  ProductController.uploadimage_video
);
router.get("/:id", ProductController.getProductsbyId);
router.post("/:productId/wishlist", ProductController.createuserWishlistModel);
router.post("/:productId/rating", ProductController.CreateRatings);
router.post("", CreateProductverify, ProductController.CreateProduct);
router.get("/category/:category", ProductController.findproductbycategory);
router.get("/color/:color", ProductController.findproductbycolor);
router.get("/size/:size", ProductController.findproductbysize);
router.get("/gender/:gender", ProductController.findproductbygender);
router.get("/price/:min/:max", ProductController.findproductbyprice);
router.get("/tag/:tag", ProductController.findproductbytag);
router.get("/brand/:brand", ProductController.findproductbybrand);
router.put("/:productId", ProductController.UpdateProductByid);
router.delete("/:productId", ProductController.DeleteProductByid);
router.get("/:productId/related", ProductController.getRelatedProductByid);

module.exports = router;
