<template>
    <div class="productSetting">
        <el-form :model="form" label-width="120px">
            <el-form-item label="所属分类">
                <el-input placeholder="点击选择选择产品分类" size="small" 
                    :value="form.CategoryName" style="margin-top: 4px; width: 300px"
                    @focus="treeShow = true" />
                <transition name="el-zoom-in-top">
                    <div v-if="treeShow">
                        <el-tree :data="productList" :props="defaultProps" 
                        @node-click="handleNodeClick" class="tree-wrapper"
                        highlight-current
                        ></el-tree>
                        <el-button type="primary" size="small" 
                            @click="treeShow=false" 
                            style="margin-top: 10px; margin-left: 245px;">
                            收起
                        </el-button>
                    </div>
                </transition>
            </el-form-item>
            <el-form-item label="产品标题">
                <el-input placeholder="请输入产品标题" size="small"
                    v-model="form.Title" style="margin-top: 4px; width: 300px" />
            </el-form-item>
            <el-form-item label="产品副标题">
                <el-input placeholder="请输入产品标题" size="small"
                    v-model="form.SubTitle" style="margin-top: 4px; width: 300px" />
            </el-form-item>
            <el-form-item label="产品型号">
                 <el-input placeholder="请输入产品标题" size="small"
                    v-model="form.Model" style="margin-top: 4px; width: 300px" />
            </el-form-item>
            <el-form-item label="产品封面">
                <div class="cover" @click="handleClickInput" v-if="!form.Cover">
                    <i class="el-icon-plus"></i>
                </div>
                <div class="cover1" v-else style="background: #e8e8e8;">
                    <img :src="form.Cover.indexOf('base64') > -1 ? form.Cover : host + form.Cover" />
                    <el-button @click="handleDeleteImage" class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                </div>
                <input type="file" ref="coverInput" style="display: none;" @change="handleCoverChange" />
            </el-form-item>
            <el-form-item label="系列">
                <el-radio-group v-model="form.radio" style="margin-top: 13px;">
                    <el-radio :label="1">单个产品</el-radio>
                    <el-radio :label="2">多个产品</el-radio>
                </el-radio-group>
            </el-form-item>
            <div class="tabs" v-if="form.radio == 2">
                <el-tag
                    :key="index"
                    v-for="(tag, index) in form.Series"
                    closable
                    ref="tag"
                    :type="tag.Type"
                    :disable-transitions="false"
                    @click="handleClick(index)"
                    @close="handleClose(tag)">
                    {{ tag.SeriesName }}
                    </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
            <div class="single" v-for="(item, index) in form.Series" :key="index">
                <el-form-item label="系列名" v-if="form.radio != 1 || form.Series.length > 1">
                    <el-input placeholder="请输入系列名" size="small"
                        v-model="item.SeriesName" style="margin-top: 4px; width: 300px" />
                </el-form-item>
                <el-form-item label="产品简介">
                    <el-input placeholder="请输入产品简介" size="small" type="textarea" :rows="6"
                        v-model="item.Info" style="margin-top: 4px; width: 300px" />
                </el-form-item>
                <el-form-item label="淘宝地址">
                    <el-input placeholder="请输入淘宝地址" size="small"
                        v-model="item.Taobao" style="margin-top: 4px; width: 300px" />
                </el-form-item>
                <el-form-item label="天猫地址">
                    <el-input placeholder="请输入天猫地址" size="small"
                        v-model="item.Tmall" style="margin-top: 4px; width: 300px" />
                </el-form-item>
                <el-form-item label="详细">
                    <el-table :data="item.Param" border style="width: 600px" 
                        v-if="item.Param.length > 0" size="small">
                        <el-table-column
                            prop="key"
                            label="简介名"
                            width="70">
                        </el-table-column>
                        <el-table-column
                            prop="val"
                            label="简介内容"
                            width="450">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="80">
                            <template slot-scope="scope">
                                <el-button type="danger" size="small" @click="handleDeleteParam(0, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button @click="info.show = true" type="primary" size="mini" icon="el-icon-plus" style="margin-top: 5px">新建简介</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="footer">
            <el-button size="small" @click="handleCancelCreate">取消</el-button>
            <el-button size="small" @click="handleConfirmCreate" type="primary">确认</el-button>
        </div>
        <el-dialog
            title="添加简介"
            :visible.sync="info.show"
            :modal="false"
            width="30%">
            <el-form :model="info" label-width="80px">
                <el-form-item label="简介名">
                    <el-input v-model="info.key" style="width: 300px" placeholder="请输入简介名" size="small" />
                </el-form-item>
                <el-form-item label="简介内容">
                    <el-input v-model="info.val" style="width: 300px" placeholder="请输入简介内容" size="small" type="textarea" :rows="5" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="info.show = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="handleAddInfo(0)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    host,
    getProductGroup
} from '@/api'

export default {
    name: 'PAGE_ProductSetting',
    data() {
        return {
            host,
            form: {
                CategoryID: '',
                CategoryName: '',
                Title: '',
                SubTitle: '',
                Model: '',
                Cover: '',
                radio: 1,
                Series: [
                    {
                        SeriesName: '默认系列名',
                        Info: '',
                        Taobao: '',
                        Tmall: '',
                        Param: [],
                        Type: 'success'
                    }
                ],
                Imgs: []
            },
            serie: {
                SeriesName: '',
                Info: '',
                Taobao: '',
                Tmall: '',
                Param: []
            },
            img: {
                Src: '',
                Alt: '',
                Num: ''
            },
            info: {
                show: false,
                key: '',
                val: ''
            },
            productList: [],
            defaultProps: {
                children: 'Children',
                label: 'Name'
            },
            treeShow: false,

            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
        }
    },
    watch: {
        'info.show' (val) {
            if (!val) {
                this.info.key = ''
                this.info.val = ''
            }
        },
    },
    created: function () {
        this.getProductList()
    },
    methods: {
        handleClick: function (index) {
            this.form.Series.forEach(item => {
                item.Type = ''
            })
            this.form.Series[index].Type = 'success'
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = {
                SeriesName: this.inputValue,
                Info: '',
                Taobao: '',
                Tmall: '',
                Param: []
            }
            if (inputValue) {
                this.form.Series.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        /**
         * 添加简介
         * @param {*} index
         */
        handleAddInfo: function (index) {
            this.form.Series[index].Param.push({
                key: this.info.key,
                val: this.info.val,
                id: this.form.Series[index].Param.length
            })
            this.info.show = false
        },
        /**
         * 删除简介内容
         * @param {*} row
         */
        handleDeleteParam: function (index, row) {
            this.form.Series[index].Param.splice(row.id, 1)
        },
        /**
         * 点击创建产品
         */
        handleConfirmCreate: function () {
            console.log(this.form)
        },
        /**
         * 点击返回上一页面
         */
        handleCancelCreate: function () {
            this.$router.back()
        },
        /**
         * 点击树桩图选择产品分类
         * @param {*} val
         */
        handleNodeClick: function (val) {
            this.form.CategoryID = val.ID
            this.form.CategoryName = val.Name
        },
        /**
         * 点击添加图片
         */
        handleClickInput: function () {
            this.$refs.coverInput.click()
        },
        /**
         * 点击删除选中的图片
         */
        handleDeleteImage: function () {
            this.form.Cover = ''
        },
        /**
         * input 选中之后
         */
        handleCoverChange: function () {
            const file = this.$refs.coverInput.files[0]
            let reader = new FileReader(), that = this
            reader.onload = function () {
                that.form.Cover = reader.result
                that.$refs.coverInput.value = ''
            }
            reader.readAsDataURL(file)
        },
        /**
         * 获取产品分类列表
         */
        getProductList: function () {
            getProductGroup()
                .then(res => {
                    this.productList = res.data
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.productSetting {
    background-color: #fff;
    margin-top: 20px;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    padding: 20px;
    .tree-wrapper {
        width: 300px; 
        margin-top: 10px; 
        border: 1px solid #e8e8e8;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 4px;
    }
    .cover {
        width: 130px;
        height: 130px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 1px dashed #ccc;
        border-radius: 4px;
        cursor: pointer;
        vertical-align: top;
    }
    .cover1 {
        position: relative;
        width: 130px;
        height: 130px;
        margin-right: 20px;
        vertical-align: top;
        display: inline-flex;
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
    .footer {
        width: 400px;
        text-align: center;
    }
    .tabs {
        padding-left: 120px;
        padding-bottom: 20px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
}

</style>