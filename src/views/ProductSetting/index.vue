<template>
    <div class="productSetting">
        <div class="btn">
            <el-button type="primary" size="small" @click="handleToCreate">添加产品</el-button>
        </div>
        <div class="content">
            <el-table :data="table.data" v-loading="table.loading" border>
                <el-table-column
                    prop="Title"
                    align="center"
                    label="产品名称"
                    />
                <el-table-column
                    prop="SubTitle"
                    align="center"
                    label="产品别名"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="产品封面"
                >
                    <template slot-scope="scope">
                        <img :src="host + scope.row.Cover" style="max-width: 100px; max-height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="排序(点击修改)"
                    width="130"
                >
                    <template slot-scope="scope">
                        <div style="cursor: pointer;" v-if="!scope.row.show" @click="handleShowInput(scope.row)">{{ scope.row.Num }}</div>
                        <el-input size="small" :ref="`input-${ scope.row.ID }`" @blur="handleChangeNum(scope.row)" v-model="scope.row.Num" v-else placeholder="请输入顺序编号" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Model"
                    align="center"
                    label="产品型号"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    width="280"
                >
                    <template slot-scope="scope"> 
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="info" @click="handleConfig(scope.row)">配置SEO</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogSeo.show"
            :modal="false"
            width="30%">
            <el-form :model="dialogSeo.form">
                <el-form-item label="SEO关键字">
                    <el-input v-model="dialogSeo.form.SeoKeyword" size="small" style="width: 300px" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="关键字描述">
                    <el-input v-model="dialogSeo.form.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入关键字描述" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogSeo.show = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleSendSeo" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    host,
    getProducts,
    updateProductsIndex,
    deleteProducts,
    updateProductsSeo
} from '@/api'

export default {
    name: 'PAGE_ProductSetting',
    data() {
        return {
            host,
            table: {
                data: [],
                loading: false,
                current: 0,
                total: 0
            },dialogSeo: {
                show: false,
                form: {
                    SeoKeyword: '',
                    SeoDescription: '',
                    ID: ''
                }
            }
        }
    },
    created: function () {
        this.getProductList()
    },
    methods: {
        /**
         * 修改
         */
        handleEdit: function (row) {
            console.log(row)
            this.$router.push({ name: 'ProductSettingDetail', query: { id: row.ProductID } })
        },
        /**
         * 开始配置 seo
         */
        handleConfig: function(row) {
            this.dialogSeo.show = true
            const { ProductID, SeoDescription, SeoKeyword } = row
            this.dialogSeo.form = {
                ProductID, SeoDescription, SeoKeyword
            }
        },
        /**
         * 发送 seo 到服务
         */
        handleSendSeo: function () {
            updateProductsSeo(this.dialogSeo.form.ProductID, this.dialogSeo.form)
                .then(res => {
                    this.$message.success(res.data)
                    this.getProductList()
                    this.dialogSeo.show = false
                })
        },
        /**
         * 删除
         * @param {*} row
         */
        handleDelete: function (row) {
            this.$confirm('确定要删除此产品吗','提示', {
                confirmButtonText: '确认删除',
                type: 'error'
            })
            .then(() => {
                deleteProducts(row.ProductID)
                    .then(res => {
                        this.$message.success(res.data)
                        this.getProductList()
                    })
            })
            .catch(() => {})
        },
        /**
         * 改变当前菜单的顺序
         * @param {*} row
         */
        handleShowInput: function(row) {
            row.show = !row.show
            this.$nextTick(() => {
                this.$refs[`input-${ row.ID }`].focus()
            })
        },
        /**
         * 改变当前菜单的顺序
         * @param {*} row
         */
        handleChangeNum: function (row) {
            row.show = !row.show
            updateProductsIndex(row.ProductID, { Num: Number(row.Num) })
                .then(res => {
                    this.$message.success(res.data)
                    this.getProductList()
                })
        },
        /**
         * 创建 或 编辑产品
         */
        handleToCreate() {
            this.$router.push({ name: 'ProductSettingDetail' })
        },
        /**
         * 获取产品列表
         */
        getProductList() {
            getProducts(this.table.current)
                .then(res => {
                    res.data.list.forEach(item => {
                        item.show = false
                    })
                    this.table.data = res.data.list
                    this.table.total = res.data.pageTotal * 10
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.productSetting {
    width: 100%;
    .btn {
        padding-top: 20px;
        padding-bottom: 10px;
    }
    .content {
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ddd;
    }
}
</style>