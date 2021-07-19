import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

// 导入search组件
import search from "../../components/search/search"
import swiper from "../../components/swiper/swiper"
import conten from "../../components/content/content"

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { 
    // <Text className="iconfont icon-gouwuchekong" ></Text>
  }

  render () {
    return (
      <View className='index'>
        <search></search>
        <swiper></swiper>
		<conten></conten>
      </View>
    )
  }
}
