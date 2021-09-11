import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './common.scss'

import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.use(elementUI)

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const option = {
	placeholder: "请填写...",
	modules: {
		toolbar: [
			["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
			["blockquote", "code-block"], // 引用  代码块
			[{ header: 1 }, { header: 2 }], // 1、2 级标题
			[{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
			[{ script: "sub" }, { script: "super" }], // 上标/下标
			[{ indent: "-1" }, { indent: "+1" }], // 缩进
			// [{'direction': 'rtl'}],                         // 文本方向
			[{ size: ["small", false, "large", "huge"] }], // 字体大小
			[{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
			[{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
			[{ font: [] }], // 字体种类
			[{ align: [] }], // 对齐方式
			["clean"], // 清除文本格式
			["link", "image"] // 链接、图片、视频
		], //工具菜单栏配置
	},
	readyOnly: false, //是否只读
	theme: 'snow', //主题 snow/bubble
}

Vue.use(VueQuillEditor, option)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
