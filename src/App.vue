<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

    // import login from "@/views/login"
    export default {
        name: 'app',
        components: {}
    }
</script>

<style>
    #app {
        width: 100%;
        min-width: 1200px;
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: 微软雅黑,Arial,sans-serif;
    }

    #nprogress .bar {
        background: #1777db !important;
    }
</style>
