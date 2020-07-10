<template>
    <div class="container">
        <div class="head-top">
            <div class="search-container">
                <i class="el-icon-search"></i>
                <el-input style="background-color: #eceff4" size="large" v-model="searchData" placeholder="Search here"/>
            </div>
            <div class="mention" @click="mention()">
                <el-badge is-dot>
                    <i class="el-icon-bell"></i>
                </el-badge>
            </div>
            <div class="avatar">
                <el-avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591886617967&di=c0eff9a5c8b061e54962a9fc8d18486a&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F44%2F89%2F5ba31c306548e_610.jpg"></el-avatar>
            </div>
            <div class="more">
                <el-dropdown @command="handleCommand">
                    <i class="el-icon-more"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="goToProfile">个人中心</el-dropdown-item>
                        <el-dropdown-item command="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="clear-both"></div>
    </div>
</template>

<script>
    export default {
        name: "headTop",
        data(){
            return{
                searchData:'',
            }
        },
        methods:{
            mention(){

            },
            goToProfile(){
                console.log(1);
                this.$router.push({path: `/profile`});
            },
            exit(){
                this.$router.push({path: `/login`});
            },
            handleCommand(command) {
                if (command === "goToProfile") {
                    this.goToProfile();
                }else if (command === "exit") {
                    this.exit();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        width: 100%;
        height: 80px;

        .head-top {
            margin: 0;
            width: 500px;
            height: 80px;
            float: right;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            .search-container{
                width: 260px;
                background: #eceff4;
                color: #adb9d1;
                padding: 0 0 0 10px;
                font-size: 18px;
                border: #eceff4;
                border-radius: 10px;
                i{
                    display: inline;
                }
            }
        }
        .mention,.more{
            font-size: 26px;
            color: #000000;
        }
        .clear-both {
            clear: both;
        }
    }
</style>
<style>
    .head-top .el-input, .head-top .el-input__inner{
        width: 200px;
        height: 50px;
        background-color: #eceff4 !important;
        border: none;
        padding: 0 5px;
        font-size: 16px;
    }
    .el-dropdown{
        font-size: inherit;
    }
</style>
