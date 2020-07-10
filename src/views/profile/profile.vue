<template>
    <div class="app-container">
        <el-card style="width: 70%;margin: 20px auto">
            <div slot="header" class="clearfix">
                <span>个人资料</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible=true">修改信息</el-button>
            </div>
            <div>
                <el-row>
                    <el-col :span="10" style="text-align: center">
                        <el-row>
                            <my-upload field="img"
                                       @crop-success="cropSuccess"
                                       @crop-upload-success="cropUploadSuccess"
                                       @crop-upload-fail="cropUploadFail"
                                       v-model="show"
                                       :width="300"
                                       :height="300"
                                       url="/upload"
                                       :params="params"
                                       :headers="headers"
                                       img-format="png"></my-upload>
                            <img :src="imgDataUrl" width="300" height="300">
                        </el-row>
                        <el-row>
                            <div style="font-size: 20px;margin-top: 10px">账号：admin</div>
                            <div style="font-size: 18px;margin-top: 5px">欢迎使用生肌盎然管理平台!</div>
                        </el-row>
                        <el-row>
                            <el-button @click="toggleShow" type="primary"  style="margin-top: 10px">设置头像</el-button>
                        </el-row>

                    </el-col>
                    <el-col :span="14" style="font-size: 18px">
                        <el-row>用户名：{{user.username}}</el-row><el-divider></el-divider>
                        <el-row>姓名：{{user.name}}</el-row><el-divider></el-divider>
                        <el-row>性别：{{user.gender}}</el-row><el-divider></el-divider>
<!--                        <el-row>部门：{{user.dept}}</el-row><el-divider></el-divider>-->
                        <el-row>工牌号：{{user.id}}</el-row><el-divider></el-divider>
                        <el-row>联系方式：{{user.phonenum}}</el-row><el-divider></el-divider>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-dialog @close="dialogFormVisible=false" title="个人资料" :visible="dialogFormVisible" width="30%">
            <el-form :model="user" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="user.gender"></el-input>
                </el-form-item>
                <el-form-item label="工牌号">
                    <el-input v-model="user.id"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="user.phonenum"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmChange()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import 'babel-polyfill'; // es6 shim
    import myUpload from 'vue-image-crop-upload/upload-1.vue';
    import {getUser} from "../../api/login";
    import store from "../../store/store";
    export default {
        name: 'Profile',
        components: {myUpload},
        data() {
            return {
                user:{
                    id: 0,
                    username: '',
                    name: 'xxx',
                    phonenum:'13987513544',
                    // number: '1000284133612',
                    // birth:'1999-01-06',
                    gender:'男',
                    // dept: '暂无'
                },
                show: false,
                dialogFormVisible: false,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    smail: '*_~'
                },
                imgDataUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591886617967&di=c0eff9a5c8b061e54962a9fc8d18486a&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F44%2F89%2F5ba31c306548e_610.jpg' // the datebase64 url of created image
            }
        },
        methods: {
            confirmChange(){

            },
            toggleShow() {
                this.show = !this.show;
            },
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }
        },
        created() {
            getUser(store.state.username).then(res=>{
                this.user=res.data;
                console.log(res.data);
            }).catch(err=>{
                console.log(err);
            })
        }
    }
</script>
<style>
    .el-devider{
        margin: 15px 0;
    }

</style>
© 2020 GitHub, Inc.
