<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>

export default {
  components: {
    Home: () => import('@/views/Home')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
