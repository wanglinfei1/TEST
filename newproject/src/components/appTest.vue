<template>
  <div id="app">
    <router-view></router-view>
    <add></add>
    <img v-bind:src='img1.src' @click="change">
    <p>{{val}}</p>
    <nav-bar v-on:increment="incrementTotal" ></nav-bar>
    <hello :msg="count"></hello>
  </div>
</template>

<script>
import Vue from 'vue'
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
import hello from '../components/Hello'
import navBar from '../components/navbar'
import add from '../components/add'
import { Toast } from 'mint-ui';
export default {
  name: 'app',
  data () {
    return {
      image: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=785836180,2092875087&fm=58',
      img1: {src: require('../img/logo.png')},
      img2: {src: require('../img/cancelPop.png')},
      img: 'cancelPop.png',
      count: '0',
      val:'0',
      a:1
    }
  },
  components: {hello, navBar, add},
  computed: {
    aDouble: function () {
      return this.a * 2
    },
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  },
  methods: {
    change () {
      this.count++
      Toast({
        message: this.count,
        position: 'top',
        duration: 500
      });
      if(this.count%2==1){
          this.img1.src= require('../img/logo.png');
      }else{
        this.img1.src= require('../img/cancelPop.png');
      }
      Vue.nextTick(function () {
         console.log('dom更新');
      })
    },
    incrementTotal(val) {
      this.val = val;
    }
  },
  created (){
     if(this.val==1){
        this.img1.src= require('../img/logo.png');
     }else{
        this.img1.src= require('../img/cancelPop.png');
     }
  },
  mounted () {
    this.aPlus=3
    //alert(this.a);
  }
}

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
