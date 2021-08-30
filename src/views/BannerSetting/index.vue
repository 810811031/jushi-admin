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
                        <img class="preview" :src="host + scope.row.Src" :alt="scope.row.Alt" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Num"
                    label="排序"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="Src"
                    label="URL"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">更新</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        <el-button size="mini" type="info" circle icon="el-icon-top"></el-button>
                        <el-button size="mini" type="info" circle icon="el-icon-bottom"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="选择图片"
            :modal="false"
            :visible.sync="dialog.show"
            width="620px">
            <div class="cover" @click="handleClickInputFile" v-if="!form.Src">
                <i class="el-icon-plus"></i>
                <p>单张图片大小：10MB 以内；尺寸：1920*1080px；格式：PNG、 JPG</p>
            </div>
            <div class="cover1" v-else>
                <el-button class="delete" @click="handleDeleteFormSrc" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                <img :src="host + form.Src" style="width: 100%; max-width: auto; max-height: auto;" />
            </div>
            <div class="row">
                <span class="label">图片Alt</span>
                <el-input class="input" size="small" placeholder="请填写图片Alt" v-model="form.Alt" />
            </div>
            <input type="file" accept="image/*" @change="handleChangeFile" ref="banner" style="display: none;" />
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleCancel">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSendRequest">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { host, getImageBase64, getBannerList, createBanner, updateBanner, deleteBanner } from '@/api'

export default {
    name: 'PAGE_BannerSetting',
    data: function () {
        return {
            host,
            table: {
                data: []
            },
            form: {
                Src: '',
                Alt: '',
                id: 0
            },
            dialog: {
                show: false
            },
        }
    },
    created: function () {
        this.getTableList()
    },
    methods: {
        /**
         * 删除 banner
         * @param { Object } row 单条数据
         */
        handleDelete: function (row) {
            this.$confirm('确定要删除此条记录吗？', '提示', {
                type: 'error',
                confirmButtonText: '确认删除'
            })
            .then(() => {
                deleteBanner(row.ID)
                    .then(() => {
                        this.$message.success('删除成功')
                        this.getTableList()
                    })
            })
            .catch(() => {})
        },
        /**
         * 取消上传
         */
        handleCancel: function () {
            this.dialog.show = false
            this.form = {
                Src: '',
                Alt: '',
                id: 0
            }
            this.$refs.banner.value = ''
        },
        /**
         * 发送请求
         */
        handleSendRequest: async function () {
            if (this.form.id) {
                this.form.Src = await getImageBase64(this.form.Src)
                updateBanner(this.form.id, this.form)
                    .then(() => {
                        this.$message.success('更新 banner 成功')
                        this.$refs.banner.value = ''
                        this.form = {
                            Src: '',
                            Alt: '',
                            id: 0
                        }
                        this.getTableList()
                        this.dialog.show = false
                    })
            } else {
                createBanner(this.form)
                    .then(() => {
                        this.$message.success('上传 banner 成功')
                        this.$refs.banner.value = ''
                        this.getTableList()
                        this.dialog.show = false
                    })
            }
        },
        /**
         * 当选择文件后
         */
        handleChangeFile: function () {
            const file =this.$refs.banner.files[0]
            const reader = new FileReader(), that = this
            reader.onload = function () {
                that.form.Src = reader.result
            }
            reader.readAsDataURL(file)
        },
        /**
         * 点击选取图片
         */
        handleClickInputFile: function () {
            this.$refs.banner.click()
        },
        /**
         * 取消图片的Src
         */
        handleDeleteFormSrc: function () {
            this.$refs.banner.value = ''
            this.form.Src = ''
        },
        /**
         * 更新 banner
         * @param {*} row
         */
        handleUpdate: function (row) {
            this.form = {
                Src: row.Src,
                Alt: row.Alt,
                id: row.ID
            }
            this.dialog.show = true
        },
        /**
         * 获取表格数据
         */
        getTableList: function () {
            getBannerList()
                .then(res => {
                    res.data.list.forEach((item, index) => {
                        item.No = index + 1
                    })
                    this.table.data = res.data.list
                })
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
        .preview {
            width: 300px !important;
            min-height: 150px;
            background-color: #e8e8e8;
            display: inline-block;
        }
    }
    .cover {
        width: 576px;
        height: 324px;
        box-sizing: border-box;
        border: 1px dashed #ddd;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
        i {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translateX(-50%);
        }
        p {
            width: 100%;
            text-align: center;
            font-size: #999;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .row {
        width: 100%;
        padding-top: 20px;
        .label {
            display: inline-block;
            width: 70px;
            font-size: 14px;
            line-height: 32px;
            text-align: center;
        }
        .input {
            width: 400px;
        }
    }
    .cover1 {
        width: 576px;
        position: relative;
        .delete {
            position: absolute;
            right: -10px;
            top: -10px;
        }
        img {
            width: 100%;
            height: auto;
            // max-width: 130px;
            // max-height: 130px;
        }
    }
}
</style>