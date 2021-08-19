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
    </div>
</template>

<script>
export default {
    name: "COMPONENT_HEADER",
    methods: {
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

            })
            .catch(() => {})
        },
        /**
         * 点击修改密码
         */
        handleChangePassword: function () {
            this.$message.error('敬请期待')
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