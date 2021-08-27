<template>
    <div class="_nav_">
        <el-menu
            :default-active="active"
            @select="handleSelectActiceMenu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item :index="`${ i + 1 }`" v-for="(item, i) in list" :key="i">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "COMPONENT_NAV",
    data: function () {
        return {
            active: '1',
            list: [
                {
                    routeName: 'GlobalSetting',
                    label: '站点设置',
                    icon: 'el-icon-s-tools'
                },
                {
                    routeName: 'BannerSetting',
                    label: '首页banner设置',
                    icon: 'el-icon-s-platform'
                },
                {
                    routeName: 'MenuSetting',
                    label: '菜单设置',
                    icon: 'el-icon-menu'
                },
                {
                    routeName: 'ProductGroupSetting',
                    label: '产品类目管理',
                    icon: 'el-icon-collection'
                },
                {
                    routeName: 'ProductTypeSetting',
                    label: '产品型号管理',
                    icon: 'el-icon-notebook-2'
                },
                {
                    routeName: 'ProductSetting',
                    label: '产品设置',
                    icon: 'el-icon-s-order'
                },
                {
                    routeName: 'ProgrammeSetting',
                    label: '解决方案设置',
                    icon: 'el-icon-s-claim'
                },
                {
                    routeName: 'selfSetting',
                    label: '自定义页面设置',
                    icon: 'el-icon-s-operation'
                },
                {
                    routeName: 'JobSetting',
                    label: '发布招聘设置',
                    icon: 'el-icon-suitcase-1'
                },
            ]
        }
    },
    methods: {
        handleSelectActiceMenu: function (val) {
            this.active = val
            sessionStorage.setItem('currentActiveMenuIndex', val)
            const routeName = this.list[Number(this.active) - 1].routeName
            this.$router.push({ name: routeName })
        }
    },
    created: function () {
        try {
            this.active = sessionStorage.getItem('currentActiveMenuIndex')
            console.log('获取当前记录的菜单下标失败!')
        } catch(err) {
            this.active = '1'
        }
    }
}
</script>

<style lang="scss" scoped>
._nav_ {
    width: 220px;
    height: calc(100% - 50px);
    position: fixed;
    left: 0;
    top: 50px;
    z-index: 2;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
    background-color: #545c64;
}
</style>