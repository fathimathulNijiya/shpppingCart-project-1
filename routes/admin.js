var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[{
    name:"fortuner",
    company:"toyota",
    rate:"25 Lakhs",
    image:"https://techvorm.com/wp-content/uploads/2021/01/The-new-Fortuner-scaled.jpg"
  },
  {
    name:"ecosport",
    company:"ford",
    rate:"12 Lakhs",
    image:"https://imgd.aeplcdn.com/1280x720/cw/specialVersions/4348.jpg?v=20160804043644&q=85"
  },{
    name:"polo",
    company:"volkswagen",
    rate:"10 Lakhs",
    image:"https://www.talkingtrendo.com/wp-content/uploads/2020/09/20200527092135_2020-VW-Polo-1.0-TSI-rear-static.jpg"
  },{
    name:"audi",
    company:"audi",
    rate:"80 Lakhs",
    image:"https://pictures.topspeed.com/IMG/crop/202005/audi-just-reinvigora-1_1600x0w.jpg"
  }]
  res.render('admin/view-products',{products,admin:true});
});
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
 
 // console.log(req.body)
 // console.log(req.files.Image)
}) 

module.exports = router;
