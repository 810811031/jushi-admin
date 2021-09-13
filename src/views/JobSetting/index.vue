<template>
    <div class="jobSetting">
        <div class="btns">
            <el-button icon="el-icon-circle-plus-outline" @click="dialog.show = true" type="primary" size="small">发布招聘岗位</el-button>
        </div>
        <div class="content">
            <el-table :data="table.data" border>
                <el-table-column
                    prop="Index"
                    label="序号"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    prop="Title"
                    label="岗位名称"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    prop="CreatedAt"
                    label="创建时间"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    prop="UpdatedAt"
                    label="更新时间"
                    align="center"
                    ></el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer">
                <el-pagination
                    background
                    :page-size="10"
                    layout="prev, pager, next"
                    :total="table.total * 10">
                </el-pagination>
            </div>
        </div>
        
        <transition name="el-zoom-in-top">
            <div class="createJob" v-if="dialog.show">
                <el-form v-model="form" label-width="100px">
                    <el-form-item label="岗位名称">
                        <el-input v-model="form.title" size="small" style="width: 300px" placeholder="请输入岗位名称" />
                    </el-form-item>
                    <el-form-item label="岗位内容">
                        <!-- <div id="editor" style="width: calc(100% - 30px)" v-loading="form.loading"></div> -->
                        <quill-editor
                                v-model="form.content"
                                />
                    </el-form-item>
                </el-form>
                <div class="btns" style="text-align: center;padding-top: 20px">
                    <el-button size="small" @click="handleCancel">取消</el-button>
                    <el-button @click="handleCreateJob" type="primary" size="small">发布</el-button>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
import { getOffers, createOffers, updateOffers, deleteOffers } from '@/api'

export default {
    name: 'PAGE_JobSetting',
    data: function () {
        return {
            dialog: {
                show: false
            },
            table: {
                data: [],
                current: 1,
                total: 0
            },
            form: {
                title: '',
                content: '',
                id: null,
                loading: false
            },
            editor: null
        }
    },
    created: function () {
        this.getTableData()
    },
    watch: {
        'dialog.show'(val) {
            if (!val) {
                this.form.id = null
                this.form.content = ''
                this.form.title = ''
                return
            }
        }
    },
    methods: {
        /**
         * 创建新的岗位
         */
        handleCreateJob: function () {
            const { title, content } = this.form
            if (!title) return this.$message.error('请填写标题')
            if (!content) return this.$message.error('请填写内容')
            const param = {
                Title: title,
                Txt: content
            }
            if (this.form.id) {
                updateOffers(this.form.id, param)
                    .then(() => {
                        this.$message.success('更新成功')
                        this.table.current = 1
                        this.getTableData()
                        this.dialog.show = false
                    })
            } else {
                createOffers(param)
                    .then(() => {
                        this.$message.success('创建成功')
                        this.table.current = 1
                        this.getTableData()
                        this.dialog.show = false
                    })
            }
        },
        handleCancel: function () {
            this.dialog.show = false
            this.form.id = null
            this.form.content = ''
            this.form.title = ''
        },
        /**
         * 修改岗位内容
         * @param {*} row
         */
        handleEdit: function (row) {
            this.dialog.show = true
            this.form.title = row.Title
            this.form.content = row.Txt
            this.form.loading = true
            this.form.id = row.ID
            setTimeout(() => {
                this.form.loading = false
                this.editor.txt.html(this.form.content)
            }, 500)
        },
        /**
         * 删除岗位内容
         * @param {*} row
         */
        handleDelete: function (row) {
            this.$confirm('确定要删除此条记录吗？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
            }).then(() => {
                deleteOffers(row.ID)
                    .then(() => {
                        this.$message.error('删除记录成功')
                        this.table.current = 1
                        this.getTableData()
                    })
            }).catch(() => {})
        },
        /**
         * 获取列表数据
         */
        getTableData: function () {
            getOffers(this.table.current)
                .then(res => {
                    res.data.list.forEach((item, index) => {
                        item.Index = (this.table.current - 1) * 10 + index + 1
                    })
                    this.table.data = res.data.list
                    this.table.total = res.data.pageTotal
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.jobSetting {
    box-sizing: border-box;
    padding-top: 20px;
    .btns {
        margin-bottom: 20px;
    }
    .content {
        width: 100%;
        min-height: 500px;
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
        .footer {
            padding: 20px;
            text-align: right;
        }
    }
    .createJob {
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