<template>
  <div id="app">
    <!-- <Demo1></Demo1> -->
    <Demo2></Demo2>
  </div>
</template>

<script>
import Demo1 from '@/components/Demo1.vue'
import Demo2 from '@/components/Demo2.vue'
export default {
  name: 'App',
  components: { Demo1, Demo2 }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}
</style>
