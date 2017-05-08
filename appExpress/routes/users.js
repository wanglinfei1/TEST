var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data=111;
  res.render('users', {
    title: 'users',
    data:data,
    styles:[],
    scripts:[]
  });
});
module.exports = router;
