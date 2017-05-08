<template>
    <div>
        <mt-header title="multiple button">
          <router-link to="/" slot="left">
            <mt-button icon="back">back</mt-button>
            <mt-button @click="">close</mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <img v-bind:src='img' @click="changeSrc"/>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue',
                img:'http://localhost:8082/imgVerifyCode/'+new Date().getTime()
            }
        },
        methods:{
          changeSrc () {
            this.img='http://localhost:8082/imgVerifyCode/'+new Date().getTime()
          }
        }
    }
</script>
