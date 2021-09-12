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
                    label="产品分类"
                    />
            </el-table>
        </div>
    </div>
</template>

<script>
import {
    host
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
            }
        }
    },
    methods: {
        /**
         * 创建 或 编辑产品
         */
        handleToCreate() {
            this.$router.push({ name: 'ProductSettingDetail' })
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