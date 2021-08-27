<template>
    <div class="selfSetting">
        <el-tabs v-model="activeName">
            <el-tab-pane label="工程案例列表" name="prof">
                <div class="content">
                    <el-button icon="el-icon-circle-plus-outline" type="primary" size="small" @click="handleAddProf">添加工程案例</el-button>

                    <div class="table">
                        <div style="height: 20px"></div>
                        <el-table :data="table.prof.data" border>
                            <el-table-column
                                prop="Title"
                                label="标题"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                label="封面"
                                align="center"
                                >
                                <template slot-scope="scope">
                                    <img class="Cover" style="width: 300px" :src="scope.row.Cover" />
                                </template>    
                            </el-table-column>
                            <el-table-column
                                prop="SeoKeyword"
                                label="关键字"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                prop="SeoDescription"
                                label="关键字描述"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                prop="CreatedAt"
                                label="创建时间"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="280"
                                >
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="handleEditProf(scope.row)">编辑</el-button>
                                    <el-button size="mini" @click="handleConfigSeo(scope.row)">编辑seo</el-button>
                                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                
                </div>
            </el-tab-pane>
            <el-tab-pane label="新闻中心列表" name="news">
                <div class="content">
                    <el-button icon="el-icon-circle-plus-outline" type="primary" size="small" @click="handleAddNews">添加新闻</el-button>
                    <div style="height: 20px"></div>
                    <div class="table">
                        <el-table :data="table.news.data" border>
                            <el-table-column
                                prop="Title"
                                label="标题"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                label="封面"
                                align="center"
                                >
                                <template slot-scope="scope">
                                    <img class="Cover" style="width: 300px" :src="scope.row.Cover" />
                                </template>    
                            </el-table-column>
                            <el-table-column
                                prop="SeoKeyword"
                                label="关键字"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                prop="SeoDescription"
                                label="关键字描述"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                prop="CreatedAt"
                                label="创建时间"
                                align="center"
                                ></el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="280"
                                >
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="handleEditNews(scope.row)">编辑</el-button>
                                    <el-button size="mini" @click="handleConfigSeo(scope.row)">编辑seo</el-button>
                                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
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
                        <div id="editor1" style="width: calc(100% - 30px)"></div>
                    </el-form-item>
                    <el-form-item label="SEO关键字">
                        <el-input v-model="formProf.SeoKeyword" size="small" style="width: 300px" placeholder="请输入关键字" />
                    </el-form-item>
                    <el-form-item label="关键字描述">
                        <el-input v-model="formProf.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入关键描述" />
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
                        <div id="editor2" style="width: calc(100% - 30px)"></div>
                    </el-form-item>
                    <el-form-item label="SEO关键字">
                        <el-input v-model="formNews.SeoKeyword" size="small" style="width: 300px" placeholder="请输入关键字" />
                    </el-form-item>
                    <el-form-item label="关键字描述">
                        <el-input v-model="formNews.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入关键描述" />
                    </el-form-item>
                </el-form>
                <div class="btns" style="text-align: center;padding-top: 20px">
                    <el-button size="small" @click="handleCancelNews">取消</el-button>
                    <el-button @click="handleCreateNews" type="primary" size="small">发布</el-button>
                </div>
            </div>
        </transition>

        <el-dialog
            title="提示"
            :visible.sync="dialog.show"
            :modal="false"
            width="30%">
            <el-form :model="dialog.form">
                <el-form-item label="SEO关键字">
                    <el-input v-model="dialog.form.SeoKeyword" size="small" style="width: 300px" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="关键字描述">
                    <el-input v-model="dialog.form.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入关键字描述" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleSendSeo" size="small">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import Editor from 'wangeditor'
import { getMenuList, getCases, createCases, updateCases, deleteCases, updateCasesSeo } from '@/api'

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
            dialog: {
                show: false,
                form: {
                    ID: '',
                    SeoKeyword: '',
                    SeoDescription: ''
                }
            },
            table: {
                prof: {
                    data: [],
                    current: 1,
                    total: 0
                },
                news: {
                    data: [],
                    current: 1,
                    total: 0
                }
            },
            formProf: {
                Title: '',
                Txt: '',
                Cover: '',
                SeoKeyword: '',
                SeoDescription: '',
                MenuId: '',
                ID: null
            },
            formNews: {
                Title: '',
                Txt: '',
                Cover: '',
                SeoKeyword: '',
                SeoDescription: '',
                MenuId: '',
                ID: null
            },
            editor1: '',
            editor2: ''
        }
    },
    created: function () {
        this.getMenuList()
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
                this.editor1 = new Editor('#editor1')
                const that = this
                this.editor1.create()
                this.editor1.config.onchange = function (newHtml) {
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
                this.editor2 = new Editor('#editor2')
                const that = this
                this.editor2.create()
                this.editor2.config.onchange = function (newHtml) {
                    that.formNews.Txt = newHtml            
                }
            })
        },
        activeName() {
            this.getTableList()
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
         * 更新 seo
         * @param {*} row
         */
        handleConfigSeo: function (row) {
            this.dialog.show = true
            this.dialog.form = {
                ID: row.ID,
                SeoKeyword: row.SeoKeyword,
                SeoDescription: row.SeoDescription
            }
        },
        /**
         * 更新 seo
         */
        handleSendSeo: function () {
            updateCasesSeo(this.dialog.form.ID, this.dialog.form)
                .then(res => {
                    this.$message.success(res.data)
                    this.getTableList()
                    this.dialog.show = false
                })
        },
        /**
         * 修改工程案例
         * @param {*} row
         */
        handleEditProf: function (row) {
            this.formProf = {
                ...this.formProf,
                Title: row.Title,
                Txt: row.Txt,
                Cover: row.Cover,
                SeoKeyword: row.SeoKeyword,
                SeoDescription: row.SeoDescription,
                ID: row.ID
            }
            this.dialog1.show = true
            setTimeout(() => {
                this.editor1.txt.html(this.formProf.Txt)
            }, 200)
        },
        /**
         * 修改新闻中心
         * @param {*} row
         */
        handleEditNews: function (row) {
            this.formNews = {
                ...this.formNews,
                Title: row.Title,
                Txt: row.Txt,
                Cover: row.Cover,
                SeoKeyword: row.SeoKeyword,
                SeoDescription: row.SeoDescription,
                ID: row.ID
            }
            this.dialog2.show = true
            setTimeout(() => {
                this.editor1.txt.html(this.formNews.Txt)
            }, 200)
        },
        /**
         * 删除工程案例
         * @param {*} row
         */
        handleDelete: function (row) {
            this.$confirm('确定要删除此条目吗','提示', {
                confirmButtonText: '确认删除',
                type: 'error'
            })
            .then(() => {
                deleteCases(row.ID)
                    .then(res => {
                        this.$message.success(res.data)
                        this.getTableList()
                    })
            })
            .catch(() => {})
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
                SeoDescription: '',
                ...this.formProf
            }
        },
        /**
         * 创建工程案例
         */
        handleCreateProf: function () {
            if (this.formProf.ID) {
                updateCases(this.formProf.ID, this.formProf)
                    .then(res => {
                        this.$message.success(res.data)
                        this.dialog1.show = false
                        this.formProf = {
                            Title: '',
                            Txt: '',
                            Cover: '',
                            SeoKeyword: '',
                            SeoDescription: '',
                            ...this.formProf
                        }
                    })
            } else {
                createCases(this.formProf.MenuId, this.formProf)
                    .then(res => {
                        this.$message.success(res.data)
                        this.dialog1.show = false
                        this.formProf = {
                            Title: '',
                            Txt: '',
                            Cover: '',
                            SeoKeyword: '',
                            SeoDescription: '',
                            ...this.formProf
                        }
                        this.getTableList()
                    })
            }
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
                SeoDescription: '',
                ...this.formNews
            }
        },
        /**
         * 创建新闻
         */
        handleCreateNews: function () {
            if (this.formNews.ID) {
                updateCases(this.formNews.ID, this.formNews)
                    .then(res => {
                        this.$message.success(res.data)
                        this.dialog2.show = false
                        this.formNews = {
                            Title: '',
                            Txt: '',
                            Cover: '',
                            SeoKeyword: '',
                            SeoDescription: '',
                            ...this.formNews
                        }
                    })
            } else {
                createCases(this.formNews.MenuId, this.formNews)
                    .then(res => {
                        this.$message.success(res.data)
                        this.dialog2.show = false
                        this.formNews = {
                            Title: '',
                            Txt: '',
                            Cover: '',
                            SeoKeyword: '',
                            SeoDescription: '',
                            ...this.formNews
                        }
                        this.getTableList()
                    })
            }
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
        },
        /**
         * 获取菜单列表
         */
        getMenuList: function () {
            getMenuList()
                .then(res => {
                    res.data.forEach(item => {
                        if (item.Title == '工程案例') {
                            this.formProf.MenuId = item.ID
                        } else if (item.Title == '新闻中心') {
                            this.formNews.MenuId = item.ID
                        }
                    })
                    this.getTableList()
                })
        },
        /**
         * 获取列表数据
         */
        getTableList: function () {
            getCases(this.table[this.activeName].current, this.activeName == 'prof' ? this.formProf.MenuId : this.formNews.MenuId)
                .then(res => {
                    console.log(res)
                    this.table[this.activeName].data = res.data.list
                    this.table[this.activeName].total = res.data.pageTotal
                })
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
        .Cover {
            width: 300px;
            min-height: 150px;
            background-color: #ddd;
        }
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
}
</style>