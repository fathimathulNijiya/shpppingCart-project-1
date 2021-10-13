var express = require('express');
var router = express.Router();

var productHelpers = require('../helpers/product-helpers')
var userHelpers = require('../helpers/user-helpers')

/* GET home page. */
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }

}
router.get('/', async function (req, res, next) {
  let user = req.session.user

  let cartCount = null
  if (req.session.user) {
    cartCount = await userHelpers.getCartCount(req.session.user._id)
  }

  productHelpers.getAllProducts().then((products) => {
    res.render('user/view-products', { products, user, cartCount });
  });
})
router.get('/login', function (req, res) {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('user/login', { "loginError": req.session.logginError })
  }
})
router.get('/signup', function (req, res) {
  res.render('user/signup')
})

router.post('/signup', function (req, res) {
  userHelpers.doSignUp(req.body).then((response) => {
    req.session.loggedIn = true
    req.session.user = response
    res.redirect('/')

    console.log(response);
  })
})

router.post('/login', function (req, res) {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.logginError = "Invalid username or password"
      res.redirect('/login')
    }
  })
})

router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})

router.get('/cart', verifyLogin, async (req, res) => {
  let products = await userHelpers.getCartProducts(req.session.user._id)
  //console.log(products)
  res.render('user/cart', { products, user: req.session.user })
})

router.get('/add-to-cart/:id',/*verifyLogin,*/(req, res) => {
  console.log(" api call")
  userHelpers.addToCart(req.params.id, req.session.user._id).then(() => {
    //res.redirect('/')
    res.json({ status: true })
  })
})

router.post('/change-product-quantity', (req, res, next) => {
 // console.log(req.body)
  userHelpers.changeProductQuantity(req.body).then((response) => {
  res.json(response)
  })
})
module.exports = router;
