<template>
    <div class="_header_">
        <div>
            <div class="header-logo">
                <img alt="" />
            </div>
            <div class="header-title">网站云平台管理系统</div>
        </div>
        <el-dropdown @command="handleClickMeun">
            <span class="el-dropdown-link">
                admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changepassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dialog
            title="提示"
            :visible.sync="dialog.show"
            :modal="false"
            width="25%">
            <el-form v-model="form" label-width="70px">
                <el-form-item label="旧密码">
                    <el-input size="small" v-model="form.oldPassword" placeholder="请输入旧密码" />
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input size="small" v-model="form.newPassword" placeholder="请输入新密码" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialog.show = false">取 消</el-button>
                <el-button size="small" type="primary" @click="handleEditPassword" :loading="dialog.loading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { EditPassword } from '@/api'

export default {
    name: "COMPONENT_HEADER",
    data: function () {
        return {
            dialog: {
                show: false,
                loading: false
            },
            form: {
                oldPassword: '',
                newPassword: ''
            }
        }
    },
    methods: {
        /**
         * 确认修改密码并上传
         */
        handleEditPassword: function () {
            const { oldPassword, newPassword } = this.form
            if (!oldPassword) return this.$message.error('请填写旧密码')
            if (!newPassword) return this.$message.error('请填写新密码')

            this.dialog.loading = true
            const param = {
                OldPass: oldPassword,
                NewPass: newPassword
            }
            EditPassword(param)
                .then(res => {
                    this.$message.success(res.data)
                    this.dialog.loading = false
                    this.form.oldPassword = ''
                    this.form.newPassword = ''
                    this.dialog.show = false
                })
                .catch(() => {})
        },
        /**
         * 点击下拉菜单
         */
        handleClickMeun: function (val) {
            val == 'logout' && this.handleLogout()
            val == 'changepassword' && this.handleChangePassword()
        },
        /**
         * 退出登录
         */
        handleLogout: function () {
            this.$confirm('确定要退出登录吗？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'error'
            })
            .then(() => {
                sessionStorage.getItem('token') && sessionStorage.removeItem('token')
                this.$router.push('/login')
            })
            .catch(() => {})
        },
        /**
         * 点击修改密码
         */
        handleChangePassword: function () {
            this.dialog.show = true
        }
    }
}
</script>

<style lang="scss" scoped>
._header_ {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    .header-logo {
        width: 30px;
        height: 30px;
        padding: 10px 0;
        display: inline-block;
        vertical-align: top;
        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #A5CC82;
        }
    }
    .header-title {
        font-size: 16px;
        color: #333;
        line-height: 50px;
        margin-left: 20px;
        display: inline-block;
        vertical-align: top;
    }
    .el-dropdown-link {
        height: 50px;
        line-height: 50px;
        cursor: pointer;
    }
}
</style>