<template>
    <div class="productSetting">
        <el-tabs v-model="activeName">
            <el-tab-pane label="产品类目管理" name="manage">
                <div class="content">
                    <div class="btns normal">
                        <el-button type="primary" size="small" @click="dialog.show = true">添加分类</el-button>
                    </div>
                    <el-table :data="manageTable.data" border>
                        <el-table-column
                            prop=""
                            align="center"
                            label="产品分类名称"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="分类ID"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="类目层级"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="产品数量"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="创建时间"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="操作"
                        >
                            <template slot-scope="scope"> 
                                <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button size="small" type="info" @click="handleConfig(scope.row)">配置SEO</el-button>
                                <el-button size="small" type="delete" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer">
                        <el-pagination
                            background
                            layout="prev, pager, next, total"
                            :total="1000">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="产品列表" name="list">
                <div class="content">
                    <div class="btns normal">
                        <el-button type="primary" size="small">添加产品</el-button>
                    </div>
                    <el-table :data="ListTable.data" border>
                        <el-table-column
                            prop=""
                            align="center"
                            label="产品名称"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="产品ID"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="产品副名称"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="所属产品类型"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="产品缩略图"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="细分类型数量"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="创建时间"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="更新时间"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="排序时间"
                        ></el-table-column>
                        <el-table-column
                            prop=""
                            align="center"
                            label="操作"
                        >
                            <template slot-scope="scope"> 
                                <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button size="small" type="info" @click="handleConfig(scope.row)">配置SEO</el-button>
                                <el-button size="small" type="delete" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer">
                        <el-pagination
                            background
                            layout="prev, pager, next, total"
                            :total="1000">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-dialog
            title="添加菜单"
            :modal="false"
            :visible.sync="dialog.show"
            width="30%">
            <el-form :model="dialog.form" label-width="140px">
                <el-form-item label="类型名称：">
                    <el-input v-model="dialog.form.type" size="small" placeholder="选择类目层级"></el-input>
                </el-form-item>
                <el-form-item label="所属母分类：">
                    <el-input v-model="dialog.form.type1" size="small" placeholder="选择所属分类"></el-input>
                </el-form-item>
                <el-form-item label="子分类名称：">
                    <el-input v-model="dialog.form.type2" size="small" placeholder="输入分类名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleCancel">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'PAGE_ProductSetting',
    data: function () {
        return {
            activeName: 'manage',
            manageTable: {
                data: [],
                total: 0,
                size: 10,
                current: 1,
                loading: false
            },
            ListTable: {
                data: [],
                total: 0,
                size: 10,
                current: 1,
                loading: false
            },
            dialog: {
                show: false,
                form: {
                    type: '',
                    type1: '',
                    type2: ''
                }
            }
        }
    },
    methods: {
        /**
         * 修改单条记录
         * @param { Object } row 
         */
        handleEdit: function (row) {
            console.log(row)
        },
        /**
         * 配置 SEO 
         * @param { Object } row 
         */
        handleConfig: function (row) {
            console.log(row)
        },
        /**
         * 删除词条类目
         * @param { Object } row 
         */
        handleDelete: function (row) {
            console.log(row)
        },
        /**
         * 取消添加产品类目
         */
        handleCancel: function () {
            this.dialog.show = false
        },
        /**
         * 提交创建菜单
         */
        handleSubmit: function() {

        }
    }
}
</script>

<style lang="scss" scoped>
.productSetting {
    width: 100%;
    .btns {
        text-align: center;
        margin-top: 30px;
    }
    .normal {
        text-align: left;
        margin-top: 0;
        margin-bottom: 20px;
    }
    .content {
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        .footer {
            text-align: right;
            padding: 20px 0;
            padding-bottom: 0;
        }
    }
}
</style>