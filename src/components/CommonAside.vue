<template>
    <el-menu 
        :default-active="$route.path" 
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#ffffff"
        active-text-color="#ffd04b"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse">
        <div class="logo">{{isCollapse ? 'H' : '后台管理系统'}}</div>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.path" :index="item.path">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-'+item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="item.path+'/'+subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="item.path+'/'+subItem.path">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                menu: [{
                    path: '/home',
                    label: '首页',
                    icon: 's-home'
                }, {
                    path: '/mall',
                    label: '商品管理',
                    icon: 'video-play'
                }, {
                    path: '/user',
                    label: '用户管理',
                    icon: 'user'
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
            };
        },
        computed: {
            noChildren() {
                return this.menu.filter(item => !item.children)
            },
            hasChildren() {
                return this.menu.filter(item => item.children)
            },
            isCollapse() {
                return this.$store.state.tab.isCollapse
            }
        },
        methods: {
            // 展开
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            // 收起
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            // 点击菜单
            clickMenu(item) {
                this.$router.push({
                    path: item.path
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }

    .el-menu {
        height: 100%;
        border: none;
        h3 {
            color: #fff;
            text-align: center;
            line-height: 45px;
        }
    }

    .logo {
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
        background: #444444;
    }
</style>
