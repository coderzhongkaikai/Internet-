import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/index'
import store from "@/store/store";

Vue.use(ElementUI);
Vue.use(router);
//引入v-charts
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import VeMap from 'v-charts/lib/map.common'
import VeRing from 'v-charts/lib/ring.common'
import Histogram from 'v-charts/lib/histogram.common'
Vue.component(VeLine.name, VeLine);
Vue.component(VePie.name, VePie);
Vue.component(VeMap.name, VeMap);
Vue.component(VeRing.name, VeRing);
Vue.component(Histogram.name, Histogram);

// 引入echarts
import echarts from 'echarts'
import common from "../static/common";

Vue.prototype.$echarts = echarts;
Vue.prototype.common = common;

//引入页面跳转进度条效果
import NProgress from 'nprogress';
import 'nprogress/nprogress.css' //这个样式必须引入
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: true, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
});

router.beforeEach((to, from, next) => {
    // 每次切换页面时，调用进度条
    NProgress.start();

    // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
    next();
});

router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
});


require('mockjs');

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
