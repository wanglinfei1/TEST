<template>
  <div>
    <p>{{ count }}</p>
    <p>
      <button @click="increment1">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>
<style>
    body{    }
</style>
<script>
    export default {
      computed: {
        count () {
          return this.$store.state.count
        },
        doneTodos () {
          return this.$store.getters.doneTodos
        }
      },
      methods: {
        increment1 () {
          this.$store.dispatch('increment',{num:3,index:2}).then(() =>{
            console.log(1);
          })
        },
        decrement () {
          this.$store.commit('decrement',this.count-1)
        },
      },
      mounted () {

      }
    }
</script>
