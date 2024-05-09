//table created by default
const Product = require("../model/Productmodel");
const SEO_Model = require("../model/SeoModel");
const Dimension_Model = require("../model/DimensionModel");
const Ratings_Model = require("../model/RatingModle");
const Discount_Model = require("../model/DiscountModel");
const Shipping_Model = require("../model/ShipingModel");
const video_Model = require("../model/VideoModel");
const Image_Model = require("../model/ImageModel");
const userWishlistModel = require("../model/userWishlistModel");
const path = require("path");
const { Sequelize } = require("sequelize");
const connection = require("../database/config");
const createError = require("http-errors");

module.exports = {
  createuserWishlistModel: async (req, res, next) => {
    const productId = req.params.productId;
    try {
      const { wishlist } = req.body;
      const result = await userWishlistModel.create({
        ProductTableProductId: productId,
        wishlist: wishlist,
      });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  // get all product detail

  getProductsbyId: async (req, res, next) => {
    const productId = req.params.id;
    try {
      const results = await Product.findAll({
        where: { productId },
        include: [
          SEO_Model,
          Shipping_Model,
          Dimension_Model,
          Ratings_Model,
          Discount_Model,
          video_Model,
          Image_Model,
        ],
      });

      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  getRelatedProductByid: async (req, res, next) => {
    const productId = req.params.productId;
    try {
      const product = await Product.findAll({
        where: { productId },
      });
      let [{ relatedProducts }] = product;

      if (!relatedProducts || relatedProducts.length === 0) {
        result = "empty related product";
      }
      const allRelatedProducts = await Product.findAll({
        where: {
          productId: relatedProducts,
        },
        include: [
          SEO_Model,
          Shipping_Model,
          Dimension_Model,
          Ratings_Model,
          Discount_Model,
          video_Model,
          Image_Model,
        ],
      });

      // res.send(relatedProducts)
      console.log(allRelatedProducts);
      res.send(allRelatedProducts);
    } catch (error) {
      console.log(error.message);
    }
  },
  // create product post api

  CreateProduct: async (req, res, next) => {
    try {
      let result;
      console.log(req.files["images"]);

      if (req.body.price != null) {
        const product = await Product.create({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          brand: req.body.brand,
          category: req.body.category,
          subCategory: req.body.subCategory,
          color: req.body.color,
          size: req.body.size,
          gender: req.body.gender,
          attributes: req.body.attributes,
          features: req.body.features,
          availability: req.body.availability,
          quantity: req.body.quantity,
          sold: req.body.sold,
          tags: req.body.tags,
          inventoryManagement: req.body.inventoryManagement,
          relatedProducts: req.body.relatedProducts,
          customizationOptions: req.body.customizationOptions,
        });
        const ProductTableProductId = product.productId;

        const seo = await SEO_Model.create({
          ProductTableProductId: ProductTableProductId,
          productId: ProductTableProductId,
          metaTitle: req.body.metaTitle,
          metaDescription: req.body.metaDescription,
          metaKeywords: req.body.metaKeywords,
        });

        const dimentionT = await Dimension_Model.create({
          ProductTableProductId: ProductTableProductId,
          productId: ProductTableProductId,
          length: req.body.length,
          width: req.body.width,
          height: req.body.height,
        });
        const DiscountT = await Discount_Model.create({
          ProductTableProductId: ProductTableProductId,
          productId: ProductTableProductId,
          type: req.body.type,
          value: req.body.value,
        });

        const shippingT = await Shipping_Model.create({
          ProductTableProductId: ProductTableProductId,
          productId: ProductTableProductId,
          weight: req.body.weight,
          restriction: req.body.restriction,
        });
        const ratingT = await Ratings_Model.create({
          ProductTableProductId: ProductTableProductId,
          productId: ProductTableProductId,
          rating: req.body.rating,
          review: req.body.review,
        });
        result = "product created succesfully";
      } else if (
        req.body.ProductTableProductId != null &&
        (req.body.rating != null || req.body.review != null)
      ) {
        const ratingT = await Ratings_Model.create({
          productId: req.body.ProductTableProductId,
          ProductTableProductId: req.body.ProductTableProductId,
          userId: req.body.userId,
          rating: req.body.rating,
          review: req.body.review,
        });
        result = ratingT;
      } else if (
        req.body.ProductTableProductId != null &&
        (req.body.type || req.body.value)
      ) {
        console.log("discount");
        const DiscountT = await Discount_Model.create({
          productId: req.body.ProductTableProductId,
          ProductTableProductId: req.body.ProductTableProductId,
          type: req.body.type,
          value: req.body.value,
        });
        result = DiscountT;
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
  uploadimage_video: async (req, res, next) => {
    try {
      const ProductTableProductId = req.params.productId;
      console.log(req.files["images"]);
      const imagepath = req.files["images"].path;
      console.log(imagepath);
      let result;
      if (req.files["images"]) {
        const imageT = await Image_Model.create({
          ProductTableProductId: ProductTableProductId,
          productId: ProductTableProductId,
          images: req.files["images"],
        });

        result = "image is store";
      }
      if (req.files["videos"]) {
        const videoT = await video_Model.create({
          ProductTableProductId: ProductTableProductId,
          productId: ProductTableProductId,
          videos: req.files["videos"],
        });
        result += " video is store";
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  CreateRatings: async (req, res, next) => {
    try {
      let result;
      const ProductTableProductId = req.params.productId;

      const ratingT = await Ratings_Model.create({
        ProductTableProductId: ProductTableProductId,
        productId: ProductTableProductId,
        rating: req.body.rating,
        review: req.body.review,
      });
      result = "ratings created succesfully";

      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findproductbytag: async (req, res, next) => {
    try {
      const tag = req.params.tag;
      console.log(tag);
      const result = await Product.findAll({
        where: {
          tags: {
            [Sequelize.Op.contains]: [tag], ///this is not work
          },
        },
      });
      console.log(result);
      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findproductbyprice: async (req, res, next) => {
    try {
      const min = req.params.min;
      const max = req.params.max;
      const result = await Product.findAll({
        where: {
          price: {
            [Sequelize.Op.between]: [parseInt(min), parseInt(max)],
          },
        },
        include: [
          SEO_Model,
          Shipping_Model,
          Dimension_Model,
          Ratings_Model,
          Discount_Model,
          video_Model,
          Image_Model,
        ],
      });

      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
  findproductbysize: async (req, res, next) => {
    try {
      const size = req.params.size;
      const result = await Product.findAll({
        where: { size },
        include: [
          SEO_Model,
          Shipping_Model,
          Dimension_Model,
          Ratings_Model,
          Discount_Model,
          video_Model,
          Image_Model,
        ],
      });

      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
  findproductbygender: async (req, res, next) => {
    try {
      const gender = req.params.gender;
      const result = await Product.findAll({
        where: { gender },
        include: [
          SEO_Model,
          Shipping_Model,
          Dimension_Model,
          Ratings_Model,
          Discount_Model,
          video_Model,
          Image_Model,
        ],
      });

      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findproductbybrand: async (req, res, next) => {
    try {
      const brand = req.params.brand;
      const result = await Product.findAll({
        where: { brand },
        include: [
          SEO_Model,
          Shipping_Model,
          Dimension_Model,
          Ratings_Model,
          Discount_Model,
          video_Model,
          Image_Model,
        ],
      });

      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findproductbycolor: async (req, res, next) => {
    try {
      const color = req.params.color;
      const result = await Product.findAll({
        where: { color },
        include: [
          SEO_Model,
          Shipping_Model,
          Dimension_Model,
          Ratings_Model,
          Discount_Model,
          video_Model,
          Image_Model,
        ],
      });

      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findproductbycategory: async (req, res, next) => {
    try {
      const category = req.params.category;
      const result = await Product.findAll({
        where: { category },
        include: [
          SEO_Model,
          Shipping_Model,
          Dimension_Model,
          Ratings_Model,
          Discount_Model,
          video_Model,
          Image_Model,
        ],
      });

      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
  UpdateProductByid: async (req, res, next) => {
    const transaction = await connection.transaction();
    let result;
    try {
      const { productId } = req.params;
      const {
        name,
        description,
        price,
        brand,
        category,
        subCategory,
        color,
        size,
        gender,
        attributes,
        features,
        availability,
        quantity,
        sold,
        tags,
        inventoryManagement,
        relatedProducts,
        customizationOptions,
        metaTitle,
        metaDescription,
        metaKeywords,
        type,
        value,
        rating,
        review,
        weight,
        restriction,
        length,
        width,
        height,
        images,
        videos,
      } = req.body;

      await Product.update(
        {
          name,
          description,
          price,
          brand,
          category,
          subCategory,
          color,
          size,
          gender,
          attributes,
          features,
          availability,
          quantity,
          sold,
          tags,
          inventoryManagement,
          relatedProducts,
          customizationOptions,
        },
        { where: { productId }, transaction }
      );
      ProductTableProductId = productId;
      await Shipping_Model.update(
        { weight, restriction },
        { where: { productId }, transaction }
      );
      await Dimension_Model.update(
        { length, width, height },
        { where: { ProductTableProductId }, transaction }
      );
      await Discount_Model.update(
        { type, value },
        { where: { productId }, transaction }
      );
      // await video_Model.update({ productId,ProductTableProductId , videos},{where:{productId},transaction})
      // await Image_Model.update({ productId,ProductTableProductId , images},{where:{productId},transaction})
      await SEO_Model.update(
        { metaTitle, metaDescription, metaKeywords },
        { where: { ProductTableProductId }, transaction }
      );
      await transaction.commit();
      results = "table is update";
      if (!results) {
        throw createError(404, "product does not exist");
      }
      res.send(results);
    } catch (error) {
      console.log(error.message);
      // await transaction.rollback();
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  DeleteProductByid: async (req, res, next) => {
    const productId = req.params.productId;
    try {
      ProductTableProductId = productId;
      await Ratings_Model.destroy({ where: { productId } });
      await Shipping_Model.destroy({ where: { ProductTableProductId } });
      await Dimension_Model.destroy({ where: { ProductTableProductId } });
      await Discount_Model.destroy({ where: { productId } });
      await video_Model.destroy({ where: { productId } });
      await Image_Model.destroy({ where: { productId } });
      await SEO_Model.destroy({ where: { ProductTableProductId } });
      await Product.destroy({ where: { productId: productId }, cascade: true });
      const results = "product deleted";
      if (!results) {
        throw createError(404, "product does not exist");
      }
      res.send(results);
    } catch (error) {
      console.log(error.message);
      // await transaction.rollback();
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
};
