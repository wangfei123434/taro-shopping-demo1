import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './auth.scss'

// 导入封装改造过后的的获取用户信息方法
import  { login }  from "../../utils/utils.js"

// 导入封装的请求方法request
import  {request}  from "../../request/request.js"

export default class Auth extends Component {

  config = {
    navigationBarTitleText: '授权'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 获取用户信息
  async getUserInfoFun(e){
    // 获取小程序登陆后的token值
    console.log(e)
    // 1、用户信息
    const { encryptedData, rawData, iv, signature } = e.detail

    // Taro.login({
    //   success: (res) => {
    //     console.log(res)   //code值
    //     const { code } = res
    //   }
    // })

    // 改造后Promise形式  方法前加了async
    // 2、获取用户登陆成功后的code
    const { code } = await login()
    console.log("code",code)
    const loginParams = { encryptedData, rawData, iv, signature, code }
    // 3、发送请求  获取用户的token值  个人测试账号没法返回值 400状态码
    console.log("接口需要的所有参数",loginParams)
    const result = await request({
      url:"/users/wxlogin",
      data:loginParams,
      method:"post"
    })
    console.log("请求返回值",result)
    Taro.showToast({
      title: '剁手成功',
      icon: 'success',
      duration: 5000
    })
    setTimeout(function() {
      Taro.switchTab({url:"/pages/mine/mine"})
    }, 3000);
  }

  render () {
    return (
      <View className='auth'>
        <Button open-type="getUserInfo" onGetUserInfo={this.getUserInfoFun.bind(this)}>获取授权</Button>
      </View>
    )
  }
}
