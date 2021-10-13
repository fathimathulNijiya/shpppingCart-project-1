var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {

productHelpers.getAllProducts().then((products)=>{
  res.render('admin/view-products',{products,admin:true});
});
})
router.get('/addproducts',function(req,res,){
  res.render('admin/addproducts')
})
router.post('/addproducts',function(req,res){

  productHelpers.addproduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err)
      res.render('admin/addproducts')
      else
      console.log(err);
        })
  })
})
router.get('/delete-product/:id',function(req,res,){
  let proId=req.params.id
  console.log(proId);
  productHelpers.productDelete(proId).then((response)=>{
    res.redirect('/admin/')
  })
 
 // console.log(req.body)
 // console.log(req.files.Image)
}) 
router.get('/edit-product/:id',async function(req,res,){
  product=await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{product})

  console.log(product);
})

router.post('/edit-product/:id',function(req,res){
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
      res.redirect('/admin')
         })
  if(req.files.Image){
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg')
  }
})
module.exports = router;
