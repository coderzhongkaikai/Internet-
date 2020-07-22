import Vue from 'vue'
import Router from "vue-router";


//路由懒加载 --- es提出的import(推荐使用这种方式)
//const HelloWorld = （）=>import('需要加载的模块地址')
const login = () => import("../views/login/login");
const layout = () => import("../views/layout/layout");
const home = () => import("../views/home/home");
const deviceInfo = () => import("../views/device/deviceInfo/deviceInfo");
const deviceMonitor = () => import("../views/device/deviceMonitor/deviceMonitor");
const deviceHistory = () => import("../views/device/deviceHistory/deviceHistory");
const error = () => import("../views/error/404");
const profile = () => import("../views/profile/profile");
const detail=()=>import("../views/detail/detail")

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: login,
    },
    {
        path: '/home',
        icon: 'el-icon-s-home',
        title: '首页',
        redirect:'/home/index',
        component: layout,
        children: [
            {
                path: 'index',
                component: home
            }
        ]
    },    
    {
        path: '/deviceInfo',
        title: '设备管理',
        noDropMenu: true,
        component:layout,
        redirect:'/deviceInfo/index',
        children:[
            {
                path:'index',
                component: deviceInfo,
            }
        ]
    },
    {
        path: '/deviceMonitor',
        title: '设备实时工况',
        redirect:'/deviceMonitor/index',
        component:layout,
        children:[
            {
                path:'index',
                component: deviceMonitor,
            }
        ]
    },
    {
        path: '/deviceHistory',
        title: '设备实时工况',
        redirect:'/deviceHistory/index',
        component:layout,
        children:[
            {
                path:'index',
                component: deviceHistory,
            },
            {
                path:"detail",
                component:detail
            }
        ]
    },
    {
        path: '/profile',
        title: '个人中心',
        redirect:'/profile/index',
        component:layout,
        children:[
            {
                path:'index',
                component: profile,
            }
        ]
    },
    {
        path: '/404',
        component: error
    },
    {path: '*', redirect: '/404'}

];
const router=new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
});
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');

        if (token === 'null' || token === '') {
            this.$message.error("登录状态失效,请重新登录")
            next('/login');
        }
        next();
    }
});
export default router;
