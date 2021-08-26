import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

/**
 * 判断当前环境 是否添加代理前缀
 */
const host = process.env.NODE_ENV === 'development' ? '/api' : ''

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
    return axios.post(host + '/manage/banner/' + id)
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

// --------------------------------------     解决方案

/**
 * 获取解决方案
 * @param {*} param 
 * @returns 
 */
export function getProgram(param) {
    return axios.get('/manage/program', param)
}

/**
 * 新增解决方案
 * @param {*} param 
 * @returns 
 */
export function createProgram(param) {
    return axios.post('/manage/program', param)
}

/**
 * 更新解决方案
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProgram(id, param) {
    return axios.post('/manage/program/' + id, param)
}

/**
 * 更新解决方案排序
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProgramIndex(id, param) {
    return axios.post('/manage/program-num/' + id, param)
}

/**
 * 更新解决方案 seo
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProgramSeo(id, param) {
    return axios.post('/manage/program-seo/' + id, param)
}

/**
 * 删除解决方案
 * @param {*} id 
 * @returns 
 */
export function deleteProgram(id) {
    return axios.delete('/manage/program/' + id)
}

// --------------------------------------     自定义页面管理

/**
 * 获取自定义页面列表
 * @param {*} param 
 * @returns 
 */
export function getCases(param) {
    return axios.get('/manage/cases', param)
}

/**
 * 创建自定义页面
 * @param {*} param 
 * @returns 
 */
export function createCases(param) {
    return axios.post('/manage/cases', param)
}

/**
 * 更新自定义界面信息
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateCases(id, param) {
    return axios.post('/manage/cases/' + id, param)
}

/**
 * 更新自定义页面的位置顺序
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateCasesIndex(id, param) {
    return axios.post('/manage/cases-num/' + id, param)
}

/**
 * 更新自定义页面的 seo 信息
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateCasesSeo(id, param) {
    return axios.post('/manage/cases-seo/' + id, param)
}

/**
 * 删除自定义界面
 * @param {*} id 
 * @returns 
 */
export function deleteCases(id) {
    return axios.delete('/manage/cases/' + id)
}

// --------------------------------------     产品管理

/**
 * 获取产品列表
 * @param {*} param 
 * @returns 
 */
export function getProducts(param) {
    return axios.get('/manage/products', param)
}

/**
 * 创建产品
 * @param {*} param 
 * @returns 
 */
export function createProducts(param) {
    return axios.post('/manage/product', param)
}

/**
 * 更新产品
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProducts(id, param) {
    return axios.post('/manage/product/' + id, param)
}

/**
 * 更新产品展示顺序
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProductsIndex(id, param) {
    return axios.post('/manage/product-num/' + id, param)
}

/**
 * 更新产品页 seo
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateProductsSeo(id, param) {
    return axios.post('/manage/product-seo/' + id, param)
}

/**
 * 删除产品
 * @param {*} id 
 * @returns 
 */
export function deleteProducts(id) {
    return axios.delete('/manage/product/' + id)
}

// --------------------------------------     产品型号管理

/**
 * 获取型号列表
 * @param {*} param 
 * @returns 
 */
export function getModels(param) {
    return axios.get('/manage/models', param)
}

/**
 * 新建型号
 * @param {*} param 
 * @returns 
 */
export function createModels(param) {
    return axios.post('/manage/model', param)
}

/**
 * 更新型号信息
 * @param {*} id 
 * @param {*} param 
 * @returns 
 */
export function updateModels(id, param) {
    return axios.post('/manage/model/' + id, param)
}

/**
 * 删除型号信息
 * @param {*} id 
 * @returns 
 */
export function deleteModels(id) {
    return axios.delete('/manage/model/' + id)
}