//table created by default
const Product=require('../model/Productmodel')
const SEO_Model=require('../model/SeoModel')
const Dimension_Model=require('../model/DimensionModel')
const Ratings_Model=require('../model/RatingModle')
const Discount_Model=require('../model/DiscountModel')
const Shipping_Model=require('../model/ShipingModel')
const video_Model=require('../model/VideoModel')
const Image_Model=require('../model/ImageModel')

const createError=require('http-errors')
const Product_Model = require('../model/Productmodel')

module.exports={


    getAllProducts:async(req,res,next)=>{

        try{
        // const results= await Product.find()
     
        res.send("data not found")
        }
        catch(error){
            console.log(error.message)
        }
        },




    CreateProduct:  async(req,res,next)=>{
        try{
            let result;
            // const product=await Product_Model.create({
            //     productId:req.body.productId,
            //     name:req.body.name,
            //     description:req.body.description,
            //     price:req.body.price,
            //     brand:req.body.brand,
            //     category:req.body.category,
            //     subCategory:req.body.subCategory,
            //     color:req.body.color,
            //     size:req.body.size, 
            //     gender:req.body.gender,
            //     attributes:req.body.attributes,
            //     features : req.body.features,
            //     availability : req.body.availability,
            //     quantity : req.body.quantity,
            //     sold : req.body.sold,
            //     tags : req.body.tags,
            //     inventoryManagement : req.body.inventoryManagement,
            //     relatedProducts : req.body.relatedProducts,
            //     customizationOptions : req.body.customizationOptions
            // })
            if(req.body.price!=null){
                
                const product=await Product_Model.create({
                    productId:req.body.productId,
                    name:req.body.name,
                    description:req.body.description,
                    price:req.body.price,
                    brand:req.body.brand,
                    category:req.body.category,
                    subCategory:req.body.subCategory,
                    color:req.body.color,
                    size:req.body.size, 
                    gender:req.body.gender,
                    attributes:req.body.attributes,
                    features : req.body.features,
                    availability : req.body.availability,
                    quantity : req.body.quantity,
                    sold : req.body.sold,
                    tags : req.body.tags,
                    inventoryManagement : req.body.inventoryManagement,
                    relatedProducts : req.body.relatedProducts,
                    customizationOptions : req.body.customizationOptions
                })

                result=product
            }



            const seo= await SEO_Model.create({
                ProductTableProductId : req.body.productId,
                metaTitle : req.body.metaTitle,
                metaDescription : req.body.metaDescription,
                metaKeywords : req.body.metaKeywords
            })

            const dimentionT=await Dimension_Model.create({
                ProductTableProductId : req.body.productId,
                length : req.body.length,
                width : req.body.width,
                height : req.body.height
            })
           
            res.send(result)
        }
            catch(error){
        console.log(error.message)
        if(error.name=== 'ValidationError'){
            next(createError(422,error.message))
            return
        }
        next(error)
            }
        },



        // name,description,price,brand,category,subCategory,
        // color,size, gender,attributes,features,availability,quantity,sold,tags,inventoryManagement
        // ,relatedProducts,seoId,metaTitle,metaDescription,metaKeywords,type,validate,value,rating,review
        // ,weight,restriction,length,width,height,images,videos



//     findproductbyid:async(req,res,next)=>{
//         try{
//             const id=req.params.id
//     const product=await Product.findById(id)
//     // const results=await Product.findOne({ _id:id })
//     if(!product){
//         throw createError(404,'product does not exist')
//     }
//     res.send(product)
//         }
//         catch(error){
//             console.log(error.message)
//            if(error instanceof mongoose.CastError){
//             next(createError(400,'ivallide product id'))
//             return;
//            }
//            next(error)
//         }
//     },
//     UpdateProductByid:  async(req,res,next)=>{
   
//         try{
//             const id=req.params.id
//     const updates=req.body
//     const options={new:true}
//     const results=await Product.findByIdAndUpdate(id,updates,options)
//     if(!results){
//         throw createError(404,'product does not exist')
//     }
//     res.send(results)
//         }
//         catch(error){
//             console.log(error.message)
//             if(error instanceof mongoose.CastError){
//                 return next(createError(400,'invalide product id format'))
//             }
//         }
//     },





//     DeleteProductByid:  async(req,res,next)=>{
//     const id=req.params.id
//     try{
// const results= await Product.findByIdAndDelete(id)
// if(!results){
//     throw createError(404,'product does not exist')
// }
// res.send(results)
//     }
//     catch(error){
//         console.log(error.message)
//         if(error instanceof mongoose.CastError){
//             next(createError(400,'ivallide product id'))
//             return;
//            }
//            next(error)
//     }
// }

}




// productId,name,description,price,brand,category,subCategory,
// color,size, gender,attributes,features,availability,quantity,sold,tags,inventoryManagement
// ,relatedProducts,customizationOptions
// productId,name,description,price,brand,category,subCategory,
// color,size, gender,attributes,features,availability,validate,quantity,sold,tags,inventoryManagement
// ,relatedProducts,seoId,metaTitle,metaDescription,metaKeywords,type,validate,value,rating,review
// ShippingId,weight,restriction,length,width,height,images,videos


// productId,name,description,price,brand,category,subCategory,
// color,size, gender,attributes,features,availability,validate,quantity,sold,tags,inventoryManagement
// ,relatedProducts,seoId,metaTitle,metaDescription,metaKeywords,DiscountId,type,validate,value,ratingsId,rating,review
// ShippingId,weight,restriction,DimensionId,length,width,height,imageId,images,videoId,videos
