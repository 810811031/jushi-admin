<template>
    <div class="programmeSetting">
        <div class="btns">
            <el-button @click="handleClick" type="primary" size="small">添加解决方案</el-button>
        </div>
        <div class="content">
            <el-table :data="table.data" border>
                <el-table-column
                    prop="No"
                    label="序号"
                    width="100"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="Title"
                    label="主标题"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="Title"
                    label="封面"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <img :src="host + scope.row.Cover" style="width: 300px" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="SubTitle"
                    label="副标题"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="Num"
                    label="排序(点击修改)"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <div style="cursor: pointer;" v-if="!scope.row.show" @click="handleShowInput(scope.row)">{{ scope.row.Num }}</div>
                        <el-input size="small" :ref="`input-${ scope.row.ID }`" @blur="handleChangeNum(scope.row)" v-model="scope.row.Num" v-else placeholder="请输入顺序编号" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="CreatedAt"
                    label="创建时间"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="280"
                    >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handleConfig(scope.row)">配置SEO</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <transition name="el-zoom-in-top">
            <div class="news-content" v-if="dialog.show">
                <el-form v-model="dialog.form" label-width="100px">
                    <el-form-item label="标题">
                        <el-input v-model="dialog.form.Title" size="small" style="width: 400px" placeholder="请输入标题" />
                    </el-form-item>
                    <el-form-item label="副标题">
                        <el-input v-model="dialog.form.SubTitle" size="small" style="width: 400px" placeholder="请输入副标题" />
                    </el-form-item>
                    <el-form-item label="封面">
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
                        <input type="file" ref="file" accept="image/*" @change="handleInputChange" style="display: none;" />
                    </el-form-item>
                    <el-form-item label="内容">
                        <div id="editor" style="width: calc(100% - 30px)"></div>
                    </el-form-item>
                    <el-form-item label="SEO关键字">
                        <el-input v-model="dialog.form.SeoKeyword" size="small" style="width: 300px" placeholder="请输入关键字" />
                    </el-form-item>
                    <el-form-item label="关键字描述">
                        <el-input v-model="dialog.form.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入关键描述" />
                    </el-form-item>
                </el-form>
                <div class="btns" style="text-align: center;padding-top: 20px">
                    <el-button size="small" @click="handleCancel">取消</el-button>
                    <el-button @click="handleCreate" type="primary" size="small">发布</el-button>
                </div>
            </div>
        </transition>

        <el-dialog
            title="提示"
            :visible.sync="dialogSeo.show"
            :modal="false"
            width="30%">
            <el-form :model="dialogSeo.form">
                <el-form-item label="SEO关键字">
                    <el-input v-model="dialogSeo.form.SeoKeyword" size="small" style="width: 300px" placeholder="请输入关键字" />
                </el-form-item>
                <el-form-item label="关键字描述">
                    <el-input v-model="dialogSeo.form.SeoDescription" size="small" type="textarea" :rows="5" style="width: 300px" placeholder="请输入关键字描述" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogSeo.show = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleSendSeo" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Editor from 'wangeditor'
import { 
    host, 
    getProgram, 
    createProgram, 
    deleteProgram, 
    updateProgramSeo, 
    updateProgram, 
    updateProgramIndex,
    getImageBase64 
} from '@/api'

export default {
    name: 'PAGE_ProgrammeSetting',
    data: function () {
        return {
            host,
            table: {
                data: [],
                current: 1,
                size: 10,
                total: 0,
                loading: false
            },
            dialog: {
                show: false,
                form: {
                    Title: '',
                    SubTitle: '',
                    Cover: '',
                    SeoKeyword: '',
                    SeoDescription: '',
                    Txt: '',
                    Num: 1,
                    ID: 0
                }
            },
            dialogSeo: {
                show: false,
                form: {
                    SeoKeyword: '',
                    SeoDescription: ''
                }
            },
            editor: ''
        }
    },
    created: function () {
        this.getTableData()
    },
    watch: {
        'dialog.show'(val) {
            if (!val) return
            this.$nextTick(() => {
                this.editor = new Editor('#editor')
                const that = this
                this.editor.create()
                this.editor.config.onchange = function (newHtml) {
                    that.dialog.form.Txt = newHtml            
                }
            })
        }
    },
    methods: {
        handleClick: function() {
            this.dialog.show = true
            this.dialog.form = {
                ...this.dialog,
                Title: '',
                SubTitle: '',
                Cover: '',
                SeoKeyword: '',
                SeoDescription: '',
                Txt: '',
                Num: '',
                ID: ''
            }
        },
        /**
         * 删除图片
         */
        handleRemoveImage: function() {
            this.dialog.form.Cover = ''
        },
        /**
         * 修改单条记录
         * @param { Object } row 
         */
        handleEdit: function (row) {
            this.dialog.form = {
                ...this.dialog,
                Title: row.Title,
                SubTitle: row.SubTitle,
                Cover: row.Cover,
                SeoKeyword: row.SeoKeyword,
                SeoDescription: row.SeoKeyword,
                Txt: row.Txt,
                Num: row.Num,
                ID: row.ID
            }
            this.dialog.show = true
            setTimeout(() => {
                this.editor.txt.html(row.Txt)
            }, 200)
        },
        /**
         * 改变当前菜单的顺序
         * @param {*} row
         */
        handleShowInput: function (row) {
            row.show = !row.show
            this.$nextTick(() => {
                this.$refs[`input-${ row.ID }`].focus()
            })
        },
        /**
         * 改变当前菜单的顺序
         * @param {*} row
         */
        handleChangeNum: function (row) {
            row.show = !row.show
            updateProgramIndex(row.ID, { Num: Number(row.Num) })
                .then(res => {
                    this.$message.success(res.data)
                    this.getTableData()
                })
        },
        /**
         * 删除词条类目
         * @param { Object } row 
         */
        handleDelete: function (row) {
            this.$confirm('确定要删除此条目吗?', '提示', {
                confirmButtonText: '确认删除',
                type: 'danger'
            })
            .then(() => {
                deleteProgram(row.ID)
                    .then(res => {
                        this.$message.success(res.data)
                        this.getTableData()
                    })
            })
            .catch(() => {})
        },
        /**
         * 改变seo配置
         * @param {*} row
         */
        handleConfig: function (row) {
            this.dialogSeo.show = true
            this.dialogSeo.form.ID = row.ID
            this.dialogSeo.form.SeoKeyword = row.SeoKeyword
            this.dialogSeo.form.SeoDescription = row.SeoDescription
        },
        /**
         * 发送seo请求
         */
        handleSendSeo: function() {
            updateProgramSeo(this.dialogSeo.form.ID, this.dialogSeo.form)
                .then(res => {
                    this.$message.success(res.data)
                    this.getTableData()
                    this.dialogSeo.show = false
                })
        },
        /**
         * 上传图片
         */
        handleInputChange: function () {
            const file = this.$refs.file.files[0]
            let reader = new FileReader(), that = this
            reader.onload = function () {
                that.dialog.form.Cover = reader.result
            }
            reader.readAsDataURL(file)
        },
        /**
         * 点击选择图片
         */
        handleSelectCover: function () {
            this.$refs.file.click()
        },
        /**
         * 关闭
         */
        handleCancel: function () {
            this.dialog.show = false
        },
        /**
         * 创建解决方案
         */
        handleCreate: async function () {
            if (this.dialog.form.ID) {
                this.dialog.form.Cover = await getImageBase64(this.dialog.form.Cover)
                updateProgram(this.dialog.form.ID, this.dialog.form)
                    .then(res => {
                        this.$message.success(res.data)
                        this.dialog.show = false
                        this.getTableData()
                    })
            } else {
                createProgram(this.dialog.form)
                    .then(res => {
                        this.$message.success(res.data)
                        this.dialog.show = false
                        this.getTableData()
                    })
            }
        },
        /**
         * 获取菜单列表
         */
        getTableData: function () {
            getProgram()
                .then(res => {
                    res.data.list.forEach((item, index) => {
                        item.No = index + 1
                        item.show = false
                    })
                    this.table.data = res.data.list
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.programmeSetting {
    box-sizing: border-box;
    padding-top: 20px;
    .btns {
        margin-bottom: 20px;
    }
    .content {
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #ddd;
        .footer {
            text-align: right;
            padding-top: 20px;
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
            background-color: #e8e8e8;
            vertical-align: top;
            display: inline-flex;
            justify-content: center;
            align-items: center;
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
    }
}
</style>