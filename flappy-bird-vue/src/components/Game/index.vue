<template>
    <canvas width="375" ref="canvas" height="667" />
</template>
<script>
import Game from './game'
export default {
    name: 'Game',
    mounted() {
        new Game(this.$refs.canvas)
    }
}
</script>