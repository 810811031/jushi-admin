import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

/**
 * 判断当前环境 是否添加代理前缀
 */
export const host = process.env.NODE_ENV === 'development' ? '/api' : ''

/**
 * 将图片装换为 base64 码
 * @param { string } Src
 */
export function getImageBase64(path) {
    if (path == '') return ''
    if (path.indexOf('base64') > -1) {
        return path
    }
    path = host + path
    return new Promise(resolve => {
        var img = new Image();  
        img.src = path;  
        img.onload = function(){  
            //默认按比例压缩  
            var w = this.width,  
                h = this.height; 
            var quality = 1; // 默认图片质量为0.7  
            
            //生成canvas  
            var canvas = document.createElement('canvas');  
            var ctx = canvas.getContext('2d');  
            
            // 创建属性节点  
            canvas.setAttribute("width", w);  
            canvas.setAttribute("height", h);
                    
            ctx.drawImage(this, 0, 0, w, h);  
            // quality值越小，所绘制出的图像越模糊  
            var base64 = canvas.toDataURL('image/jpeg', quality);  
            // 回调函数返回base64的值  
            resolve(base64)
        }
    })
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * 如果当前为刷新则从本地获取 token
 */
const token = sessionStorage.getItem('token')
if (token) addToken(token)

/**
 * 请求返回拦截器
 */
axios.interceptors.response.use(
    response => {
        // 如果返回码为 9001 则跳转至登录页
        if (response.data.code == 9001) {
            router.push('/login')
        }
        // 弹出错误信息
        if (response.data.code == 2001) {
            Message.error(response.data.errMsg)
            return 
        }
        return response.data
    },
    error => {
        return Promise.reject(error.response.data)
    }
)

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error.response.data)
    }
)

/**
 * 登录
 * @param {*} param 
 */
export function Login (param) {
    return axios.post(host + '/manage/login', param)
}

/**
 * 添加 token
 * @param {*} token 
 */
export function addToken(token) {
    axios.defaults.headers.common['Authorization'] = token
}

/**
 * 修改密码
 * @param {*} param 
 */
export function EditPassword(param) {
    return axios.post(host + '/manage/password', param)
}

/**
 * 获取站点基本信息
 */
export function getBaseInfo() {
    return axios.get(host + '/manage/site')
}

/**
 * 保存站点基本信息
 */
export function saveBaseInfo(param) {
    return axios.post(host + '/manage/site', param)
}

// --------------------------------------    banner 管理

/**
 * 获取 banner 图片
 */
export function getBannerList() {
    return axios.get(host + '/manage/banner')
}

/**
 * 新建 banner 图
 * @param {*} param 
 */
export function createBanner(param) {
    return axios.post(host + '/manage/banner', param)
}

/**
 * 更新 banner
 * @param {*} id 
 * @param {*} param 
 */
export function updateBanner(id, param) {
    return axios.post(host + '/manage/banner/' + id, param)
}

/**
 * 删除 banner 
 * @param {*} id 
 */
export function deleteBanner(id) {
    return axios.delete(host + '/manage/banner/' + id)
}

// --------------------------------------    菜单管理

/**
 * 获取菜单列表
 * @returns 
 */
export function getMenuList() {
    return axios.get(host + '/manage/menus')
}

/**
 * 新建菜单
 * @param {*} param 
 * @returns 
 */
export function createMenu(param) {
    return axios.post(host + '/manage/menu', param)
}

/**
 * 更新菜单
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateMenu(id, param) {
    return axios.post(host + '/manage/menu/' + id, param)
}

/**
 * 调整菜单顺序
 * @param {*} id 
 * @param {*} param 
 */
export function changeMenuIndex(id, param) {
    return axios.post(host + '/manage/menu-num/' + id, param)
}

/**
 * 删除菜单
 * @param {*} id 
 * @returns 
 */
export function deleteMenu(id) {
    return axios.delete(host + '/manage/menu/' + id)
}

// --------------------------------------    招聘管理

/**
 * 获取招聘列表
 * @param { * } param 
 * @returns 
 */
export function getOffers(param) {
    return axios.get(host + `/manage/offers?page=${ param }`)
}

/**
 * 新增招聘岗位
 * @param { object } param 
 * @returns 
 */
export function createOffers(param) {
    return axios.post(host + '/manage/offer', param)
}

/**
 * 修改招聘岗位
 * @param {*} id 
 * @param {*} param 
 */
export function updateOffers(id, param) {
    return axios.post(host + '/manage/offer/' + id, param)
}

/**
 * 删除招聘岗位
 * @param {*} id 
 * @returns 
 */
export function deleteOffers(id) {
    return axios.delete(host + '/manage/offer/' + id)
}

// --------------------------------------    产品类目管理 

/**
 * 获取产品类目信息
 * @returns 
 */
export function getProductGroup() {
    return axios.get(host + '/manage/categories')
}

/**
 * 创建产品类目管理
 * @param {*} param 
 * @returns 
 */
export function createProductGroup(param) {
    return axios.post(host + '/manage/category', param)
}

/**
 * 更新产品类目管理
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProductGroup(id, param) {
    return axios.post(host + '/manage/category/' + id, param)
}

/**
 * 修改类目SEO配置
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function changeProductGroupConfig(id, param) {
    return axios.post(host + '/manage/category-seo/' + id, param)
}

/**
 * 删除产品类目
 * @param {*} id 
 * @returns 
 */
export function deleteProductGroup(id) {
    return axios.delete(host + '/manage/category/' + id)
}

// --------------------------------------     解决方案

/**
 * 获取解决方案
 * @param {*} param 
 * @returns 
 */
export function getProgram(param) {
    return axios.get(host + '/manage/program', param)
}

/**
 * 新增解决方案
 * @param {*} param 
 * @returns 
 */
export function createProgram(param) {
    return axios.post(host + '/manage/program', param)
}

/**
 * 更新解决方案
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProgram(id, param) {
    return axios.post(host + '/manage/program/' + id, param)
}

/**
 * 更新解决方案排序
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProgramIndex(id, param) {
    return axios.post(host + '/manage/program-num/' + id, param)
}

/**
 * 更新解决方案 seo
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProgramSeo(id, param) {
    return axios.post(host + '/manage/program-seo/' + id, param)
}

/**
 * 删除解决方案
 * @param {*} id 
 * @returns 
 */
export function deleteProgram(id) {
    return axios.delete(host + '/manage/program/' + id)
}

// --------------------------------------     自定义页面管理

/**
 * 获取自定义页面列表
 * @param {*} param 
 * @returns 
 */
export function getCases(page, menuId) {
    return axios.get(host + `/manage/cases?page=${ page }&menuID=${ menuId }`)
}

/**
 * 创建自定义页面
 * @param {*} param 
 * @returns 
 */
export function createCases(menuId, param) {
    return axios.post(host + '/manage/case-add/' + menuId, param)
}

/**
 * 更新自定义界面信息
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateCases(id, param) {
    return axios.post(host + '/manage/case-save/' + id, param)
}

/**
 * 更新自定义页面的位置顺序
 * @param {*} id  
 * @param {*} param 
 * @returns 
 */
export function updateCasesIndex(id, param) {
    return axios.post(host + '/manage/cases-num/' + id, param)
}

/**
 * 更新自定义页面的 seo 信息
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateCasesSeo(id, param) {
    return axios.post(host + '/manage/cases-seo/' + id, param)
}

/**
 * 删除自定义界面
 * @param {*} id 
 * @returns 
 */
export function deleteCases(id) {
    return axios.delete(host + '/manage/case/' + id)
}

// --------------------------------------     产品管理

/**
 * 获取产品列表
 * @param {*} param 
 * @returns 
 */
export function getProducts(page) {
    return axios.get(host + `/manage/products?page=${ page }`)
}

/**
 * 创建产品
 * @param {*} param 
 * @returns 
 */
export function createProducts(param) {
    return axios.post(host + '/manage/product', param)
}

/**
 * 更新产品
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProducts(id, param) {
    return axios.post(host + '/manage/product/' + id, param)
}

/**
 * 更新产品展示顺序
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProductsIndex(id, param) {
    return axios.post(host + '/manage/product-num/' + id, param)
}

/**
 * 更新产品页 seo
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProductsSeo(id, param) {
    return axios.post(host + '/manage/product-seo/' + id, param)
}

/**
 * 删除产品
 * @param {*} id 
 * @returns 
 */
export function deleteProducts(id) {
    return axios.delete(host + '/manage/product/' + id)
}

// --------------------------------------     产品型号管理

/**
 * 获取型号列表
 * @param {*} param 
 * @returns 
 */
export function getModels(category_id, page) {
    return axios.get(host + `/manage/models?categoryID=${ category_id }&page=${ page }`)
}

/**
 * 新建型号
 * @param {*} param 
 * @returns 
 */
export function createModels(param) {
    return axios.post(host + '/manage/model', param)
}

/**
 * 更新型号信息
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateModels(id, param) {
    return axios.post(host + '/manage/model/' + id, param)
}

/**
 * 删除型号信息
 * @param {*} id 
 * @returns 
 */
export function deleteModels(id) {
    return axios.delete(host + '/manage/model/' + id)
}