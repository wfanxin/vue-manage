import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout.vue'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '/',
                redirect: '/home', // 重定向
            },
            {
                path: '/home',
                component: () => import('@/views/home'),
            },
            {
                path: '/user',
                component: () => import('@/views/user'),
            }
        ]
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})