<template>
    <div class="globalSetting box-shadow">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本设置" name="base">
                <div class="content">
                    <el-form v-model="form" label-width="100px">
                        <el-form-item label="网站名称:">
                            <el-input v-model="form.Title" size="small" class="input-width" placeholder="请输入网站名称" />
                        </el-form-item>
                        <el-form-item label="备案号码:">
                            <el-input v-model="form.Footer" size="small" class="input-width" placeholder="请输入备案号码" />
                        </el-form-item>
                        <el-form-item label="QQ:">
                            <el-input v-model="form.QQ" size="small" class="input-width" placeholder="请输入网站网址" />
                        </el-form-item>
                        <el-form-item label="WX:">
                            <el-input v-model="form.WX" size="small" class="input-width" placeholder="请输入网站网址" />
                        </el-form-item>
                        <el-form-item label="开启新闻:">
                            <el-switch
                                :value="form.IsNews"
                                @change="val => handleChange(val, 'IsNews')"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="开启工程案例:">
                            <el-switch
                                :value="form.IsCase"
                                @change="val => handleChange(val, 'IsCase')"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="地址栏icon:">

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
                            <el-input v-model="form.SeoKeyword" size="small" class="input-width" placeholder="请输入网站关键字" />
                        </el-form-item>
                        <el-form-item label="关键字描述:">
                            <el-input type="textarea" :rows="5" v-model="form.SeoDescription" size="small" class="input-width" placeholder="请输入关键字描述" />
                        </el-form-item>
                    </el-form>
                    <div class="btns">
                        <el-button type="primary" size="small" @click="handleSaveBase">保存</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { getBaseInfo, saveBaseInfo } from '@/api'

export default {
    name: 'PAGE_GlobalSetting',
    data: function () {
        return {
            activeName: 'base',
            form: {
                Title: '',
                Footer: '',
                SeoKeyword: '',
                SeoDescription: '',
                QQ: '',
                WX: '',
                IsCase: false,
                IsNews: false
            }
        }
    },
    created: function () {
        this.getBaseInfo()
    },
    methods: {
        /**
         * 保存基本信息
         */
        handleSaveBase: function() {
            saveBaseInfo(this.form)
                .then(res => {
                    console.log(res)
                    this.$message.success(res.data)
                })
        },
        /**
         * 获取基本信息
         */
        getBaseInfo: function () {
            getBaseInfo()
                .then(res => {
                    const { Title, Footer, SeoKeyword, SeoDescription, QQ, WX, IsNews, IsCase } = res.data
                    console.log(res)
                    this.form.Title = Title
                    this.form.Footer = Footer
                    this.form.SeoKeyword = SeoKeyword
                    this.form.SeoDescription = SeoDescription
                    this.form.QQ = QQ
                    this.form.WX = WX
                    this.form.IsNews = IsNews == 1
                    this.form.IsCase = IsCase == 1
                    console.log(this.form)
                })
                .catch(() => {})
        },
        handleChange: function (val, type) {
            this.form[type] = val
        },
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
        text-align: center;
        margin-top: 30px;
    }
    .content {
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ddd;
    }
}
</style>