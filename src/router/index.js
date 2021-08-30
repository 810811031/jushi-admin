import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'App',
		redirect: '/login'
	},	
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
	},
	{
		path: '/main',
		name: 'Main',
		component: () => import(/* webpackChunkName: "main" */ '@/views/Main'),
		children: [
			{
				path: 'global-setting',
				name: 'GlobalSetting',
				component: () => import(/* webpackChunkName: "GlobalSetting" */ '@/views/GlobalSetting'),
				meta: { title: '站点设置', icon: 'el-icon-s-tools' }
			},
			{
				path: 'menu-setting',
				name: 'MenuSetting',
				component: () => import(/* webpackChunkName: "MenuSetting" */ '@/views/MenuSetting'),
				meta: { title: '菜单设置', icon: 'el-icon-menu' }
			},
			{
				path: 'banner-setting',
				name: 'BannerSetting',
				component: () => import(/* webpackChunkName: "BannerSetting" */ '@/views/BannerSetting'),
				meta: { title: '首页banner设置', icon: 'el-icon-s-platform' }
			},
			{
				path: 'product-setting',
				name: 'ProductSetting',
				component: () => import(/* webpackChunkName: "ProductSetting" */ '@/views/ProductSetting'),
				meta: { title: '产品设置', icon: 'el-icon-s-order' }
			},
			{
				path: 'product-group-setting',
				name: 'ProductGroupSetting',
				component: () => import(/* webpackChunkName: "ProductGroupSetting" */ '@/views/ProductGroupSetting'),
				meta: { title: '产品类目管理', icon: 'el-icon-collection' }
			},
			{
				path: 'product-type-setting',
				name: 'ProductTypeSetting',
				component: () => import(/* webpackChunkName: "ProductTypeSetting" */ '@/views/ProductTypeSetting'),
				meta: { title: '产品型号管理', icon: 'el-icon-notebook-2' }
			},
			{
				path: 'programme-setting',
				name: 'ProgrammeSetting',
				component: () => import(/* webpackChunkName: "ProgrammeSetting" */ '@/views/ProgrammeSetting'),
				meta: { title: '解决方案设置', icon: 'el-icon-s-claim' }
			},
			{
				path: 'self-setting',
				name: 'selfSetting',
				component: () => import(/* webpackChunkName: "selfSetting" */ '@/views/selfSetting'),
				meta: { title: '自定义页面设置', icon: 'el-icon-s-operation' }
			},
			{
				path: 'job-setting',
				name: 'JobSetting',
				component: () => import(/* webpackChunkName: "JobSetting" */ '@/views/JobSetting'),
				meta: { title: '发布招聘设置', icon: 'el-icon-suitcase-1' }
			}
		]
	}
]

const router = new VueRouter({
  routes
})

export default router
