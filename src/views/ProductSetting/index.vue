<template>
    <div class="productSetting">
        <div class="btns normal">
            <el-button type="primary" size="small" @click="dialog.show = true">添加产品</el-button>
        </div>
        <div class="content">
            <el-table :data="table.data" border>

            </el-table>
        </div>
        <el-dialog
            title="添加产品"
            :modal="false"
            :fullscreen="true"
            :visible.sync="dialog.show"
            width="620px">
            
            <span slot="footer" class="dialog-footer" style="text-align: center !important;">
                <el-button size="small" @click="handleCancel">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSendRequest">确 定</el-button>
            </span>
        </el-dialog>
        <!-- <div class="content">
            
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
        </el-dialog> -->
    </div>
</template>

<script>
import { getProducts } from '@/api'

export default {
    name: 'PAGE_ProductSetting',
    data: function () {
        return {
            activeName: 'manage',
            table: {
                data: [],
                current: 1,
                total: 0
            },
            dialog: {
                show: true,
                form: {
                    type: '',
                    type1: '',
                    type2: ''
                }
            },
            
        }
    },
    created: function () {
        this.getTableData()
    },
    methods: {
        /**
         * 发送请求至服务器
         */
        handleSendRequest: function () {

        },
        /**
         * 取消新建产品
         */
        handleCancel: function () {
            this.dialog.show = false

        },
        /**
         * 获取列表数据
         */
        getTableData: function () {
            getProducts(this.table.current)
                .then(res => {
                    console.log(res)
                    this.table.data = res.data.list
                    this.table.total = res.data.pageTotal
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.productSetting {
    width: 100%;
    box-sizing: border-box;
    .btns {
        text-align: center;
        margin-top: 30px;
        padding-top: 20px;
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