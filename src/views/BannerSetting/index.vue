<template>
    <div class="bannerSetting">
        <div class="btns">
            <el-button @click="dialog.show = true" type="primary" size="small">添加图片</el-button>
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
                    label="Banner预览"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <img :src="scope.row.url" alt="" style="width: 400px" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="index"
                    label="排序"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="url"
                    label="URL"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        <el-button size="mini" type="info" circle icon="el-icon-top"></el-button>
                        <el-button size="mini" type="info" circle icon="el-icon-bottom"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PAGE_BannerSetting',
    data: function () {
        return {
            table: {
                data: [

                ]
            }
        }
    },
    methods: {
        /**
         * 删除 banner
         * @param { Object } row 单条数据
         */
        handleDelete: function (row) {
            console.log(row)
        }
    }
}
</script>

<style lang="scss" scoped>
.bannerSetting {
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
            text-align: center;
        }
    }
}
</style>