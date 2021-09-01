<template>
    <div class="menuSetting">
        <div class="btns">
            <el-button @click="dialog.show = true" type="primary" size="small">添加菜单</el-button>
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
                    prop="Title"
                    label="菜单名称（中文）"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="TitleEn"
                    label="菜单名称（英文）"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    label="菜单顺序"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <div style="cursor: pointer;" v-if="!scope.row.show" @click="handleShowInput(scope.row)">{{ scope.row.Num }}</div>
                        <el-input size="small" :ref="`input-${ scope.row.ID }`" @blur="handleChangeNum(scope.row)" v-model="scope.row.Num" v-else placeholder="请输入顺序编号" />
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    align="center"
                    >
                    <template slot-scope="scope">
                        {{ scope.row.Status == 0 ? '默认菜单' : '自定义菜单' }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="6"
                    label="操作"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            title="添加菜单"
            :modal="false"
            :visible.sync="dialog.show"
            width="30%">
            <el-form :model="dialog.form" label-width="140px">
                <el-form-item label="菜单名称（中文）：">
                    <el-input v-model="dialog.form.Title" size="small" placeholder="请填写中文名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称（英文）：">
                    <el-input v-model="dialog.form.TitleEn" size="small" placeholder="请填写英文名称"></el-input>
                </el-form-item>
                <el-form-item label="辅助说明文字：">
                    <el-input v-model="dialog.form.Desc" size="small" placeholder="请填写辅助说明文字"></el-input>
                </el-form-item>
                <el-form-item label="页面描述文字：">
                    <el-input v-model="dialog.form.Txt" size="small" placeholder="请填写页面描述文字"></el-input>
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
import { getMenuList, createMenu, updateMenu, deleteMenu, changeMenuIndex } from '@/api'

export default {
    name: 'PAGE_MenuSetting',
    data: function () {
        return {
            table: {
                data: [],
                loading: false
            },
            dialog: {
                show: false,
                form: {
                    Title: '',
                    TitleEn: '',
                    Desc: '',
                    Txt: '',
                    ID: 0
                }
            },
            form: {
                aboutUs: '',
                phone: '',
                tianmao: '',
                jushi: '',

            }
        }
    },
    created: function () {
        this.getTableData()
    },
    methods: {
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
            changeMenuIndex(row.ID, { Num: Number(row.Num) })
                .then(res => {
                    this.$message.success(res.data)
                    this.getTableData()
                })
        },
        /**
         * 点击修改
         * @param { Object } row 单列数据
         */
        handleEdit: function (row) {
            this.dialog.form = {
                Title: row.Title,
                TitleEn: row.TitleEn,
                Desc: row.Desc,
                Txt: row.Txt,
                ID: row.ID
            }
            this.dialog.show = true
        },
        /**
         * 点击删除
         * @param { Object } row 单列数据
         */
        handleDelete: function (row) {
            this.$confirm('是否删除此菜单？', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'error'
            })
            .then(() => {
                deleteMenu(row.ID)
                    .then(res => {
                        if (res.errMsg) return this.$message.error(res.errMsg)
                        this.$message.success('删除成功')
                        this.getTableData()
                    })
            })
            .catch(() => {})
        },
        /**
         * 取消弹框
         */
        handleCancel: function () {
            this.dialog.show = false
            this.dialog.form = {
                Title: '',
                TitleEn: '',
                Desc: '',
                Txt: '',
                ID: 0
            }
        },
        /**
         * 点击新建菜单
         */
        handleSubmit: function () {
            let result = false
            Object.keys(this.dialog.form).forEach(key => {
                if (typeof this.dialog.form[key] == 'string' && this.dialog.form[key] == '') {
                    result = true
                }
            })
            if (result) return this.$message.error('请填写完整后提交')
            if (this.dialog.form.ID) {
                updateMenu(this.dialog.form.ID, this.dialog.form)
                    .then(() => {
                        this.dialog.form = {
                            Title: '',
                            TitleEn: '',
                            Desc: '',
                            Txt: '',
                            ID: 0
                        }
                        this.dialog.show = false
                        this.$message.success('更新菜单成功')
                        this.getTableData()
                    })
            } else {
                createMenu(this.dialog.form)
                    .then(() => {
                        this.dialog.form = {
                            Title: '',
                            TitleEn: '',
                            Desc: '',
                            Txt: '',
                            ID: 0
                        }
                        this.dialog.show = false
                        this.$message.success('添加菜单成功')
                        this.getTableData()
                    })
            }

        },
        /**
         * 获取菜单列表
         */
        getTableData: function () {
            getMenuList()
                .then(res => {
                    res.data.forEach((item, index) => {
                        item.No = index + 1
                        item.show = false
                    })
                    this.table.data = res.data
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.menuSetting {
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
    .line {
        width: 100%;
        height: 0;
        margin: 20px 0;
        border-bottom: 1px dashed #ddd;
    }
}
</style>