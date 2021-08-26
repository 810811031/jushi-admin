<template>
    <div class="ProductGroupSetting">

    </div>
</template>

<script>
export default {
    name: 'PAGE_ProductGroupSetting',
    created: function () {
        this.getTableData()
    },
    methods: {
        /**
         * 创建和更新产品类目
         */
        createProductGroup: function () {

        },
        /**
         * 删除类目
         * @param {*} id 
         */
        deleteProductGroup: function (id) {
            console.log(id)
            this.$confirm('确定删除此条信息吗?', '提示', {
                confirmButtonText: '确认删除',
                type: 'error'
            })
            .then(() => {

            })
            .catch(() => {})
        },
        /**
         * 获取列表数据
         */
        getTableData: function () {

        }
    }
}
</script>

<style lang="scss" scoped>
.ProductGroupSetting {

}
</style>