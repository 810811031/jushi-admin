<template>
    <div class="productSetting">
        <div class="btns normal">
            <el-button type="primary" size="small" @click="dialog.show = true">添加产品</el-button>
        </div>
        <div class="content">
            <el-table :data="table.data" border>
                <el-table-column
                    prop="Title"
                    align="center"
                    label="产品类目"
                >
                    <template slot-scope="scope">
                        {{ getProductsName(scope.row) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Model"
                    align="center"
                    label="产品型号"
                ></el-table-column>
                <el-table-column
                    prop="Title"
                    align="center"
                    label="产品名称"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="排序(点击修改)"
                >
                    <template slot-scope="scope">
                        <div style="cursor: pointer;" v-if="!scope.row.show" @click="handleShowInput(scope.row)">{{ scope.row.Num }}</div>
                        <el-input size="small" :ref="`input-${ scope.row.ID }`" @blur="handleChangeNum(scope.row)" v-model="scope.row.Num" v-else placeholder="请输入顺序编号" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="SeoKeyword"
                    align="center"
                    label="seo"
                >
                    <template slot-scope="scope">
                        {{ scope.row.SeoKeyword == '' ? '无' : scope.row.SeoKeyword }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="SeoDescription"
                    align="center"
                    label="seo描述"
                >
                    <template slot-scope="scope">
                        {{ scope.row.SeoDescription == '' ? '无' : scope.row.SeoDescription }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="CreatedAt"
                    align="center"
                    label="创建时间"
                ></el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    width="280"
                >
                    <template slot-scope="scope"> 
                        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="info" @click="handleConfig(scope.row)">配置SEO</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <transition name="el-zoom-in-top">
            <div class="create" v-if="dialog.show">
                <el-form label-width="100px" :model="dialog.form">
                    <el-form-item label="产品类目">
                        <el-select v-model="dialog.form.CategoryID" size="small" placeholder="请选择产品类目">
                            <el-option 
                                v-for="(item, index) in types"
                                :key="index"
                                :label="item.Name"
                                :value="item.ID"
                                >
                                {{ item.Name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品型号">
                        <el-select v-model="dialog.form.Model" size="small" placeholder="请选择产品分类">
                            <el-option
                                v-for="(item, index) in models"
                                :key="index"
                                :label="item.Name"
                                :value="item.Name"
                                >
                                {{ item.Name }}
                            </el-option>    
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品图片">
                        <div class="cover" @click="handleClickInput" v-if="!dialog.form.Cover">
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="cover1" v-else style="background: #e8e8e8;">
                            <img :src="dialog.form.Cover.indexOf('base64') > -1 ? dialog.form.Cover : host + dialog.form.Cover" />
                            <el-button @click="handleDeleteImage" class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                        </div>
                        <input type="file" ref="coverInput" style="display: none;" @change="handleCoverChange" />
                    </el-form-item>
                    <el-form-item label="产品名称">
                        <el-input placeholder="请输入产品名" v-model="dialog.form.Title" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="产品副标题">
                        <el-input placeholder="请输入产品副标题" v-model="dialog.form.SubTitle" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="产品简介">
                        <el-input placeholder="请输入产品简介" v-model="dialog.form.Info" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="淘宝地址">
                        <el-input placeholder="请输入淘宝地址" v-model="dialog.form.Taobao" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="天猫地址">
                        <el-input placeholder="请输入天猫地址" v-model="dialog.form.Tmall" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="功率">
                        <el-input placeholder="请输入功率" v-model="dialog.form.Power" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="输入电压">
                        <el-input placeholder="请输入输入电压" v-model="dialog.form.InputVoltage" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="输入频率">
                        <el-input placeholder="请输入输入频率" v-model="dialog.form.InputFrequency" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="连接线路">
                        <el-input placeholder="请输入连接线路" v-model="dialog.form.ConnectionLine" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="尺寸">
                        <el-input placeholder="请输入尺寸" v-model="dialog.form.Size" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="计量精度">
                        <el-input placeholder="请输入计量精度" v-model="dialog.form.MeasurementAccuracy" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="安装方式">
                        <el-input placeholder="请输入安装方式" v-model="dialog.form.InstallMethod" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="技术指标">
                        <el-input placeholder="请输入技术指标" v-model="dialog.form.TechnicalIndex" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="应用场景">
                        <el-input placeholder="请输入应用场景" v-model="dialog.form.ApplicationScene" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="充电场景">
                        <el-input placeholder="请输入充电场景" v-model="dialog.form.ChargingScene" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="产品SEO">
                        <el-input placeholder="请输入产品SEO" v-model="dialog.form.SeoKeyword" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="SEO描述">
                        <el-input placeholder="请输入SEO描述" v-model="dialog.form.SeoDescription" size="small" style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="产品轮播图">
                        <div class="cover1" style="background: #e8e8e8;" v-for="(item, index) in dialog.form.Imgs" :key="index">
                            <img :src="item.Src.indexOf('base64') > -1 ? item.Src : host + item.Src" />
                            <el-button @click="handleDeleteSwiepr(index)" class="delete" type="danger" size="small" icon="el-icon-delete" circle></el-button>
                        </div>
                        <div class="cover" @click="handleClickSwieprImg">
                            <i class="el-icon-plus"></i>
                        </div>
                        <input type="file" ref="swiperImg" style="display: none;" @change="handleSwiperImg" />
                    </el-form-item>
                </el-form>
                <div class="btns" style="text-align: center;padding-top: 20px">
                    <el-button size="small" @click="handleCancel">取消</el-button>
                    <el-button @click="handleSendRequest" type="primary" size="small">发布</el-button>
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
import { 
    host,
    getProducts,
    getImageBase64, 
    getProductGroup, 
    getModels, 
    createProducts,
    updateProducts,
    updateProductsSeo,
    deleteProducts,
    updateProductsIndex
} from '@/api'

export default {
    name: 'PAGE_ProductSetting',
    data: function () {
        return {
            host,
            activeName: 'manage',
            table: {
                data: [],
                current: 1,
                total: 0
            },
            types: [],
            models: [],
            dialog: {
                show: false,
                form: {
                    CategoryID: '',
                    Model: '',
                    Cover: '',
                    Title: '',
                    SubTitle: '',
                    Info: '',
                    Taobao: '',
                    Tmall: '',
                    Power: '',
                    InputVoltage: '',
                    InputFrequency: '',
                    ConnectionLine: '',
                    Size: '',
                    MeasurementAccuracy: '',
                    InstallMethod: '',
                    TechnicalIndex: '',
                    ApplicationScene: '',
                    ChargingScene: '',
                    Imgs: [],
                    SeoDescription: '',
                    SeoKeyword: '',
                    ID: null
                }
            },
            imgSrouce: {
                Src: '',
                Alt: '',
                Num: null
            },
            dialogSeo: {
                show: false,
                form: {
                    SeoKeyword: '',
                    SeoDescription: '',
                    ID: ''
                }
            }
        }
    },
    watch: {
        'dialog.form.CategoryID'(val) {
            this.getModels(val)
        }
    },
    created: function () {
        this.getTableData()
        this.getProductGroup()
    },
    methods: {
        /**
         * 改变当前菜单的顺序
         * @param {*} row
         */
        handleShowInput: function(row) {
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
            updateProductsIndex(row.ID, { Num: Number(row.Num) })
                .then(res => {
                    this.$message.success(res.data)
                    this.getTableData()
                })
        },
        /**
         * 修改
         */
        handleEdit: function (row) {
            const { CategoryID, Model, Cover, Title, SubTitle, Info, Taobao, Tmall,
            Power, InputVoltage, InputFrequency, ConnectionLine, Size,
            MeasurementAccuracy, InstallMethod, TechnicalIndex, ApplicationScene,
            ChargingScene, Imgs, SeoDescription,SeoKeyword, ID } = row
            this.dialog.form = {
                CategoryID,
                Model,
                Cover,
                Title,
                SubTitle,
                Info,
                Taobao,
                Tmall,
                Power,
                InputVoltage,
                InputFrequency,
                ConnectionLine,
                Size,
                MeasurementAccuracy,
                InstallMethod,
                TechnicalIndex,
                ApplicationScene,
                ChargingScene,
                Imgs,
                SeoDescription,
                SeoKeyword,
                ID
            }
            this.dialog.show = true
        },
        /**
         * 开始配置 seo
         */
        handleConfig: function(row) {
            this.dialogSeo.show = true
            const { ID, SeoDescription, SeoKeyword } = row
            this.dialogSeo.form = {
                ID, SeoDescription, SeoKeyword
            }
        },
        /**
         * 发送 seo 到服务
         */
        handleSendSeo: function () {
            updateProductsSeo(this.dialogSeo.form.ID, this.dialogSeo.form)
                .then(res => {
                    this.$message.success(res.data)
                    this.getTableData()
                    this.dialogSeo.show = false
                })
        },
        /**
         * 删除
         * @param {*} row
         */
        handleDelete: function (row) {
            this.$confirm('确定要删除此条目吗','提示', {
                confirmButtonText: '确认删除',
                type: 'error'
            })
            .then(() => {
                deleteProducts(row.ID)
                    .then(res => {
                        this.$message.success(res.data)
                        this.getTableData()
                    })
            })
            .catch(() => {})
        },
        /**
         * 发送请求至服务器
         */
        handleSendRequest: async function () {
            this.dialog.form.Cover = await getImageBase64(this.dialog.form.Cover)
            if (this.dialog.form.ID) {
                for (let i = 0; i < this.dialog.form.Imgs.length; i++) {
                    this.dialog.form.Imgs[i].Src = await getImageBase64(this.dialog.form.Imgs[i].Src)
                }
                updateProducts(this.dialog.form.ID, this.dialog.form)
                    .then(res => {
                        this.$message.success(res.data)
                        this.getTableData()
                        this.dialog.show = false
                        this.clear(this.dialog.form)
                    })
            } else {
                createProducts(this.dialog.form)
                    .then(res => {
                        this.$message.success(res.data)
                        this.getTableData()
                        this.dialog.show = false
                        this.clear(this.dialog.form)
                    })
            }
        },
        clear: function (obj) {
            Object.keys(obj).forEach(key => {
                obj[key] = ''
            })
        },
        /**
         * 获取产品类目名称
         */
        getProductsName: function (row) {
            let result = ''
            this.types.forEach(item => {
                if (item.ID == row.ID) result = item.Name
            })
            return result
        },
        /**
         * 取消新建产品
         */
        handleCancel: function () {
            this.dialog.show = false
        },
        /**
         * 点击选择图片上传
         */
        handleClickInput: function () {
            this.$refs.coverInput.click()
        },
        /**
         * 选择完图片后进行上传
         */
        handleCoverChange: function () {
            const file = this.$refs.coverInput.files[0]
            let reader = new FileReader(), that = this
            reader.onload = function () {
                that.dialog.form.Cover = reader.result
                that.$refs.coverInput.value = ''
            }
            reader.readAsDataURL(file)
        },
        /**
         * 点击删除Cover
         */
        handleDeleteImage: function () {
            this.dialog.form.Cover = ''
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
                that.dialog.form.Imgs.push({
                    Src: reader.result
                })
                that.$refs.swiperImg.value = ''
            }
            reader.readAsDataURL(file)
        },
        /**
         * 删除 swiepr 图片
         * @param {*} index
         */
        handleDeleteSwiepr: function (index) {
            this.dialog.form.Imgs.splice(index, 1)
        },
        /**
         * 获取列表数据
         */
        getTableData: function () {
            getProducts(this.table.current)
                .then(res => {
                    res.data.list.forEach(item => {
                        item.show = false
                    })
                    this.table.data = res.data.list
                    this.table.total = res.data.pageTotal
                })
        },
        /**
         * 获取列表数据
         */
        getProductGroup: function () {
            getProductGroup()
                .then(res => {
                    let list = []
                    getRow(res.data, list)
                    function getRow(list, result) {
                        list.forEach(item => {
                            item.Children && item.Children.length !== 0 && getRow(item.Children, result)
                            result.push(item)
                        })
                    }
                    this.types = list
                })
        },
        /**
         * 获取型号
         * @param {*} id
         */
        getModels: function (id) {
            getModels(id, 1)
                .then(res => {
                    this.models = res.data
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.productSetting {
    width: 100%;
    box-sizing: border-box;
    .btns {
        text-align: center;
        margin-top: 30px;
        padding-top: 20px;
    }
    .normal {
        text-align: left;
        margin-top: 0;
        margin-bottom: 20px;
    }
    .content {
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        .footer {
            text-align: right;
            padding: 20px 0;
            padding-bottom: 0;
        }
    }
    .create {
        width: 100%;
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 20px;
        z-index: 2;
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
    }
}
</style>