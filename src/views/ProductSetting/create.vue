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
                <p class="imgTip">尺寸：250*200px；格式：PNG</p>
                <input type="file" ref="coverInput" style="display: none;" @change="handleCoverChange" />
            </el-form-item>
            <el-form-item label="产品轮播图">
                <div class="cover1" style="background: #e8e8e8;" v-for="(item, index) in form.Imgs" :key="index">
                        <img :src="item.Src.indexOf('base64') > -1 ? item.Src : host + item.Src" />
                        <el-button @click="handleDeleteSwiepr(index)" class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                    </div>
                    <div class="cover" @click="handleClickSwieprImg">
                        <i class="el-icon-plus"></i>
                    </div>
                    <p class="imgTip">推荐尺寸460*780px；格式：PNG</p>
                    <input type="file" ref="swiperImg" style="display: none;" @change="handleSwiperImg" />
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
            <div class="single">
                <el-form-item label="系列名" v-if="form.radio != 1 || form.Series.length > 1">
                    <el-input placeholder="请输入系列名" size="small"
                        v-model="form.Series[currentTag].SeriesName" style="margin-top: 4px; width: 300px" />
                </el-form-item>
                <el-form-item label="产品简介">
                    <el-input placeholder="请输入产品简介" size="small" type="textarea" :rows="6"
                        v-model="form.Series[currentTag].Info" style="margin-top: 4px; width: 300px" />
                </el-form-item>
                <el-form-item label="淘宝地址">
                    <el-input placeholder="请输入淘宝地址" size="small"
                        v-model="form.Series[currentTag].Taobao" style="margin-top: 4px; width: 300px" />
                </el-form-item>
                <el-form-item label="天猫地址">
                    <el-input placeholder="请输入天猫地址" size="small"
                        v-model="form.Series[currentTag].Tmall" style="margin-top: 4px; width: 300px" />
                </el-form-item>
                <el-form-item label="详细">
                    <el-table :data="form.Series[currentTag].Param" border style="width: 600px" 
                        v-if="form.Series[currentTag].Param.length > 0" size="small">
                        <el-table-column
                            prop="Key"
                            label="简介名"
                            width="70">
                        </el-table-column>
                        <el-table-column
                            prop="Val"
                            label="简介内容"
                            width="450">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="80">
                            <template slot-scope="scope">
                                <el-button type="danger" size="small" @click="handleDeleteParam(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button @click="info.show = true" type="primary" size="mini" icon="el-icon-plus" style="margin-top: 5px">新建简介</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="footer">
            <el-button size="small" @click="handleCancelCreate">取消</el-button>
            <el-button size="small" @click="handleConfirmCreate" type="primary" :loading="loading">确认</el-button>
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
                <el-button type="primary" size="small" @click="handleAddInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    host,
    getProductGroup,
    createProducts,
    updateProducts,
    getImageBase64,
    getProductDetail
} from '@/api'

export default {
    name: 'PAGE_ProductSetting',
    data() {
        return {
            host,
            loading: false,
            form: {
                ID: null,
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
            currentTag: 0,
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
            this.currentTag = index
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
         * 删除 swiepr 图片
         * @param {*} index
         */
        handleDeleteSwiepr: function (index) {
            this.form.Imgs.splice(index, 1)
        },
        /**
         * 点击选择 swiper 图片
         */
        handleClickSwieprImg: function () {
            this.$refs.swiperImg.click()
        },
        /**
         * 更改 swiper 图片
         */
        handleSwiperImg: function () {
            const file = this.$refs.swiperImg.files[0]
            let reader = new FileReader(), that = this
            reader.onload = function () {
                that.form.Imgs.push({
                    Src: reader.result
                })
                that.$refs.swiperImg.value = ''
            }
            reader.readAsDataURL(file)
        },
        /**
         * 添加简介
         * @param {*} index
         */
        handleAddInfo: function () {
            this.form.Series[this.currentTag].Param.push({
                Key: this.info.key,
                Val: this.info.val,
                ID: this.form.Series[this.currentTag].Param.length
            })
            this.info.show = false
        },
        /**
         * 删除简介内容
         * @param {*} row
         */
        handleDeleteParam: function (row) {
            this.form.Series[this.currentTag].Param.splice(row.ID, 1)
        },
        /**
         * 点击创建产品
         */
        handleConfirmCreate: async function () {
            this.loading = true
            this.form.Cover = await getImageBase64(this.form.Cover)
            if (this.form.ID) {
                for (let i = 0; i < this.form.Imgs.length; i++) {
                    this.form.Imgs[i].Src = await getImageBase64(this.form.Imgs[i].Src)
                }
                updateProducts(this.form.ID, this.form)
                    .then(res => {
                        this.$message.success(res.data)
                        this.loading = false
                        this.$router.back()
                    })
            } else {
                createProducts(this.form)
                    .then(res => {
                        this.$message.success(res.data)
                        this.loading = false
                        this.$router.back()
                    })
            }
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
                    if (this.$route.query.id) {
                        this.getProductDetail()
                    }
                })
        },
        getName: function (list, id) {
            let result = ''
            list.forEach(item => {
                if (item.ID == id) result = item.Name
                item.Children.forEach(ch => {
                    if (ch.ID == id) result = ch.Name
                })
            })
            return result
        },
        /**
         * 获取产品详情
         */
        getProductDetail: function () {
            getProductDetail(this.$route.query.id)
                .then(res => {
                    let CategoryName = this.getName(this.productList, res.data.CategoryID)
                                   
                    this.form = {
                        ...this.form,
                        CategoryID: res.data.CategoryID,
                        CategoryName: CategoryName,
                        ID: res.data.ID,
                        Title: res.data.Title,
                        SubTitle: res.data.SubTitle,
                        Model: res.data.Model,
                        Cover: res.data.Cover,
                        radio: res.data.Series.length > 1 ? 2 : 1,
                        Series: res.data.Series,
                        Imgs: res.data.Imgs
                    }
                    this.form.Series[0].Type = 'success'
                    this.form.Series.forEach(serie => {
                        serie.Param.forEach((item, index) => {
                            item.ID = index
                        })
                    })
                    console.log(this.form)
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
    .imgTip {
        font-size: 14px;
        color: #999;
        line-height: 40px;
    }
}

</style>