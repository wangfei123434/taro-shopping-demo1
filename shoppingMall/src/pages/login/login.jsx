import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './login.scss'

export default class Login extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    Taro.login({
      success:res => {
        console.log("code",res.code)
      }
    })
  }

  componentDidHide () { }

  // 获取用户信息
  getUserInfoFun(e){
    console.log(e.detail)
    const { userInfo } = e.detail
    Taro.setStorageSync("userInfo",userInfo)
    Taro.navigateBack({
      delta: 1
    })
    // Taro.switchTab({url:"/pages/mine/mine"})
  }

  getPhoneNumber(e){
    console.log("phone",e.detail)
  }

  render () {
    return (
      <View className='login'>
        <Button type='primary' open-type="getUserInfo" onGetUserInfo={this.getUserInfoFun.bind(this)}>登录</Button>
        <Button open-type="getPhoneNumber" bindgetphonenumber={this.getPhoneNumber}>获取手机号</Button>
      </View>
    )
  }
}
