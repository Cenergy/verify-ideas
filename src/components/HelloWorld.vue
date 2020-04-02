<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <canvas id="canvas" ref="canvas" width="800px" height="600px"></canvas>
    </div>
</template>

<script>
import start from '../common/acanvas';

export default {
    name: 'HelloWorld',
    props: {
        msg: String,
        ctx: null,
    },
    mounted() {
        window.onload = () => start();
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
