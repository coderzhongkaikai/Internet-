<template>
    <div id="login">
        <div class="login-container">
            <div class="loginform">
                <h1>Login to your account</h1>
                <el-form ref="form" :model="form" :hide-required-asterisk="true" :rules="rules">
                    <el-form-item prop="account">
                        <el-input v-model="form.account" placeholder="E-mail Address"/>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input v-model="form.pass" placeholder="Password"  :show-password="true" type="password"
                                  @keyup.enter.native="handleLogin(form)"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleLogin(form)" style="float: right">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {loginMock} from "../../mock/loginMock"; //这个我一直没搞懂要拿来干啥，我认为是mock的登陆请求验证，你说不是，我只能改一下mock
    import {login} from "../../api/login";//这个我猜是你服务起上的登陆API 
    import {mapMutations} from 'vuex';

    export default {
        name: "login",
        data() {
            return {
                form: {
                    account: '',
                    pass: ''
                },
                rules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    pass: [
                        {required: true, message: '请输入密码', trigger: 'blur'}, // { min: 1, max: 4, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapMutations(['changeLogin']),
            handleLogin(form) {
                  const re_Date=  loginMock(form.account, form.pass)
                  console.log(re_Date)
                if(re_Date.code==200){
                        this.$router.push('/home');
                }
                //这是你服务器上的请求
                // login(form.account, form.pass).then(res => {
                //     console.log(res.data);
                //     if (res.data.code == 1) {
                //         // this.userToken = res.data.token;
                //         // // 将用户token保存到vuex中
                //         // this.changeLogin({Authorization: this.userToken});
                //         // this.storeUser({username: this.username});
                //         this.$router.push('/home');

                //         // this.$message.success(res.data.msg);
                //     } else {
                //         console.log(res.data.code);
                //         // this.$message.error("账号或密码错误");
                //     }
                // }).catch(error => {
                //     console.log(error.status)
                // });
            }
        },
        created() {
            // this.$notify({
            //     title: '提示：',
            //     message: '密码是1234',
            //     position: 'bottom-left',
            //     duration: 0,
            // });
            // setTimeout(() => {
            //     this.$notify({
            //         title: '提示：',
            //         message: '账号是admin',
            //         position: 'bottom-left',
            //         duration: 0,
            //     });
            // }, 100);
        }
    }
</script>

<style scoped>
    #login {
        width: 100%;
        height: 100%;
        /*background: url(http://pcs4.clubstatic.lenovo.com.cn/data/attachment/forum/201710/06/165515tedzi6htxtv7a69a.jpg)*/
        background: url("../../assets/login-bg.jpg");
        background-size: cover;
    }

    .login-container {
        /*background: rgba(0,0,0,0.5);*/
        color: white;
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: flex-end;
    }

    .loginform {
        background: rgba(38, 181, 211, 0.7);
        width: 350px;
        padding: 45px;
        margin: 13% 10%;
    }

    .loginform h1 {
        font-weight: lighter;
    }
</style>
