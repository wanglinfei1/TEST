<template>
  <div class="hello">
    <h1>{{ msg }}/{{count}}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: ['msg'],
  computed: {
      count () {
        return this.$store.state.count
      }
  },
  watch:{
    msg:function (val){
      console.log(val);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
