<template>
    <div class="tabs">
        <el-tag
            v-for="(tag, index) in tags"
            :key="tag.path"
            :closable="tag.path !== '/home'"
            :effect="$route.path === tag.path ? 'dark' : 'plain'"
            size="small"
            @click="changeMenu(tag)"
            @close="handleClose(tag, index)"
        >
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'CommonTag',
    computed: {
        ...mapState({
            tags: state => state.tab.tagsList
        })
    },
    methods: {
        ...mapMutations('tab', ['closeTag']),
        changeMenu(item) {
            this.$router.push({
                path: item.path
            })
        },
        handleClose(item, index) {
            const length = this.tags.length - 1
            this.closeTag(item)
            if (item.path !== this.$route.path) { // 关闭的不是活动标签
                return;
            }
            if (index === length) {
                this.$router.push({
                    path: this.tags[index - 1].path
                })
            } else {
                this.$router.push({
                    path: this.tags[index].path
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .tabs{
        background: skyblue;
        padding: 10px 20px;
        .el-tag{
            margin-right: 10px;
            cursor: pointer;
        }
    }
</style>>