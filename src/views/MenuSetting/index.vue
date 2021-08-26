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
                    prop="text"
                    label="菜单名称（中文）"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="text1"
                    label="菜单名称（英文）"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="index"
                    label="菜单顺序"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="6"
                    label="操作"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        <el-button size="mini" type="info" circle icon="el-icon-top"></el-button>
                        <el-button size="mini" type="info" circle icon="el-icon-bottom"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="line"></div>
            <el-form :model="form" label-width="150px">
                <el-form-item label="关于我们：">
                    <el-input type="textarea" :rows="7" 
                        v-model="form.aboutUs" size="small"
                        maxlength="500" show-word-limit 
                        placeholder="请输入介绍"
                        style="width: 500px"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input size="small" v-model="form.phone" style="width: 300px" placeholder="请输入联系电话" />
                </el-form-item>
                <el-form-item label="天猫商城地址：">
                    <el-input size="small" v-model="form.tianmao" style="width: 300px" placeholder="请输入URL地址" />
                </el-form-item>
                <el-form-item label="举视商城地址：">
                    <el-input size="small" v-model="form.jushi" style="width: 300px" placeholder="请输入URL地址" />
                </el-form-item>
                <el-form-item label="合作伙伴logo：">

                </el-form-item>
            </el-form>
            <div class="footer">
                <el-button type="primary" size="small">保存</el-button>
            </div>
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
                <el-button size="small" type="danger" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { getMenuList, createMenu, updateMenu, deleteMenu } from '@/api'

export default {
    name: 'PAGE_MenuSetting',
    data: function () {
        return {
            table: {
                data: [
                    {
                        text: '首页',
                        text1: 'Home',
                        index: 1,
                        status: '默认菜单',
                        No: 1
                    },
                    {
                        text: '产品中心',
                        text1: 'Product list',
                        index: 2,
                        status: '默认菜单',
                        No: 2
                    },
                    {
                        text: '解决方案与应用',
                        text1: 'Equipment customization',
                        index: 3,
                        status: '默认菜单',
                        No: 3
                    }
                ],
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
         * 点击修改
         * @param { Object } row 单列数据
         */
        handleEdit: function (row) {
            console.log(row)
        },
        /**
         * 点击删除
         * @param { Object } row 单列数据
         */
        handleDelete: function (row) {
            console.log(row)
            this.$confirm('是否删除此菜单？', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'error'
            })
            .then(() => {
                deleteMenu(row.ID)
                    .then(res => {
                        console.log(res)
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
                if (this.dialog.form[key] == '') result = true
            })
            if (result) return this.$message.error('请填写完整后提交')
            if (this.dialog.form.ID) {
                updateMenu(this.dialog.form.ID, this.dialog.form)
                    .then(res => {
                        console.log(res)
                        this.dialog.form = {
                            Title: '',
                            TitleEn: '',
                            Desc: '',
                            Txt: '',
                            ID: 0
                        }
                        this.dialog.form.show = false
                        this.getTableData()
                    })
            } else {
                createMenu(this.dialog.form)
                    .then(res => {
                        console.log(res)
                        this.dialog.form = {
                            Title: '',
                            TitleEn: '',
                            Desc: '',
                            Txt: '',
                            ID: 0
                        }
                        this.dialog.form.show = false
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
                    console.log(res)
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