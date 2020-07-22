import axios from 'axios';
import config from '../../config';
import {Message} from 'element-ui';
// import store from '../store';
import router from '../router';
// url = base url + request url
const server=axios.create({
    baseURL:process.env.NODE_ENV==="production"? config.build.BASE_URL:config.dev.BASE_URL,
    timeout: 5000, // request timeout
    headers: {'Content-Type':'application/json;charset=UTF-8'}
})
server.interceptors.request.use(config=>{
    console.log(config)
    // if(store.state.user.token){
    //     config.headers['X-Token']=store.state.user.token;
    // }
    return config;
},error=>{
    console.log(error);
    return Promise.reject(error);
})
server.interceptors.response.use(res => {
        if (res.data.msg!=undefined) {
            if (res.data.code == 200 ||res.data.code==1) {
                Message.success(res.data.msg);
            } else {
                Message.error(res.data.msg);
            }
        }
        if (res.data.msg==='token已失效，请重新登录'){
            this.$router.push('/home');
        }
        //token失效处理
        return res;
    },error => {
        //if (error.response){
        // eslint-disable-next-line no-debugger
        //ajax请求根本就没有发出，所以status为0
        switch (error.request.status) {
            case 400:
                error.message = '请求错误(400)';
                break;
            case 401: {
                localStorage.removeItem('Authorization');
                this.$router.push('/login');
                error.message = '未授权，请重新登录(401)';
                break;
            }
            case 403:
                error.message = '拒绝访问(403)';
                break;
            case 404:
                error.message = '请求出错(404)';
                break;
            case 408:
                error.message = '请求超时(408)';
                break;
            case 500:
                error.message = '服务器错误(500)';
                break;
            case 501:
                error.message = '服务未实现(501)';
                break;
            case 502:
                error.message = '网络错误(502)';
                break;
            case 503:
                error.message = '服务不可用(503)';
                break;
            case 504:
                error.message = '网络超时(504)';
                break;
            case 505:
                error.message = 'HTTP版本不受支持(505)';
                break;
            default:
                error.message = `连接出错(${error.request.status})!`;
        }
        Message({
            type: 'error',
            message: error.message
        });
        //}
        return Promise.reject(error.response)
    }
);

export default server;
