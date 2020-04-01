<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <canvas id="canvas" ref="canvas" width="800px" height="600px"></canvas>
    </div>
</template>

<script>
import AniCanvas from '../common/acanvas';

export default {
    name: 'HelloWorld',
    props: {
        msg: String,
        ctx: null,
    },
    mounted() {
        window.onload = () => {
            const canvas = this.$refs.canvas;
            const can = new AniCanvas({ canvas, color: '#222' });
            can.plot();
            // can.tick();
        };
    },
    methods: {
        gameLoop() {},
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
