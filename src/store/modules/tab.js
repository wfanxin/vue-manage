export default {
    namespaced: true,
    state: {
        isCollapse: false, // 菜单栏是否折叠
        tagsList: [ // 标签列表
            {
                path: '/home',
                label: '首页'
            }
        ]
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, obj) {
            const index = state.tagsList.findIndex(item => item.path === obj.path)
            if (index === -1) { // 没找到新增
                state.tagsList.push(obj)
            }
        },
        closeTag(state, obj) {
            const index = state.tagsList.findIndex(item => item.path === obj.path)
            state.tagsList.splice(index, 1)
        }
    }
}
