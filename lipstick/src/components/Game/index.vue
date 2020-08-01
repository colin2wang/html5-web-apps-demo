<template>
    <canvas 
        class="game" ref="game"
        v-bind:width="width" 
        v-bind:height="height"
    />
</template>
<script>
import Main from './Main'

export default {
    name: 'Game',
    data: function() {
        if (window.navigator.userAgent.search(/iPhone|Android/) !== -1) {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        return {
            width: 375,
            height: 667
        }
    },
    mounted() {
        new Main(this.$refs.game)
    }
}
</script>
<style >
    .game{
        background: #fff;
    }
</style>
