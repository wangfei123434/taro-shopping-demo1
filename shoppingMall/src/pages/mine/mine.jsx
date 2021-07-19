import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './mine.scss'

export default class Mine extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      userInfo:{}
    }
  }

  config = {
    navigationBarTitleText: '个人'
  }

  componentWillMount () {
    const userInfo = Taro.getStorageSync("userInfo")
    this.setState({
      userInfo
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    // Taro.checkSession({
    //   success: function() {
    //     console.log("session_key 未过期")
    //     //session_key 未过期，并且在本生命周期一直有效
    //   },
    //   fail: function() {
    //     console.log("session_key 已经过期")
    //     // session_key 已经失效，需要重新执行登录流程
    //     // 登录
    //     // this.gotologin()
    //   }
    // })
  }

  componentDidHide () { }

  gotoLogin(){
    Taro.navigateTo({url:"/pages/login/login"})
  }

  render () {
    const { userInfo } = this.state
    return (
      <View className='mine'>
        {
          userInfo.avatarUrl?(
            <View className="userInfo">
              <Image className="big_img" src={ userInfo.avatarUrl }></Image>
              <View className="small_img">
                <Image src={ userInfo.avatarUrl }></Image>
                <View className="name">{ userInfo.nickName }</View>
              </View>
            </View>
          ):(<Button onClick={this.gotoLogin.bind(this)}>个人页面登录</Button>)
        }

        <View className="nav1">
          <View className="nav1_item">
            <View>0</View>
            <View>收藏的店铺</View>
          </View>
          <View className="nav1_item">
            <View>0</View>
            <View>收藏的商品</View>
          </View>
          <View className="nav1_item">
            <View>0</View>
            <View>关注的商品</View>
          </View>
          <View className="nav1_item">
            <View>0</View>
            <View>我的足迹</View>
          </View>
        </View>

        <View className="mine_order">
          <View>我的订单</View>
          <View className="iconfont icon-quanbudingdan1"></View>
        </View>
      </View>
    )
  }
}
