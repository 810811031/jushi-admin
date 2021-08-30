<template>
    <div class="globalSetting box-shadow">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本设置" name="base">
                <div class="content">
                    <el-form v-model="form" label-width="100px">
                        <el-form-item label="网站名称:">
                            <el-input v-model="form.Title" size="small" class="input-width" placeholder="请输入网站名称" />
                        </el-form-item>
                        <el-form-item label="底部说明:">
                            <el-input v-model="form.Footer" size="small" class="input-width" placeholder="请输入备案号码" />
                        </el-form-item>
                        <el-form-item label="ICP:">
                            <el-input v-model="form.ICP" size="small" class="input-width" placeholder="请输入网站网址" />
                        </el-form-item>
                        <el-form-item label="Icon:">
                            <div class="cover" @click="handleClickInput('Icon')" v-if="!form.Icon">
                                <i class="el-icon-plus"></i>
                            </div>
                            <div class="cover1" v-else style="background: #e8e8e8;">
                                <img :src="form.Icon.indexOf('base64') > -1 ? form.Icon : host + form.Icon" />
                                <el-button @click="handleDeleteImage('Icon')" class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                            </div>
                            <input @change="handleChangeFile('Icon')" type="file" accept="image/*" ref="Icon" style="display: none;" />
                        </el-form-item>
                        <el-form-item label="Logo(亮):">
                            <div class="cover" @click="handleClickInput('LogoLight')" v-if="!form.LogoLight">
                                <i class="el-icon-plus"></i>
                            </div>
                            <div class="cover1" v-else style="background: #e8e8e8;">
                                <img :src="form.LogoLight.indexOf('base64') > -1 ? form.LogoLight : host + form.LogoLight" />
                                <el-button @click="handleDeleteImage('LogoLight')" class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                            </div>
                            <input @change="handleChangeFile('LogoLight')" type="file" accept="image/*" ref="LogoLight" style="display: none;" />
                        </el-form-item>
                        <el-form-item label="Logo(暗):">
                            <div class="cover" @click="handleClickInput('LogoDark')" v-if="!form.LogoDark">
                                <i class="el-icon-plus"></i>
                            </div>
                            <div class="cover1" v-else style="background: #e8e8e8;">
                                <img :src="form.LogoDark.indexOf('base64') > -1 ? form.LogoDark : host + form.LogoDark" />
                                <el-button @click="handleDeleteImage('LogoDark')" class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                            </div>
                            <input @change="handleChangeFile('LogoDark')" type="file" accept="image/*" ref="LogoDark" style="display: none;" />
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
// saveBaseInfo
import { host, getBaseInfo, saveBaseInfo, getImageBase64 } from '@/api'

export default {
    name: 'PAGE_GlobalSetting',
    data: function () {
        return {
            host,
            activeName: 'base',
            form: {
                Footer: '',
                ICP: '',
                Icon: '',
                LogoDark: '',
                LogoLight: '',
                SeoDescription: "",
                SeoKeyword: "",
                Title: ""
            }
        }
    },
    created: function () {
        this.getBaseInfo()
    },
    methods: {
        /**
         * 选择上传图片
         * @param { string } name ref name
         */
        handleClickInput: function(name) {
            this.$refs[name].click()
        },
        /**
         * 删除图片
         * @param { string } name ref name
         */
        handleDeleteImage: function (name) {
            this.form[name] = ''
            this.$refs[name].value = ''
        },
        /**
         * 修改图片上传
         * @param { string } name ref name
         */
        handleChangeFile: function (name) {
            const file = this.$refs[name].files[0]
            let reader = new FileReader(), that = this
            reader.onload = function () {
                that.form[name] = reader.result
            }
            reader.readAsDataURL(file)
        },
        /**
         * 保存基本信息
         */
        handleSaveBase: async function() {
            this.form.Icon = await getImageBase64(this.form.Icon)
            this.form.LogoDark = await getImageBase64(this.form.LogoDark)
            this.form.LogoLight = await getImageBase64(this.form.LogoLight)
            saveBaseInfo(this.form)
                .then(res => {
                    this.$message.success(res.data)
                })
        },
        /**
         * 获取基本信息
         */
        getBaseInfo: function () {
            getBaseInfo()
                .then(res => {
                    console.log(res)
                    this.form = res.data
                })
                .catch(() => {})
        },
    }
}
</script>

<style lang="scss" scoped>
.globalSetting {
    width: 100%;
    .input-width {
        width: 600px;
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
        .cover {
            width: 130px;
            height: 130px;
            box-sizing: border-box;
            border: 1px dashed #ddd;
            border-radius: 4px;
            cursor: pointer;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            vertical-align: top;
        }
        .cover1 {
            position: relative;
            width: 130px;
            height: 130px;
            vertical-align: top;
            display: flex;
            justify-content: center;
            align-items: center;
            .delete {
                position: absolute;
                right: -10px;
                top: -10px;
            }
            img {
                width: auto;
                height: auto;
                max-width: 130px;
                max-height: 130px;
            }
        }
    }
}
</style>