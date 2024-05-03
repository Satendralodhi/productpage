const express=require('express')
const router=express.Router()
const ProductController=require('../Controllers/Product.Controller')
// router.get('/',ProductController.getAllProducts)
router.post('/',ProductController.CreateProduct)
// router.get('/:id',ProductController.findproductbyid)
// router.patch('/:id',ProductController.UpdateProductByid)
// router.delete('/:id',ProductController.DeleteProductByid)

module.exports=router