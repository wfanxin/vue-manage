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
        icon: 'video-play',
        component: () => import('@/views/mall'),
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
            path: 'pageOne',
            label: '页面一',
            component: () => import('@/views/other/pageOne'),
        }, {
            path: 'pageTwo',
            label: '页面二',
            component: () => import('@/views/other/pageTwo'),
        }]
    }]
}, {
    path: '/login',
    component: Login
}]

// 后台菜单
export const menuList = routes[0].children // 分别暴露需用变量名

// 后台菜单路由处理
const realMenuRoutes = [];
for (const menu of menuList) {
    if (menu.children) { // 有子级
        for (const child of menu.children) {
            child.path = menu.path+'/'+child.path // 也会影响menuList
            realMenuRoutes.push(child)
        }
    } else { // 无子级
        realMenuRoutes.push(menu)
    }
}
routes[0].children = realMenuRoutes // 替换为处理后的数据

export default new VueRouter({
    mode: 'history',
    routes
})
