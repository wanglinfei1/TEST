/**
 * Created by wanglinfei on 2017/4/7.
 */
const express = require('express');
const request = require('request');
const bodyParser=require('body-parser');
const reqUrl=require('./reqUrl.js');
const sign = require('./sign.js');
const imgVerifyCode = require('./imgcode.js');
const requ = require('./requ.js');
const upLoad = require('./upLoad.js');
const app=express();
app.use(express.static('dist',{'index':['html/index.html','html/Y_Login.html']}));

app.use(bodyParser.urlencoded({extended:false}));
app.listen(process.env.PORT || 10001,function(){
    console.log('Server Start! listen---'+(process.env.PORT || 10001));
});
/*带base的接口路径*/
app.all('/my', function(req, res){
    console.log('11111111');
    /*签名*/
    let ret=sign(reqUrl.token,reqUrl.appid);
    let type,URLQuery;
    var method = req.method.toUpperCase();
    var reqUrlL=reqUrl.url;
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
   /* var form = new formidable.IncomingForm();
    form.uploadDir = "./dir/tmp";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        fs.renameSync(files.file.path,"./dir/tmp/"+files.file.name);
        let ret=sign(reqUrl.token,reqUrl.appid);
        upLoad(files,req,res,ret);
    });*/
    let ret=sign(reqUrl.token,reqUrl.appid);
    upLoad(req,res,ret);
});

