<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import FlashyGrid from "./components/flashy-grid/FlashyGrid.vue";

export default {
  name: "app",
  components: {
    FlashyGrid
  }
};
</script>

<style>
html {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
