var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let products=[{
    name:"abc",
    item:"xyz",
    rate:"123"
  },
  {
    name:"abc1",
    item:"xyz",
    rate:"123"
  },{
    name:"abc2",
    item:"xyz",
    rate:"123"
  },{
    name:"abc3",
    item:"xyz",
    rate:"123"
  }
]
  res.render('index', { products,admin:false});
});

module.exports = router;
