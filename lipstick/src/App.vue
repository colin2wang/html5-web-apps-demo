<template>
  <div id="app">
    <Game />
    <div class="loading-content" >
      <h1 id="loading">
        Loading... <small></small>
      </h1>
    </div>
    <button v-on:click="restart" class="restart">再来一把!</button>
  </div>
</template>

<script>
import Game from './components/Game'

export default {
  name: 'App',
  components: {
    Game,
  },
  methods: {
    restart: () => {
      window.location.reload()
    }
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
  background: #000;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loading-content{
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  background: #000;
}
.restart{
  position: fixed;
  width: 240px;
  display:none;
  height: 80px;
  font-size: 30px;
  background: #fff;
  outline: none;
  cursor: pointer;
  border: none;
}
.restart:active{
  background: #eee;
}
*{
  margin: 0; padding: 0;
}
</style>
