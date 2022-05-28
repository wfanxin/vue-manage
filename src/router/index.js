import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout.vue'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Layout,
    redirect: '/home', // 重定向
    children: [{
        path: '/home',
        label: '首页',
        icon: 's-home',
        component: () => import('@/views/home'),
    }, {
        path: '/mall',
        label: '商品管理',
        icon: 'video-play'
    }, {
        path: '/user',
        label: '用户管理',
        icon: 'user',
        component: () => import('@/views/user'),
    }, {
        path: '/other',
        label: '其他',
        icon: 'location',
        children: [{
            path: 'page1',
            label: '页面1'
        }, {
            path: 'page2',
            label: '页面2'
        }]
    }]
}]

export const menuList = routes[0].children // 分别暴露需用变量名

export default new VueRouter({
    mode: 'history',
    routes
})
