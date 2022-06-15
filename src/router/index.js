import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout.vue'
import Login from '@/views/login'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export const routes = [{
    path: '/',
    component: Layout,
    redirect: '/home', // 重定向
    children: [{
        path: '/home',
        label: '首页',
        icon: 's-home',
        permission: 'home',
        component: () => import('@/views/home'),
    }, {
        path: '/mall',
        label: '商品管理',
        icon: 'video-play',
        permission: 'mall',
        component: () => import('@/views/mall'),
    }, {
        path: '/user',
        label: '用户管理',
        icon: 'user',
        permission: 'user',
        component: () => import('@/views/user'),
    }, {
        path: '/other',
        label: '其他',
        icon: 'location',
        permission: 'other',
        children: [{
            path: 'pageOne',
            label: '页面一',
            permission: 'other/pageOne',
            component: () => import('@/views/other/pageOne'),
        }, {
            path: 'pageTwo',
            label: '页面二',
            permission: 'other/pageTwo',
            component: () => import('@/views/other/pageTwo'),
        }]
    }]
}, {
    path: '/login',
    component: Login,
    meta: {
        requireLogin: false
    }
}]

export default new VueRouter({
    mode: 'history',
    routes
})
