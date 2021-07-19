import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './pay.scss'

export default class Pay extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      addressData:{},
      payData:[],
      totalNum:0,
      totalPrice:0
    }
  }

  config = {
    navigationBarTitleText: '支付'
  }

  componentWillMount () {
    let payData = Taro.getStorageSync("cart").filter(item => { return item.checked===true })
    const addressData = Taro.getStorageSync("address")
    console.log('需要支付是商品',payData)
    console.log("选择的配送地址",addressData)
    let totalPrice = 0
    let totalNum = 0
    payData.forEach(item => {
      totalPrice += item.number*item.goods_price
      totalNum += item.number
    })


    this.setState({
      addressData,
      payData,
      totalPrice,
      totalNum
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 微信支付
  // 1、先判断本地存储中有没有token
  // 2、没有的话就跳转到授权页面  进行获取token
  // 3、有token  就进行正常逻辑
  gotoPay(){
    // 1、拿token
    const token = Taro.getStorageSync("token")
    // 2、判断
    if(!token){
      Taro.navigateTo({
        url:"/pages/auth/auth"
      })
      return
    }
    console.log("存在token，代码继续走")
    
  }

  render () {
    const { addressData, payData, totalPrice, totalNum } = this.state
    return (
      <View className='pay'>
        <View className="myAddress">
          <View className="title">配送地址</View>
          <View className="user">
            <Text className="text1">{addressData.userName}</Text>
            <Text className="text2">{addressData.telNumber}</Text>
          </View>
          <View className="address">
            {addressData.provinceName}{addressData.cityName}{addressData.countyName}{addressData.detailInfo}
          </View>
        </View>

        <View className="title">需要支付的商品详情</View>

        {
          payData.map((item,index) => (
            <View className="goodsDetail">
              <View className="goodsDetai_img">
                <Image src={ item.goods_small_logo }></Image>
              </View>
              <View className="goodsDetail_content">
                <View className="content_title">{ item.goods_name }</View>
                <View className="content_price">
                  <Text className="left">￥ { item.goods_price }</Text>
                  <Text className="right">× { item.number }</Text>
                </View>
              </View>
            </View>
          ))
        }

        <View className="footer">
          <View className="total">合计:<Text>￥ {totalPrice}</Text></View>
          <View className="right" onClick={this.gotoPay.bind(this)}>支付({totalNum})</View>
        </View>

      </View>



    )
  }
}
