<template>
<div>
  <h1>
    拳皇97 <small><a href="https://gitee.com/shixinglong/webApp-case/tree/master/boxing-king" target="_black" >[查看代码]</a></small>
  </h1>
  <canvas 
    class="game"
    ref="canvas"
    v-bind:width="width"
    v-bind:height="height"
  ></canvas>
  <p>
    我是一位前端开发者，做拳皇纯粹为了兴趣。联系方式：微信(Codingxiaoshi 备注：拳皇)
  </p>
  <p>
    拳皇97, 是一个相对大型的游戏。我将分为若干阶段完成。如果你有什么想对我说的，可以联系我
  </p>
  <p>
    按键：[a][d]
  </p>
  <ul class="logs">
    <li>下个版本：实现 快跑，跳跃和基本的4个武打动作</li>
    <li>2020-7-28：实现 <a href="/spriteGenerator" >精灵图编辑工具</a>，对角色实现基本建模：实现前后移动，静止功能</li>
  </ul>

</div>
</template>
<script>
import Game from './Game'

export default {
  name: 'Game',
  data: () => ({
    width: 1000,
    height: 300
  }),
  mounted() {
    new Game(this.$refs.canvas)
  }
}
</script>

<style scoped>
.game{
  border: 1px solid #333;
}
.logs{
  margin-top: 30px;
  text-align: left;
}
</style>
