<template>
    <div>
        <div>{{msg}}</div>
        <mt-button type="default" @click.native="default1">default</mt-button>
        <mt-button type="primary" @click.native="primary1">primary</mt-button>
        <mt-button type="danger" @click.native="danger1">danger</mt-button>
    </div>
</template>
<style>
    body{
        background-color:#fff;
    }
    .mint-search{
      height:100%;
    }
</style>
<script>
    import { Indicator } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    export default{
        data(){
          return{
              msg:'hello vue'
          }
        },
        methods:{
          default1 () {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            });
            setTimeout(function(){
              Indicator.close();
            },1000);
          },
          primary1 () {
            MessageBox({
              title: '提示',
              message: '确定执行此操作?',
              showCancelButton: true
            });
          },
          danger1 () {
             MessageBox.prompt('请输入姓名').then(({ value, action }) => {
                 alert(value)
            });
          }
        }
    }
</script>
