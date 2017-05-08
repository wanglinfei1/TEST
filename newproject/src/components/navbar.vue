<template>
  <div @click="change">
    <h1>{{ index }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index:0
    }
  },
  //props:['index'],
  computed: {
    index () {
      //return this.$store.state.count
    }
  },
  methods: {
    change () {
      this.index++;
      this.$emit('increment', this.index)
      if(this.index%2==1){
        this.$router.push({path:'/appTest/test1'})
      }else{
        this.$router.push({path:'/appTest/test'})
      }

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
