<template>
  <div id="app">
    <h1>Flyappy Bird <small>
      <a href="https://gitee.com/shixinglong/webApp-case/tree/master/flappy-bird-vue" target="_black" >[代码]</a>
      <a href="https://xinglong.tech/" target="_black" >[首页]</a></small></h1>
    <Game />
  </div>
</template>

<script>
import Game from './components/Game'

export default {
  name: 'App',
  components: {
    Game
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
}
*{
  margin: 0;
  padding: 0;
}
h1{
  color: #fff;
  user-select: none;
  padding-bottom: 20px;
}
h1 a{
  color: red;
}
canvas{
  cursor: pointer;
}
body{
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>
