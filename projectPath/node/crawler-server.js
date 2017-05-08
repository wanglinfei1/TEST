'use strict'
const http = require('http');
const url = require('url');
const util = require('util');
const superagent = require('superagent');
const cheerio = require('cheerio');
const sign = require('./sign.js');
const reqUrl=require('./reqUrl.js');
let num=0;
const onRequest = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
    let type = encodeURI(url.parse(req.url, true).query.type);
    if (type=='wxsdk') {
        let wxurl = encodeURI(url.parse(req.url, true).query.wxurl);
        let appId = encodeURI(url.parse(req.url, true).query.appId);
        let resultArr = [];
        //获取access_token
        //console.log(reqUrl.secret);
        superagent.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appId+'&secret='+reqUrl.secret).end((err, response) => {
          num++;
          let $ = cheerio.load(response.text);
          let access_token=response.body.access_token;
          //console.log(new Date().getTime()/1000);
          //获取getticket
          superagent.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token+'&type=jsapi').end((err, response) => {
            let getticket=response.body.ticket;
            //获取签名
            let wxsign=sign(getticket,wxurl);
            console.log('刷新签名'+num+'……');
            //返回签名
            wxsign.access_token=access_token;
            res.write(JSON.stringify(wxsign));
            res.end()
          })
        })
    }else if(type=='self'){
      let URLQuery=url.parse(req.url, true).query;
      let method = URLQuery.method||'get';
      let selfSearch='';
      for(var key in URLQuery){
        if(key!='type'&&key!='selfurl'&&key!='method'){
          selfSearch+='&'+key+'='+URLQuery[key];
        }
      }
      if(method=='post'){
        superagent.post(reqUrl.url+URLQuery.selfurl+'?'+selfSearch.substr(1)).end((err, response) => {
          if(response){
            res.write(JSON.stringify(response.body));
            res.end()
          }
          if(err){
            res.write(JSON.stringify(err.body));
            res.end()
          }
        })
      }
      if(method=='get'){
        superagent.get(reqUrl.url+URLQuery.selfurl+'?'+selfSearch.substr(1)).end((err, response) => {
          //console.log(response.body)
          if(response){
            res.write(JSON.stringify(response.body));
            res.end()
          }
          if(err){
            res.write(JSON.stringify(err.body));
            res.end()
          }
        })
      }
    }else{
      //console.log(url.parse(req.url, true));
      let response={
        state: 404,
        msg: 'error',
        data:'请求失败'
      };
      res.write(JSON.stringify(response));
      res.end()
    }
}

http.createServer(onRequest).listen(process.env.PORT || 8090)
console.log('Server Start!')

