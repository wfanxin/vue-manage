import { routes } from "@/router"
import Cookie from "js-cookie"

export default {
    namespaced: true,
    state: {
        routes,
        menuList: []
    },
    mutations: {
        setMenu(state, menu) {
            Cookie.set('menu', JSON.stringify(menu))
        },
        clearMenu(state) {
            Cookie.remove('menu')
        },
        addRoute(state, router) {
            if (Cookie.get('menu')) {
                const menu = JSON.parse(Cookie.get('menu'))
                const routes = JSON.parse(JSON.stringify(state.routes)) // 避免深度影响

                if (!menu || menu[0] !== '*') { // 不是超级管理员
                    routes[0].children = routes[0].children.filter(item => {
                        if (item.children) {
                            item.children = item.children.filter(itemChild => {
                                return menu.indexOf(itemChild.permission) > -1
                            })
                        }
                        return menu.indexOf(item.permission) > -1
                    })
                }

                state.menuList = routes[0].children
                const realMenuRoutes = []
                for (const menuItem of state.menuList) {
                    if (menuItem.children) { // 有子级
                        for (const child of menuItem.children) {
                            child.path = menuItem.path+'/'+child.path // 也会影响state.menuList
                            realMenuRoutes.push(child)
                        }
                    } else { // 无子级
                        realMenuRoutes.push(menuItem)
                    }
                }
                routes[0].children = realMenuRoutes // 替换为处理后的数据

                // 动态添加路由
                routes.forEach(routeItem => {
                    router.addRoute(routeItem)
                });
            }
        }
    }
}
