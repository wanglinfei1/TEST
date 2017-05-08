var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*接口请求模块路径*/
var request = require('request');
var reqUrl=require('./bin/reqUrl.js');
var sign = require('./bin/sign.js');
var imgVerifyCode = require('./bin/imgcode.js');
var requ = require('./bin/requ.js');
var upLoad = require('./bin/upLoad.js');
/*路由路径*/
var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');

/*设置模板引擎*/
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*设置路由*/
app.use('/', index);
app.use('/index', index);
app.use('/users', users);
app.use('/test', test);

/*带base的接口路径*/
app.all('/my', function(req, res){
  /*签名*/
  let ret=sign(reqUrl.token,reqUrl.appid);
  let type,URLQuery;
  var method = req.method.toUpperCase();
  var reqUrlL=reqUrl.url
  if (req.method == "POST") {
    URLQuery = req.body;
    type = URLQuery.typeL||'post';
    requ(URLQuery,type,req,res,ret,reqUrlL)
  } else{
    URLQuery = req.query || req.params;
    type= URLQuery.typeL||'get';
    requ(URLQuery,type,req,res,ret,reqUrlL)
  }
});
/*不带base的接口路径*/
app.all('/myLogin', function(req, res){
  /*签名*/
  let ret=sign(reqUrl.token,reqUrl.appid);
  let type,URLQuery;
  var method = req.method.toUpperCase();
  var reqUrlL=reqUrl.urlFile;
  if (req.method == "POST") {
    URLQuery = req.body;
    type = URLQuery.typeL||'post';
    requ(URLQuery,type,req,res,ret,reqUrlL)
  } else{
    URLQuery = req.query || req.params;
    type= URLQuery.typeL||'get';
    requ(URLQuery,type,req,res,ret,reqUrlL)
  }
});
/*验证码图片接口*/
app.get('/imgVerifyCode/*', function(req, res){
  /*签名*/
  let ret=sign(reqUrl.token,reqUrl.appid);
  var URLQuery = req.query || req.params;
  imgVerifyCode(URLQuery,req,res,ret);
});
/*上传图片接口*/
app.post('/uploadImg', function(req, res){
  /*签名*/
  let ret=sign(reqUrl.token,reqUrl.appid);
  upLoad(req,res,ret);
});

/*错误处理*/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
