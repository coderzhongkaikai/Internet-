import axios from 'axios'
import router from '../router'
import Qs from 'qs'
import {
    Message,
    MessageBox
} from 'element-ui'

const service = axios.create({
    timeout: 3000 //请求超时时间
});
//请求拦截器
service.interceptors.request.use(config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
    }
    console.log(config);
    return config;
}, error => {
    Promise.error(error)
});
//响应拦截器
service.interceptors.response.use(
    res => {
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
    },
    error => {
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

export function get(url, params = {}, isShowMsg) {
    params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
    return service({
        url: url,
        method: 'get',
        headers: {},
        params
    })
}


//封装post请求
export function post(url, data) {
    //默认配置
    let sendObject = {
        url: url,
        method: 'post',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type':'application/json;charset=UTF-8'
        },
        // data: Qs.stringify(data),
        data: data
    };
    sendObject.data = JSON.stringify(data);
    return service(sendObject)
}

//封装put方法 (resfulAPI常用)
export function put(url,data = {}){
    let sendObject = {
        url: url,
        method: 'put',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type':'application/json;charset=UTF-8'
        },
        // data: Qs.stringify(data),
        data: data
    };
    sendObject.data = JSON.stringify(data);
    return service(sendObject)
}
//删除方法(resfulAPI常用)
export function deletes(url){
    return service({
        url: url,
        method: 'delete',
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        }
    })
}

//不要忘记export
export {
    service
}
