
const Product=require('../model/model')

const createError=require('http-errors')

module.exports={


    // getAllProducts:async(req,res,next)=>{

    //     try{
    //     const results= await Product.find()
     
    //     res.send(results)
    //     }
    //     catch(error){
    //         console.log(error.message)
    //     }
    //     },




    CreateProduct:  async(req,res,next)=>{
        try{
            const {}=new Product(req.body)
            const result=await product.save()
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

















// productId
// name
//   description
//   price
//   brand
//   category
//   subCategory
//   color
//   size
//   gender
//   images
//   videos
//   attribute
//   feature
  
//   availability
//   quantity
//   sold
//   tags
//   inventoryManagement
//   relatedProducts
//   customizationOptions

