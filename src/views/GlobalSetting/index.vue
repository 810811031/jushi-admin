<template>
    <div class="globalSetting box-shadow">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本设置" name="base">
                <div class="content">
                    <el-form v-model="form" label-width="100px">
                        <el-form-item label="网站名称:">
                            <el-input v-model="form.name" size="small" class="input-width" placeholder="请输入网站名称" />
                        </el-form-item>
                        <el-form-item label="网站网址:">
                            <el-input v-model="form.link" size="small" class="input-width" placeholder="请输入网站网址" />
                        </el-form-item>
                        <el-form-item label="备案号码:">
                            <el-input v-model="form.no" size="small" class="input-width" placeholder="请输入备案号码" />
                        </el-form-item>
                        <el-form-item label="底部版权描述:">
                            <el-input v-model="form.description" size="small" class="input-width" placeholder="请输入底部版权描述" />
                        </el-form-item>
                        <el-form-item label="地址栏icon:">

                        </el-form-item>
                        <el-form-item label="logo(深色):">

                        </el-form-item>
                        <el-form-item label="iogo(浅色):">

                        </el-form-item>
                    </el-form>
                    <div class="btns">
                        <el-button type="primary" size="small" @click="handleSaveBase">保存</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关键字设置" name="keyword">
                <div class="content">
                    <el-form v-model="form" label-width="100px">
                        <el-form-item label="网站关键字:">
                            <el-input v-model="form.keyword" size="small" class="input-width" placeholder="请输入网站关键字" />
                        </el-form-item>
                        <el-form-item label="关键字描述:">
                            <el-input type="textarea" :rows="5" v-model="form.keywordDescript" size="small" class="input-width" placeholder="请输入关键字描述" />
                        </el-form-item>
                    </el-form>
                    <div class="btns">
                        <el-button type="primary" size="small" @click="handleSaveKeyword">保存</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'PAGE_GlobalSetting',
    data: function () {
        return {
            activeName: 'base',
            form: {
                name: '',
                link: '',
                no: '',
                description: '',
                keyword: '',
                keywordDescript: ''
            }
        }
    },
    methods: {
        /**
         * 保存基本信息
         */
        handleSaveBase: function() {

        },
        /**
         * 保存关键字
         */
        handleSaveKeyword: function () {

        }
    }
}
</script>

<style lang="scss" scoped>
.globalSetting {
    width: 100%;
    .input-width {
        width: 400px;
    }
    .btns {
        width: 500px;
        text-align: center;
        margin-top: 30px;
    }
}
</style>