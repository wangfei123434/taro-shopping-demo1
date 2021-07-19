import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

import 'taro-ui/dist/style/index.scss' // taro-ui组件样式 全局引入一次即可

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/sort/sort',
      'pages/cart/cart',
      'pages/mine/mine',
      'pages/goods_list/goods_list',
	    'pages/goodsDetail/goodsDetail',
      'pages/pay/pay',
      'pages/auth/auth',
      'pages/login/login'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffee78',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#56b8fe",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/index/index',
        iconPath: "./icons/hema.png",
        selectedIconPath: "./icons/hema-sel.png",
        text: "首页"
      }, {
        pagePath: "pages/sort/sort",
        iconPath: "./icons/sort.png",
        selectedIconPath: "./icons/sort-sel.png",
        text: "分类"
      }, {
        pagePath: "pages/cart/cart",
        iconPath: "./icons/shopping.png",
        selectedIconPath: "./icons/shopping-sel.png",
        text: "购物车"
      }, {
        pagePath: "pages/mine/mine",
        iconPath: "./icons/mine.png",
        selectedIconPath: "./icons/mine-sel.png",
        text: "个人"
      }]
    }

  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
