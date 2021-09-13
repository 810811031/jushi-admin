<template>
    <div class="selfSetting">
        <el-tabs v-model="active">
            <el-tab-pane v-for="(item, index) in tabs" 
                :key="index" :label="item.Title" :name="`${ index }`">
                <div class="content">
                    <el-button icon="el-icon-circle-plus-outline"
                         type="primary" size="small" @click="handleAdd">添加{{ item.Title }}</el-button>
                    <div style="height: 20px"></div>
                    <el-table :data="table.data" border v-loading="table.loading">
                        <el-table-column
                            prop="Title"
                            label="标题"
                            align="center"
                            ></el-table-column>
                        <el-table-column
                            label="封面"
                            align="center"
                            width="250">
                            <template slot-scope="scope">
                                <img class="Cover" style="width: 150px" :src="host + scope.row.Cover" />
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
                                <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button size="mini" @click="handleConfigSeo(scope.row)">编辑seo</el-button>
                                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="footer">
                        <el-pagination
                            background
                            :current-page="table.current"
                            @current-change="handleChangePage"
                            layout="prev, pager, next"
                            :total="table.total * 10">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 创建 和 修改自定义页面 -->
        <transition name="el-zoom-in-top">
            <div class="dialog-wrapper" v-if="dialog.show">
                <el-form v-model="dialog.form" label-width="100px">
                    <el-form-item label="自定义标题">
                        <el-input v-model="dialog.form.Title" size="small" style="width: 400px" placeholder="请输入自定义文章标题" />
                    </el-form-item>
                    <el-form-item label="自定义标题">
                        <template v-if="!dialog.form.Cover">
                            <div class="cover" @click="handleSelectCover" >
                                <i class="el-icon-plus"></i>
                            </div>
                            <div class="image-tip">尺寸：216 * 216 px; 格式：PNG、JPG</div>
                        </template>
                        
                        <div class="cover1"  v-else>
                            <el-button @click="handleRemoveImage" class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                            <img :src="dialog.form.Cover.indexOf('base64') > -1 ? dialog.form.Cover : host + dialog.form.Cover" />
                        </div>
                        <input type="file" ref="image" accept="image/*" @change="handleInputChange" style="display: none;" />
                    </el-form-item>
                    <el-form-item label="内容">
                        <div class="txt_content">
                            <quill-editor
                                v-model="dialog.form.Txt"
                                />
                        </div>
                    </el-form-item>
                    <el-form-item label="SEO关键字">
                        <el-input v-model="dialog.form.SeoKeyword" size="small" style="width: 300px" placeholder="请输入关键字" />
                    </el-form-item>
                    <el-form-item label="关键字描述">
                        <el-input v-model="dialog.form.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入关键描述" />
                    </el-form-item>
                </el-form>
                <div class="btns">
                    <el-button size="small" @click="handleCancelDialog">取消</el-button>
                    <el-button @click="handleCreateDialog" type="primary" size="small" :loading="dialog.loading">发布</el-button>
                </div>
            </div>
        </transition>
        <!-- 编辑 seo -->
        <el-dialog
            title="提示"
            :visible.sync="seo.show"
            :modal="false"
            width="30%">
            <el-form :model="seo.form">
                <el-form-item label="SEO关键字">
                    <el-input v-model="seo.form.SeoKeyword" size="small" style="width: 300px" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="关键字描述">
                    <el-input v-model="seo.form.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入关键字描述" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="seo.show = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleSendSeo" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    getMenuList,
    getCases,
    host,
    deleteCases,
    getImageBase64,
    clone,
    updateCases,
    createCases,
    updateCasesSeo
} from '@/api'

export default {
    name: 'PAGE_SelfSetting',
    data: function () {
        return {
            host,
            tabs: [],
            active: '0',
            activeId: 0,
            table: {
                data: [],
                current: 1,
                total: 0,
                loading: false
            },
            dialog: {
                show: false,
                loading: false,
                form: {
                    ID: 0,
                    Title: '',
                    Cover: '',
                    SeoKeyword: '',
                    SeoDescription: '',
                    Txt: ''
                }
            },
            seo: {
                show: false,
                form: {
                    SeoKeyword: '',
                    SeoDescription: '',
                    ID: 0
                }
            }
        }
    },
    created: function () {
        this.getMenus()
    },
    watch: {
        active(val) {
            let id = this.tabs[val].ID
            this.activeId = id
            this.getTableList()
        }
    },
    methods: {
        /**
         * 添加自定义项目
         */
        handleAdd: function () {
            this.dialog.show = true
        },
        /**
         * 编辑自定义项目
         */
        handleEdit: function(row) {
            const { Title, Txt, Cover, SeoKeyword, SeoDescription, ID } = row
            this.dialog.form = {
                ...this.dialog.form,
                Title, Txt, Cover, SeoKeyword, SeoDescription, ID
            }
            this.dialog.show = true
        },
        /**
         * 配置 Seo 
         * @param {*} row
         */
        handleConfigSeo: function(row) {
            const { ID, SeoKeyword, SeoDescription } = row
            this.seo.show = true
            this.seo.form = {
                ID, SeoKeyword, SeoDescription
            }
        },
        /**
         * 更新 seo
         */
        handleSendSeo: function () {
            updateCasesSeo(this.seo.form.ID, this.seo.form)
                .then(res => {
                    this.$message.success(res.data)
                    this.getTableList()
                    this.seo.show = false
                })
        },
        /**
         * 删除自定义项目
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
         * 选择图片
         */
        handleSelectCover: function() {
            this.$refs.image.click()
        },
        /**
         * 删除图片
         */
        handleRemoveImage: function () {
            this.dialog.form.Cover = ''
        },
        /**
         * 图片选择完成后
         */
        handleInputChange: function () {
            const file = this.$refs.image.files[0]
            let reader = new FileReader(), that = this
            reader.onload = function () {
                that.dialog.form.Cover = reader.result
            }
            reader.readAsDataURL(file)
        },
        /**
         * 取消本次 新建 或 修改
         */
        handleCancelDialog: function () {
            this.dialog.show = false
            this.dialog.form = {
                Title: '',
                Txt: '',
                Cover: '',
                SeoKeyword: '',
                SeoDescription: '',
                ID: 0
            }
        },
        /**
         * 提交 本次 新建
         */
        handleCreateDialog: async function () {
            this.dialog.form.Cover = await getImageBase64(this.dialog.form.Cover)
            const param = clone(this.dialog.form)
            this.dialog.loading = true
            if (this.dialog.form.ID) {
                updateCases(this.dialog.form.ID, param)
                    .then(res => this.resultFn(res))
            } else {
                createCases(this.activeId, param)
                    .then(res => this.resultFn(res))
            }
        },
        resultFn: function (res) {
            this.$message.success(res.data)
            this.dialog.show = false
            this.dialog.loading = false
            this.dialog.form = {
                Title: '',
                Txt: '',
                Cover: '',
                SeoKeyword: '',
                SeoDescription: '',
                ID: 0
            }
            this.getTableList()
        },
        /**
         * 改变当前的菜单页数
         */
        handleChangePage: function (page) {
            this.table.current = page
            this.getTableList()
        },
        /**
         * 获取菜单列表
         */
        getMenus: function () {
            getMenuList()
                .then(res => {
                    this.tabs = res.data.filter(item => item.Status != 0)
                    this.activeId = this.tabs[0].ID
                    this.getTableList()
                })
        },
        /**
         * 获取列表数据
         */
        getTableList: function () {
            this.table.loading = true
            getCases(this.table.current, this.activeId)
                .then(res => {
                    console.log(res)
                    this.table.loading = false
                    this.table.data = res.data.list
                    this.table.total = res.data.pageTotal * 10
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
        .footer {
            text-align: right;
            margin-top: 20px;
        }
    }
    .dialog-wrapper {
        width: calc(100% - 220px);
        height: calc(100% - 50px);
        background-color: #fff;
        overflow: auto;
        position: fixed;
        top: 50px;
        right: 0;
        z-index: 9;
        box-sizing: border-box;
        padding: 20px;
        .image-tip {
            color: #999;
            line-height: 30px;
        }
        .cover {
            width: 130px;
            height: 130px;
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
            width: 130px;
            height: 130px;
            border-radius: 4px;
            vertical-align: top;
            position: relative;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            vertical-align: top;
            background-color: #e8e8e8;
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
            img {
                width: auto;
                height: auto;
                max-width: 130px;
                max-height: 130px;
            }
        }
        .btns {
            text-align: center;
            padding-top: 20px;
        }
    }
}
</style>