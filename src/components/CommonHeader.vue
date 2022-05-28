<template>
    <header>
        <div class="l-content">
            <div @click="handleMenu">
                <i v-if="isCollapse" class="el-icon-s-unfold"></i>
                <i v-else class="el-icon-s-fold"></i>
            </div>
            <span>首页</span>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="medium">
                <span>
                    <img class="user" :src="userImg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'CommonHeader',
        data() {
            return {
                userImg: require('../assets/images/user.png')
            }
        },
        computed: {
            isCollapse() {
                return this.$store.state.tab.isCollapse
            }
        },
        methods: {
            handleMenu() {
                this.$store.commit('collapseMenu')
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
        div {
            width: 60px;
            line-height: 60px;
            text-align: center;
            cursor: pointer;
            i{
                font-size: 16px;
            }
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