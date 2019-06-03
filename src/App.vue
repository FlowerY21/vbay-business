<template>
    <router-view  class="root"></router-view>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    .root {
        height: 100%;
        width: 100%;
        position: relative;
        font-family: PingFang-SC-Regular, '微软雅黑Light', '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: #fff;
    }

</style>
