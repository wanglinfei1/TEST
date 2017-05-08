require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var opn = require('opn')
var path = require('path')
var express = require('express')
const request = require('request');
const bodyParser=require('body-parser');
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');
const reqUrl=require('../node/reqUrl.js');
const sign = require('../node/sign.js');
const imgVerifyCode = require('../node/imgcode.js');
const requ = require('../node/requ.js');
const upLoad = require('../node/upLoad.js');
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
app.use(bodyParser.urlencoded({extended:false}));
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
  console.log(req.method+'//'+new Date()+'-------'+URLQuery.pathL);
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
  console.log(req.method+'//'+new Date()+'-------'+URLQuery.pathL);
});
/*验证码图片接口*/
app.get('/imgVerifyCode/*', function(req, res){
  /*签名*/
  let ret=sign(reqUrl.token,reqUrl.appid);
  var URLQuery = req.query || req.params;
  imgVerifyCode(URLQuery,req,res,ret);
  console.log(req.method+'//'+new Date()+'-------'+req.url);
});
/*上传图片接口*/
app.post('/uploadImg', function(req, res){
  /*签名*/
  let ret=sign(reqUrl.token,reqUrl.appid);
  upLoad(req,res,ret);
});

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static img
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
app.use('/dist', express.static('dist'));
var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
