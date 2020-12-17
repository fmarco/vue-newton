<template>
  <div id="app">
    <Newton />
  </div>
</template>

<script>
import Newton from './components/Newton.vue'

export default {
  name: 'App',
  components: {
    Newton
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
