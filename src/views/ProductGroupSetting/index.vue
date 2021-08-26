<template>
    <div class="ProductGroupSetting">
        <div class="btns normal">
            <el-button type="primary" size="small" @click="dialog.show = true">添加产品类目</el-button>
        </div>

        <div class="content">
            <el-table border :data="table.data">
                <el-table-column
                    prop="ID"
                    label="产品类目ID"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    prop="ParentID"
                    label="产品父级类目ID"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    prop="Name"
                    label="产品类目名称"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    prop="SeoKeyword"
                    label="Seo关键字"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    prop="SeoDescription"
                    label="Seo关键字描述"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <el-button type="warning" size="small" @click="handleConfigSeo(scope.row)">配置seo</el-button>
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
                <el-form-item label="父级菜单">
                    <div style="height: 8px"></div>
                    <el-tree :data="tree" accordion :default-checked-keys="currentNodeKey"
                        highlight-current
                        :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-form-item>
                <el-form-item label="类目名称">
                    <el-input size="small" placeholder="请填写产品类目名称" v-model="dialog.form.Name" />
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
import { getProductGroup, createProductGroup } from '@/api'

export default {
    name: 'PAGE_ProductGroupSetting',
    data: function () {
        return {
            dialog: {
                show: false,
                form: {
                    Name: '',
                    ParentID: 0
                }
            },
            table: {
                data: []
            },
            tree: [
                {
                    label: '顶级类目',
                    value: 0,
                    id: 0
                }
            ],
            currentNodeKey: [0],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created: function () {
        this.getTableData()
    },
    methods: {
        /**
         * 点击配置 seo
         */
        handleConfigSeo: function() {

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
            if (this.dialog.form.Name == '') return this.$message.error('请填写类目名称')
            createProductGroup(this.dialog.form)
                .then(res => {
                    this.$message.success(res.data)
                    this.dialog.show = false
                    this.dialog.form = {
                        Name: '',
                        ParentID: 0
                    }
                    this.getTableData()
                })
        },
        /**
         * 选择树的结点
         */
        handleNodeClick: function (val) {
            this.dialog.form.ParentID = val.value
        },
        /**
         * 创建和更新产品类目
         */
        createProductGroup: function () {
            
        },
        /**
         * 删除类目
         * @param {*} id 
         */
        deleteProductGroup: function (id) {
            console.log(id)
            this.$confirm('确定删除此条信息吗?', '提示', {
                confirmButtonText: '确认删除',
                type: 'error'
            })
            .then(() => {

            })
            .catch(() => {})
        },
        /**
         * 获取列表数据
         */
        getTableData: function () {
            getProductGroup()
                .then(res => {
                    this.table.data = res.data
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