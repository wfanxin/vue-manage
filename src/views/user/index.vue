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
            @changePage="getList"
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
                        prop: 'sex',
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
                    page: 1,
                    total: 30
                }
            }
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
                this.isShow = true
                this.operateType = 'add'
                this.initOperateForm()
            },
            confirm() {
                if (this.operateType === 'edit') {
                    this.$http.post('/user/edit', this.operateForm).then(res => {
                        this.isShow = false
                    })
                } else {
                    this.$http.post('/user/add', this.operateForm).then(res => {
                        console.log(res)
                        this.isShow = false
                    })
                }
            },
            getList() {
                
            },
            editUser() {

            },
            delUser() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
</style>
