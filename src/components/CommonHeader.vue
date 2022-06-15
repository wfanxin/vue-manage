<template>
    <header>
        <div class="l-content">
            <div class="menu-btn" @click="handleMenu">
                <i v-if="isCollapse" class="el-icon-s-unfold"></i>
                <i v-else class="el-icon-s-fold"></i>
            </div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="item in breadList" :key="item.path">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="medium">
                <span>
                    <img class="user" :src="userImg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'CommonHeader',
        data() {
            return {
                userImg: require('../assets/images/user.png')
            }
        },
        computed: {
            ...mapState({
                menuList: state => state.menu.menuList
            }),
            isCollapse() {
                return this.$store.state.tab.isCollapse
            },
            breadList() {
                const path = this.$route.path
                const split_path_arr = path.split('/')
                const father_path = '/' + split_path_arr[1]
                const currentMenu = this.menuList.filter(item => {
                    return item.path === father_path
                })

                let currentMenuChildren = []
                if (currentMenu.length > 0 && currentMenu[0].children) {
                    currentMenuChildren = currentMenu[0].children.filter(child => {
                        return child.path === path
                    })
                }
                
                if (currentMenu.length > 0) {
                    return [currentMenu[0], ...currentMenuChildren]
                } else {
                    return []
                }
            }
        },
        methods: {
            handleMenu() {
                this.$store.commit('tab/collapseMenu')
            },
            logout() {
                this.$store.commit('user/clearToken')
                this.$router.push({path: '/login'})
            }
        }
    }
</script>

<style lang="less" scoped>
    header{
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0;
    }
    .l-content{
        display: flex;
        align-items: center;
        color: #ffffff;
        .menu-btn {
            width: 60px;
            line-height: 60px;
            text-align: center;
            cursor: pointer;
            i{
                font-size: 16px;
            }
        }
        .el-breadcrumb ::v-deep .el-breadcrumb__inner {
            color: #ffffff !important;
            cursor: pointer;
        }
    }

    .r-content{
        padding-right: 20px;
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
        }
    }
</style>