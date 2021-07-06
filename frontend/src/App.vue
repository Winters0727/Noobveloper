<template>
  <div id="nav">
    <router-link class="block button is-outlined is-success" to="/">Home</router-link>
    <router-link class="block button is-outlined is-success" to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
