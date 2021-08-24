<template>
    <div class="programmeSetting">
        <div class="btns">
            <el-button @click="dialog.show = true" type="primary" size="small">添加解决方案</el-button>
        </div>
        <div class="content">
            <el-table :data="table.data" border>
                <el-table-column
                    prop="No"
                    label="序号"
                    width="100"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop=""
                    label="主标题"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="index"
                    label="副标题"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="url"
                    label="排序"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="url"
                    label="创建时间"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="url"
                    label="更新时间"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
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
    </div>
</template>

<script>
export default {
    name: 'PAGE_ProgrammeSetting',
    data: function () {
        return {
            table: {
                data: [],
                current: 1,
                size: 10,
                total: 0,
                loading: false
            },
            dialog: {
                show: false
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

    }
}
</script>

<style lang="scss" scoped>
.programmeSetting {
    box-sizing: border-box;
    padding-top: 20px;
    .btns {
        margin-bottom: 20px;
    }
    .content {
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #ddd;
        .footer {
            text-align: right;
            padding-top: 20px;
        }
    }
}
</style>