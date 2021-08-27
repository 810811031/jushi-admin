<template>
    <div class="ProductTypeSetting">
        <div class="btns normal">
            <el-form label-width="100px" :model="group">
                <el-form-item label="选择产品类目">
                    <el-select size="small" placeholder="请选择产品类目后查看" v-model="group.ID">
                        <el-option
                            v-for="(item, index) in group.options"
                            :key="index"
                            :label="item.Name"
                            :value="item.ID">
                            {{ item.Name }}
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button v-if="group.ID" type="primary" size="small" @click="dialog.show = true">添加产品型号</el-button>
        </div>

        <div class="content">
            <el-table :data="table.data" border>
                <el-table-column
                    prop="ID"
                    align="center"
                    label="ID"
                    ></el-table-column>
                <el-table-column
                    prop="Name"
                    align="center"
                    label="型号名称"
                    ></el-table-column>
                <el-table-column
                    prop="ParentID"
                    align="center"
                    label="父级类目"
                    ></el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>    
                    </template>    
                </el-table-column>
            </el-table> 
        </div>

        <el-dialog
            :title="group.Name"
            :visible.sync="dialog.show"
            :modal="false"
            width="30%">
            <el-form :model="dialog.form" label-width="80px">
                <el-form-item label="型号名称">
                    <el-input size="small" placeholder="请填写型号名称" v-model="dialog.form.Name" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleCancel">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSendRequest">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getProductGroup, getModels, createModels, updateModels, deleteModels } from '@/api'

export default {
    name: 'PAGE_ProductTypeSetting',
    data: function () {
        return {
            group: {
                ID: null,
                options: [],
                Name: ''
            },
            dialog: {
                show: false,
                form: {
                    CategoryID: 0,
                    Name: '',
                    ID: 0
                }
            },
            table: {
                data: [],
                current: 1
            },
            tree: [],
            defaultProps: {
                children: 'Children',
                label: 'Name'
            }
        }
    },
    watch: {
        'group.ID'(val) {
            this.table.current = 1
            this.group.Name = this.group.options.filter(item => item.ID == val)[0].Name
            this.getTableData()
        }
    },
    created: function () {
        this.getProductGroup()
    },
    methods: {
        /**
         * 编辑
         * @param {*} row
         */
        handleEdit: function (row) {
            this.dialog.form.ID = row.ID
            this.dialog.form.Name = row.Name
            this.dialog.show = true
        },
        /**
         * 删除
         * @param {*} row
         */
        handleDelete: function (row) {
            this.$confirm('确认删除此条记录吗?', '提示', {
                confirmButtonText: '确认删除',
                type: 'error'
            })
            .then(() => {
                deleteModels(row.ID)
                    .then(res => {
                        this.$message.success(res.data)
                        this.getTableData()
                    })
            })
            .catch(() => {})
        },
        /**
         * 取消创建
         */
        handleCancel: function () {
            this.dialog.show = false
        },
        /**
         * 发送请求到服务器
         */
        handleSendRequest: function () {
            if (this.dialog.form.Name == '') return this.$message.error('请填写产品型号名称')
            if (this.dialog.form.ID) {
                updateModels(this.dialog.form.ID, { Name: this.dialog.form.Name, CategoryID: this.group.ID })
                    .then(res => {
                        this.$message.success(res.data)
                        this.dialog.show = false
                        this.dialog.form = {
                            CategoryID: 0,
                            Name: '',
                            ID: 0
                        }
                        this.getTableData()
                    })
            } else {
                createModels({ Name: this.dialog.form.Name, CategoryID: this.group.ID })
                    .then(res => {
                        this.$message.success(res.data)
                        this.dialog.show = false
                        this.dialog.form = {
                            CategoryID: 0,
                            Name: '',
                            ID: 0
                        }
                        this.getTableData()
                    })
            }
        },
        /**
         * 获取列表数据
         */
        getTableData: function () {
            getModels(this.group.ID, this.table.current)
                .then(res => {
                    console.log(res)
                    this.table.data = res.data
                })
        },
        /**
         * 获取列表数据
         */
        getProductGroup: function () {
            getProductGroup()
                .then(res => {
                    let list = []
                    getRow(res.data, list)
                    function getRow(list, result) {
                        list.forEach(item => {
                            item.Children && item.Children.length !== 0 && getRow(item.Children, result)
                            result.push(item)
                        })
                    }
                    this.group.options = list
                    this.group.ID = list[0].ID
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.ProductTypeSetting {
    width: 100%;
    .btns {
        padding-top: 20px;
    }
    .content {
        margin-top: 20px;
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
    }
}
</style>