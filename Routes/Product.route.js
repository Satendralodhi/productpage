const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/Product.Controller");
router.get("/:id", ProductController.getProductsbyId);
router.post("/:productId/wishlist", ProductController.createuserWishlistModel);
router.post("/:productId/rating", ProductController.CreateRatings);
router.post("/", ProductController.CreateProduct);
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
