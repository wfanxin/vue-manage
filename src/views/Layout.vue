<template>
    <el-container>
        <el-aside width="auto">
            <common-aside/>
        </el-aside>
        <el-container>
            <el-header>
                <common-header/>
            </el-header>
            <common-tag/>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import CommonAside from '../components/CommonAside.vue'
    import CommonHeader from '../components/CommonHeader.vue'
    import CommonTag from '../components/CommonTag.vue'
    export default {
        name: 'Layout',
        components: {
            CommonAside,
            CommonHeader,
            CommonTag
        }
    }
</script>

<style lang="less" scoped>
    .el-container{
        height: 100%;
    }
    .el-header{
        background-color: #333;
        padding: 0;
    }
</style>
