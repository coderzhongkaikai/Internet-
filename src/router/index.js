import Vue from 'vue'
import Router from "vue-router";


//路由懒加载 --- es提出的import(推荐使用这种方式)
//const HelloWorld = （）=>import('需要加载的模块地址')
const login = () => import("../views/login/login");
const manage = () => import("../views/manage/manage");
const home = () => import("../views/home/home");
const deviceInfo = () => import("../views/device/deviceInfo/deviceInfo");
const deviceMonitor = () => import("../views/device/deviceMonitor/deviceMonitor");
const deviceHistory = () => import("../views/device/deviceHistory/deviceHistory");
const error = () => import("../views/error/404");
const profile = () => import("../views/profile/profile");


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
        component: manage,
        children: [
            {
                path: '',
                component: home,
                meta: [],
            },
            {
                path: '/deviceInfo',
                component: deviceInfo,
                name: 'deviceInfo',
                meta: ['设备管理']
            },
            {
                path: '/deviceMonitor',
                component: deviceMonitor,
                name: 'deviceMonitor',
                meta: ['设备实时工况']
            },
            {
                path: '/deviceHistory',
                component: deviceHistory,
                name: 'deviceHistory',
                meta: ['设备历史工况']
            },
            {
                path: '/profile',
                component: profile,
                name: 'profile',
                meta: ['个人中心']
            }
        ],
        // meta: ['设备管理']
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
