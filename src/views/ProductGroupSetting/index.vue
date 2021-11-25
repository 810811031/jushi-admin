<template>
    <div class="ProductGroupSetting">
        <div class="btns normal">
            <el-button type="primary" size="small" @click="dialog.show = true">添加产品分类</el-button>
        </div>

        <div class="content">
            <el-table border :data="table.data" row-key="ID"
                :tree-props="{ children: 'Children', hasChildren: 'Level'}"
                >
                <el-table-column
                    prop="ID"
                    label="产品分类ID"
                    align="center"
                    width="80"
                    ></el-table-column>
                <el-table-column
                    prop="ParentID"
                    label="产品父级类目ID"
                    width="80"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    prop="Name"
                    label="产品分类名称"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    label="Seo关键字"
                    align="center"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.SeoKeyword == '' ? '无' : scope.row.SeoKeyword }}
                        </template>
                    </el-table-column>
                <el-table-column
                    label="Seo关键字描述"
                    align="center"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.SeoDescription == '' ? '无' : scope.row.SeoDescription }}
                        </template>
                    </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="280"
                    >
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="warning" size="small" @click="handleConfigSeo(scope.row)">配置seo</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope.row)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            title="类目"
            :visible.sync="dialog.show"
            :modal="false"
            width="30%">
            <el-form :model="dialog.form" label-width="80px">
                <el-form-item label="产品分类">
                    <div style="height: 8px"></div>
                    <el-tree :data="tree" :default-checked-keys="currentNodeKey"
                        highlight-current
                        :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-form-item>
                <el-form-item label="类目名称">
                    <el-input size="small" placeholder="请填写产品分类名称" v-model="dialog.form.Name" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleCancel">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSendRequest">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="Seo配置"
            :visible.sync="dialogSeo.show"
            :modal="false"
            width="30%">
            <el-form :model="dialogSeo.form" label-width="100px">
                <el-form-item label="关键字">
                    <el-input size="small" placeholder="关键字" v-model="dialogSeo.form.SeoKeyword" />
                </el-form-item>
                <el-form-item label="关键字描述">
                    <el-input size="small" placeholder="关键字描述" v-model="dialogSeo.form.SeoDescription" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleCancel">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSendSeoRequest">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { 
    getProductGroup, 
    createProductGroup, 
    updateProductGroup, 
    deleteProductGroup,
    changeProductGroupConfig 
} from '@/api'

export default {
    name: 'PAGE_ProductGroupSetting',
    data: function () {
        return {
            dialog: {
                show: false,
                form: {
                    Name: '',
                    ParentID: 0,
                    ID: 0,
                }
            },
            dialogSeo: {
                show: false,
                form: {
                    ID: 0,
                    SeoKeyword: '',
                    SeoDescription: '',
                }
            },
            table: {
                data: []
            },
            tree: [
                {
                    Name: '一级分类',
                    ID: 0
                }
            ],
            currentNodeKey: [0],
            defaultProps: {
                children: 'Children',
                label: 'Name'
            }
        }
    },
    created: function () {
        this.getTableData()
    },
    methods: {
        /**
         * 点击配置 seo
         * @param {*} row
         */
        handleConfigSeo: function(row) {
            this.dialogSeo.show = true
            this.dialogSeo.form = {
                SeoKeyword: row.SeoKeyword,
                SeoDescription: row.SeoDescription,
                ID: row.ID
            }
        },
        /**
         * 编辑
         * @param {*} row
         */
        handleEdit: function (row) {
            this.dialog.show = true
            this.dialog.form = {
                Name: row.Name,
                ParentID: row.ParentID,
                ID: row.ID
            }
        },
        /**
         * 删除产品分类
         * @param {*} row
         */
        handleDelete: function (row) {
            this.$confirm('确定要删除此条类目吗？','提示', {
                confirmButtonText: '确认删除',
                type: 'error'
            })
            .then(() => {
                deleteProductGroup(row.ID)
                    .then(res => {
                        if (res.data) {
                            this.$message.success(res.data)
                            this.getTableData()
                        } else {
                            this.$message.error(res.errMsg)
                        }
                    })
            })
            .catch(() => {})
        },
        /**
         * 取消创建
         */
        handleCancel: function () {
            this.dialog.show = false
            this.dialogSeo.show = false
        },
        /**
         * 发送 seo 配置请求
         */
        handleSendSeoRequest: function () {
            changeProductGroupConfig(this.dialogSeo.form.ID, this.dialogSeo.form)
                .then(res => {
                    this.$message.success(res.data)
                    this.dialogSeo.show = false
                    this.dialogSeo.form = {
                        Name: '',
                        ParentID: 0,
                        ID: 0
                    }
                    this.getTableData(function () {
                        window.location.reload()
                    })
                })
        },
        /**
         * 发送请求到服务器
         */
        handleSendRequest: function () {
            if (this.dialog.form.Name == '') return this.$message.error('请填写类目名称')
            if (this.dialog.form.ID) {
                updateProductGroup(this.dialog.form.ID, this.dialog.form)
                    .then(res => {
                        if (res.errMsg) {
                            this.$message.error(res.errMsg)
                        } else {
                            this.$message.success(res.data)
                        }
                        this.dialog.show = false
                        this.dialog.form = {
                            Name: '',
                            ParentID: 0,
                            ID: 0
                        }
                        this.getTableData(function () {
                            window.location.reload()
                        })
                    })
            } else {
                createProductGroup(this.dialog.form)
                    .then(res => {
                        this.$message.success(res.data)
                        this.dialog.show = false
                        this.dialog.form = {
                            Name: '',
                            ParentID: 0
                        }
                        this.getTableData(function () {
                            window.location.reload()
                        })
                    })
            }
        },
        /**
         * 选择树的结点
         */
        handleNodeClick: function (val) {
            this.dialog.form.ParentID = val.ID
        },
        /**
         * 获取列表数据
         */
        getTableData: function (fn) {
            getProductGroup()
                .then(res => {
                    res.data.forEach(item => {
                        item.show = false
                        item.hasChildren = item.Children.length !== 0
                    })
                    this.table.data = res.data
                    this.tree[0].Children = res.data
                    fn && fn()
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.ProductGroupSetting {
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