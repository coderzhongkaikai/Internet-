<template>
    <div class="block">
        <span class="block_header">{{title}}</span>
        <div style="margin: 10px 0;position: relative">
            <div class="block_number" :class="computedColor">{{number}}</div>
            <span class="block_footer">{{footer}}</span>
            <img :src="src" width="150" height="80" style="position: absolute; bottom: 0;right: 0"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props:{
            number: Number,
            src: String,
            footer: String,
            title: String,
            color: String
        },
        computed:{
            computedColor(){
                return{
                    color: this.color
                }
            }
        }
    }
</script>

<style scoped>
    .block {
        background: #ffffff;
        border: #fff 1px solid;
        border-radius: 10px;
        padding: 20px;
        position: relative;
    }

    .block_header {
        font-size: 18px;
        font-weight: bold;
        font-family: 微软雅黑, sans-serif;
    }

    .block_number {
        font-size: 36px;
        /*color: #3a8ee6;*/
    }

    .block_footer {
        font-size: 6px;
    }
</style>
