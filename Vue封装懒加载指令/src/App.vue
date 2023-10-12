<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <LazyLoadDemo></LazyLoadDemo>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LazyLoadDemo from './components/LazyLoadDemo.vue';
export default {
  name: 'App',
  components: {
    HelloWorld,LazyLoadDemo
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
