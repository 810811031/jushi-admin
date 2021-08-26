<template>
    <div class="selfSetting">
        <el-tabs v-model="activeName">
            <el-tab-pane label="工程案例列表" name="prof">
                <div class="content">
                    <el-button icon="el-icon-circle-plus-outline" type="primary" size="small" @click="handleAddProf">添加工程案例</el-button>

                    <div class="table">
                        <!-- <el-table :data="table.prof.data">
                            <el-table-column
                                prop=""
                                label="序号"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                prop=""
                                label="工程案例"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                prop=""
                                label="封面"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                prop=""
                                label="创建时间"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                prop=""
                                label="更新时间"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                >
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="handleEditProf(scope.row)">编辑</el-button>
                                    <el-button type="info" size="small" @click="handleConfigProfSeo(scope.row)">配置SEO</el-button>
                                    <el-button type="danger" size="small" @click="handleDeleteProf(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table> -->
                    </div>
                
                </div>
            </el-tab-pane>
            <el-tab-pane label="新闻中心列表" name="news">
                <div class="content">
                    <el-button icon="el-icon-circle-plus-outline" type="primary" size="small" @click="handleAddNews">添加新闻</el-button>
                    
                </div>
            </el-tab-pane>
        </el-tabs>

        <transition name="el-zoom-in-top">
            <div class="prof-content" v-if="dialog1.show">
                <el-form v-model="formProf" label-width="100px">
                    <el-form-item label="工程案例名称">
                        <el-input v-model="formProf.Title" size="small" style="width: 400px" placeholder="请输入工程案例名称" />
                    </el-form-item>
                    <el-form-item label="封面">
                        <div class="cover" @click="handleSelectCoverProf" v-if="!formProf.Cover">
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="cover1"  v-else>
                            <el-button class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                            <img style="width: 100%; height: 100%" :src="formProf.Cover" />
                        </div>
                        <input type="file" ref="prod" accept="image/*" @change="handleProdInputChange" style="display: none;" />
                    </el-form-item>
                    <el-form-item label="工程案例内容">
                        <div id="editor" style="width: calc(100% - 30px)"></div>
                    </el-form-item>
                    <el-form-item label="SEO关键字">
                        <el-input v-model="formProf.SeoKeyword" size="small" style="width: 300px" placeholder="请输入工程案例关键字" />
                    </el-form-item>
                    <el-form-item label="关键字描述">
                        <el-input v-model="formProf.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入工程案例关键描述" />
                    </el-form-item>
                </el-form>
                <div class="btns" style="text-align: center;padding-top: 20px">
                    <el-button size="small" @click="handleCancelProf">取消</el-button>
                    <el-button @click="handleCreateProf" type="primary" size="small">发布</el-button>
                </div>
            </div>
        </transition>

        <transition name="el-zoom-in-top">
            <div class="news-content" v-if="dialog2.show">
                <el-form v-model="formNews" label-width="100px">
                    <el-form-item label="新闻名称">
                        <el-input v-model="formNews.Title" size="small" style="width: 400px" placeholder="请输入新闻名称" />
                    </el-form-item>
                    <el-form-item label="封面">
                        <div class="cover" @click="handleSelectCoverNews" v-if="!formNews.Cover">
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="cover1"  v-else>
                            <el-button class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                            <img style="width: 100%; height: 100%" :src="formNews.Cover" />
                        </div>
                        <input type="file" ref="news" accept="image/*" @change="handleNewsInputChange" style="display: none;" />
                    </el-form-item>
                    <el-form-item label="新闻内容">
                        <div id="editor" style="width: calc(100% - 30px)"></div>
                    </el-form-item>
                    <el-form-item label="SEO关键字">
                        <el-input v-model="formNews.SeoKeyword" size="small" style="width: 300px" placeholder="请输入新闻关键字" />
                    </el-form-item>
                    <el-form-item label="关键字描述">
                        <el-input v-model="formNews.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入工程案例关键描述" />
                    </el-form-item>
                </el-form>
                <div class="btns" style="text-align: center;padding-top: 20px">
                    <el-button size="small" @click="handleCancelNews">取消</el-button>
                    <el-button @click="handleCreateNews" type="primary" size="small">发布</el-button>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
import Editor from 'wangeditor'

export default {
    name: 'PAGE_SelfSetting',
    data: function () {
        return {
            activeName: 'prof',
            dialog1: {
                show: false
            },
            dialog2: {
                show: false
            },
            table: {
                prof: {
                    data: []
                },
                news: {
                    data: []
                }
            },
            formProf: {
                Title: '',
                Txt: '',
                Cover: '',
                SeoKeyword: '',
                SeoDescription: ''
            },
            formNews: {
                Title: '',
                Txt: '',
                Cover: '',
                SeoKeyword: '',
                SeoDescription: ''
            },
            editor: ''
        }
    },
    watch: {
        'dialog1.show' (val) {
            if (!val) {
                this.formProf = {
                    Title: '',
                    Txt: '',
                    Cover: '',
                    SeoKeyword: '',
                    SeoDescription: ''
                }
                return 
            }
            this.$nextTick(() => {
                this.editor = new Editor('#editor')
                const that = this
                this.editor.create()
                this.editor.config.onchange = function (newHtml) {
                    that.formProf.Txt = newHtml            
                }
            })
        },
        'dialog2.show' (val) {
            if (!val) {
                this.formNews = {
                    Title: '',
                    Txt: '',
                    Cover: '',
                    SeoKeyword: '',
                    SeoDescription: ''
                }
                return
            }
            this.$nextTick(() => {
                this.editor = new Editor('#editor')
                const that = this
                this.editor.create()
                this.editor.config.onchange = function (newHtml) {
                    that.formNews.Txt = newHtml            
                }
            })
        }
    },
    methods: {
        /**
         * 点击展示工程案例
         */
        handleAddProf: function () {
            this.dialog1.show = true
            
        },
        /**
         * 点击展示创建新闻
         */
        handleAddNews: function () {
            this.dialog2.show = true
        },
        /**
         * 修改工程案例
         */
        handleEditProf: function () {

        },
        /**
         * 配置工程案例 Seo
         */
        handleConfigProfSeo: function () {

        },
        /**
         * 删除工程案例
         */
        handleDeleteProf: function () {

        },
        /**
         * 取消创建工程案例
         */
        handleCancelProf: function () {
            this.dialog1.show = false
            this.formProf = {
                Title: '',
                Txt: '',
                Cover: '',
                SeoKeyword: '',
                SeoDescription: ''
            }
        },
        /**
         * 创建工程案例
         */
        handleCreateProf: function () {
            console.log(this.formProf)
        },
        /**
         * 取消创建新闻
         */
        handleCancelNews: function () {
            this.dialog2.show = false
            this.formNews = {
                Title: '',
                Txt: '',
                Cover: '',
                SeoKeyword: '',
                SeoDescription: ''
            }
        },
        /**
         * 创建新闻
         */
        handleCreateNews: function () {
            console.log(this.formProf)
        },
        /**
         * 选择工程图片
         */
        handleSelectCoverProf: function () {
            this.$refs.prod.click()
        },
        /**
         * 选择新闻图片
         */
        handleSelectCoverNews: function () {
            this.$refs.prod.click()
        },
        /**
         * 准备上传图片工程案例
         */
        handleProdInputChange: function () {
            const prod_file = this.$refs.prod.files[0]
            let reader = new FileReader(), that = this
            reader.onload = function () {
                that.formProf.Cover = reader.result
            }
            reader.readAsDataURL(prod_file)
        },
        /**
         * 准备上传图片新闻
         */
        handleNewsInputChange: function () {
            const news_file = this.$refs.news.files[0]
            let reader = new FileReader(), that = this
            reader.onload = function () {
                that.formNews.Cover = reader.result
            }
            reader.readAsDataURL(news_file)
        }
    }
}
</script>

<style lang="scss" scoped>
.selfSetting {
    .btns {
        margin-bottom: 20px;
    }
    .content {
        width: 100%;
        padding: 20px;
        background-color: #fff;
        box-sizing: border-box;
    }
    .prof-content {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: #fff;
        box-sizing: border-box;
        padding: 20px;
        .cover {
            width: 170px;
            height: 170px;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px dashed #ccc;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            vertical-align: top;
            i {
                font-size: 20px;
                color: #999;
            }
            &:hover {
                cursor: pointer;
                border: 1px dashed #666;
            }
        }
        .cover1 {
            width: 170px;
            height: 170px;
            border-radius: 4px;
            vertical-align: top;
            position: relative;
            &:hover .delete{
                display: block;
            }
            .delete {
                position: absolute;
                right: -10px;
                top: -10px;
                z-index: 2;
                display: none;
            }
        }
    }
    .news-content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: #fff;
        box-sizing: border-box;
        padding: 20px;
    }
}
</style>