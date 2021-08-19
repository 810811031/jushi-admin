<template>
    <div class="login-wrapper">
        <div class="login-inside">
            <div class="login-logo">
                <img  alt="" />
            </div>
            <div class="login-title">
                举视新能源 - 云平台管理系统
            </div>
            <div class="login-subtitle">
                欢迎访问官网网站管理后台
            </div>
            <el-input v-model="user.username" prefix-icon="el-icon-user" placeholder="请填写用户名" style="margin-bottom: 20px" />
            <el-input v-model="user.password" prefix-icon="el-icon-unlock" placeholder="请填写密码" />
            <el-button type="primary" style="margin-top: 30px; width: 100%" @click="handleSignIn">登录</el-button>
        </div>
    </div>
</template>

<script>
import { Login } from '@/api'

export default {
    name: 'PAGE_LOGIN',
    data: function () {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        /**
         * 点击登录
         */
        handleSignIn: function () {
            if (!this.user.username) return this.$message.error('请输入用户名')
            if (!this.user.password) return this.$message.error('请输入密码')
            Login(this.user)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(315deg, #A5CC82, #00467F);
    .login-inside {
        width: 400px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 0 5px rgba(0 ,0 ,0, .3);
        box-sizing: border-box;
        padding: 40px;
        .login-logo {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background-color: #A5CC82;
            }
        }
        .login-title {
            text-align: center;
            font-size: 20px;
            line-height: 60px;
        }
        .login-subtitle {
            text-align: center;
            font-size: 14px;
            color: #999;
            line-height: 30px;
            margin-bottom: 50px;
        }
    }
}
</style>