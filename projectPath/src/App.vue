<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <div>
      <tab>
        <tab-item @on-item-click="aaa">aaa</tab-item>
        <tab-item @on-item-click="bbb">bbb</tab-item>
        <tab-item @on-item-click="ccc">ccc</tab-item>
      </tab>
    </div>
    <p>{{msg}}</p>
    <router-view></router-view>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import { Loading } from 'vux'
import { mapState } from 'vuex'
import { dateFormat } from 'vux'
import { numberComma, numberPad, numberRandom } from 'vux'
import { querystring } from 'vux'
import url from './url.js'
export default {
  name: 'app',
  data () {
    return {
      msg:1,
      appId:'wxe97c10d6aa10ccf7',
      wxurl:'http://wx-test.cloudh.net.cn',
      signData:JSON.parse(localStorage.getItem('signData'))
    }
  },
  components: {
    Loading,
    Tab,
    TabItem,
    dateFormat,
    numberComma,
    numberPad,
    numberRandom,
    querystring
  },
  computed: {
    ...mapState({
      isLoading: function (state){
        state.vux.isLoading
      }
    })
  },
  methods:{
    aaa () {
        this.$router.push({path:'/'})
    },
    bbb () {
        this.$router.push({path:'/HelloFromVux'})
    },
    ccc () {
        this.$router.push({path:'/Test'})
    }
  },
  mounted () {
    /*//console.log(this.$wechat)
    //console.log(dateFormat(new Date(), 'MM/YYYY/DD HH:mm:ss'))
    //console.log(numberComma(21342132.234,3))
    //console.log(numberPad(14,3))
    //console.log(numberRandom(1, 7))
    //console.log(querystring.stringify({a:'b',c:'d'}))
    //console.log(md5('WANGLINFEI'))
    //console.log(this.$http)
    //console.log(url);*/
    let _this=this;
    if(this.signData){
      var timestamp=this.signData.timestamp;
      console.log(this.signData);
    }
    let timestampNew=parseInt(new Date().getTime()/1000);
    //console.log(this.timestamp<(timestampNew-7190));
    if(!timestamp||timestamp<(timestampNew-7190)){
      this.$http.get(url.url,{
        params:{
          type:'wxsdk',
          wxurl:_this.wxurl,
          appId:_this.appId
        }
      }).then(function (data) {
         console.log(data.data);
        _this.signData=data.data;
        /*var signData={
          "jsapi_ticket":data.data.jsapi_ticket,
          "nonceStr":data.data.nonceStr,
          "signature":data.data.signature,
          "timestamp":data.data.timestamp,
          "url":data.data.url
        };*/
        localStorage.setItem('signData',JSON.stringify(data.data));
        wxqm(_this.signData);
      });
    }else{
      wxqm(this.signData);
    }

    function wxqm(wxData){
      _this.$wechat.config({
        debug:true,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: _this.appId, // 必填，公众号的唯一标识
        timestamp:wxData.timestamp , // 必填，生成签名的时间戳
        nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
        signature: wxData.signature,// 必填，签名，见附录1
        jsApiList : ["hideOptionMenu",//隐藏右上角菜单接口
                 "hideAllNonBaseMenuItem",//隐藏所有非基础按钮接口
                 "hideMenuItems",//批量隐藏功能按钮接口
                 "showMenuItems",//批量显示功能按钮接口
                 "showAllNonBaseMenuItem",//显示所有功能按钮接口
                 "onMenuShareTimeline",//分享到朋友圈
                 "onMenuShareAppMessage",//分享给朋友
                 "onMenuShareQQ",//分享到QQ
                 "onMenuShareWeibo",//分享到腾讯微博
                 "onMenuShareQZone",//分享到QQ空间
                 "closeWindow"//关闭当前网页窗口接口
                 ]
      });
    }
    _this.$wechat.ready(function(){
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          _this.$wechat.checkJsApi({
        jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
            console.log(res)
        },
        fail: function(res){
            console.log(res)
        }
      });
    });
    _this.$wechat.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res+'认证失败');
    });
    this.$http.get(url.url,{
       params:{
          'method':'get',
          'type':'self',
          'selfurl':'doctorScheduldetail/queryRecent/74/7'
       }
    }).then(function (res) {
        console.log(res.data);
    });
    this.$http.get(url.url,{
      params:{
        'method':'post',
        'type':'self',
        'selfurl':'doctor/allDoctor',
        'pageNum':1,
        'pageSize':4
      }
    }).then(function (res) {
        console.log(res.data);
    });
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
