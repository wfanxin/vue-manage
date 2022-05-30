<template>
    <div class="manage">
        <el-dialog
            :title="operateType === 'add' ? '新增用户' : '更新用户'"
            :visible.sync="isShow"
        >
            <common-form
                :formLabel="operateFormLabel"
                :form="operateForm"
                :inline="true"
                ref="form"
            >
            </common-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </el-dialog>

        <div class="manage-header">
            <div>
                <el-button type="primary" @click="addUser">+ 新增</el-button>
            </div>
            
            <common-form
                :formLabel="formLabel"
                :form="searchForm"
                :inline="true"
                ref="searchForm"
            >
                <el-button type="primary" @click="getList">搜索</el-button>
            </common-form>  
        </div>
        <common-table
            :tableData="tableData"
            :tableLabel="tableLabel"
            :config="config"
            @changePage="changePage"
            @edit="editUser"
            @del="delUser"
        >
        </common-table>
    </div>
</template>

<script>
    import CommonForm from '../../components/CommonForm.vue'
    import CommonTable from '../../components/CommonTable.vue'
    import { getList } from '../../api/data'
    export default {
        name: 'User',
        components: {
            CommonForm,
            CommonTable
        },
        data() {
            return {
                operateType: 'add',
                isShow: false,
                operateFormLabel: [
                    {
                        model: 'name',
                        label: '姓名',
                        type: 'input'
                    },
                    {
                        model: 'sex',
                        label: '性别',
                        type: 'select',
                        opts: [
                            {
                                label: '男',
                                value: 1
                            },
                            {
                                label: '女',
                                value: 0
                            }
                        ]
                    },
                    {
                        model: 'age',
                        label: '年龄',
                        type: 'input'
                    },
                    {
                        model: 'birth',
                        label: '出生日期',
                        type: 'date'
                    },
                    {
                        model: 'address',
                        label: '地址',
                        type: 'input'
                    }
                ],
                operateForm: {},
                formLabel: [
                    {
                        model: 'keyword',
                        label: '',
                        type: 'input'
                    }
                ],
                searchForm: {
                    last_keyword: '',
                    keyword: ''
                },
                tableData: [],
                tableLabel: [
                    {
                        prop: 'name',
                        label: '姓名'
                    },
                    {
                        prop: 'age',
                        label: '年龄'
                    },
                    {
                        prop: 'sexLabel',
                        label: '性别'
                    },
                    {
                        prop: 'birth',
                        label: '出生日期',
                        width: 200
                    },
                    {
                        prop: 'address',
                        label: '地址',
                        width: 320
                    }
                ],
                config: {
                    loading: false,
                    page: 1,
                    total: 30
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            initOperateForm() {
                this.operateForm = {
                    name: '',
                    age: '',
                    sex: '',
                    birth: '',
                    address: ''
                }
            },
            addUser() {
                this.operateType = 'add'
                this.isShow = true
                this.initOperateForm()
            },
            confirm() {
                if (this.operateType === 'edit') {
                    this.$http.post('/user/edit', this.operateForm).then(res => {
                        this.isShow = false
                        this.getList()
                    })
                } else {
                    this.$http.post('/user/add', this.operateForm).then(res => {
                        this.isShow = false
                        this.getList()
                    })
                }
            },
            getList() {
                this.config.loading = true
                if (this.searchForm.keyword !== this.searchForm.last_keyword) { // 重新搜索
                    this.config.page = 1
                    this.searchForm.last_keyword = this.searchForm.keyword
                }
                getList({
                    page: this.config.page,
                    name: this.searchForm.keyword
                }).then(res => {
                    this.tableData = res.data.list.map(item => {
                        item.sexLabel = item.sex === 0 ? '女' : '男'
                        return item
                    })
                    this.config.total = res.data.count
                    this.config.loading = false
                })
            },
            changePage(page) {
                this.config.page = page
                this.getList()
            },
            editUser(row) {
                this.operateType = 'edit'
                this.isShow = true
                this.operateForm = row
            },
            delUser(row) {
                this.$confirm('此操作将删除该用户，是否继续？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const id = row.id
                    this.$http.post('/user/del', {
                        id
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getList()
                    })
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .manage{
        height: 100%;
    }
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
</style>
