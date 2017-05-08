/**
 * Created by wanglinfei on 2017/4/10.
 */
const reqUrl=require('./reqUrl.js');
const request = require('request');
var upLoad=function (req,res,ret){
    let proxy_url=reqUrl.urlFile;
    /*设置请求后台请求头*/
    var Accept=req.headers["accept"];
    var ContentType=req.headers["content-type"];
    var connection=req.headers["connection"];
    var headers={"connection":connection,"Accept":Accept,"content-type":ContentType,"nonce":ret.nonceStr,"timestamp":ret.timestamp,"verificateCode":ret.signature};
    var options = {
        headers: headers,
        url: proxy_url+req.url,
    };
    /*请求后台*/
    try {
        var localReq = request(options);
        req.pipe(localReq);
        localReq.pipe(res);
    } catch(e) {
        console.log('\r\n', e, '\r\n', e.stack);
        try {
            res.end(e.stack);
        } catch(e) { }
    }

};
module.exports = upLoad;