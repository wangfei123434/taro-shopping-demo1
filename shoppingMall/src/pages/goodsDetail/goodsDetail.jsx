import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import './goodsDetail.scss'

// 导入封装的请求方法request
import  {request}  from "../../request/request.js"

// icon图标  ui库
import { AtIcon } from 'taro-ui'

export default class Goodsdetail extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      goodsDetailData:{}
    }
  }

  // 详情页面接口要的参数
  queryParameter = {
    goods_id:""
  }

  // 商品对象
  goodsInfo = {}

  config = {
    navigationBarTitleText: '商品详情'
  }

  componentWillMount () {
    console.log("列表跳详情页传递的参数",this.$router.params)
    this.queryParameter.goods_id = this.$router.params.goods_id
    this.getGoodsDetail()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 获取当前点击的商品详情信息
  async getGoodsDetail(){
    const result = await request({url:"/goods/detail",data:this.queryParameter})
    console.log("商品详情页res",result)
    // 将请求回来的商品数据赋值给全局定义的商品信息对象
    this.goodsInfo = result
    this.setState({
      goodsDetailData:result
    })
  }

  // 点击轮播图放大图片
  magnifyFun(index){
    // 1、构造需要预览的图片数组
    const myUrls = this.goodsInfo.pics.map((item) => {
      return item.pics_mid
    })
    console.log("myUrls",myUrls)
    Taro.previewImage({
      current: myUrls[index], // 当前显示图片的http链接
      urls: myUrls // 需要预览的图片http链接列表
    })
  }

  // 加入购物车   获取本地存储数据（数组、对象）
  // 先判断当前商品是否已经存在购物车里面
  // 如果有就数量加  然后重新赋值到本地将其覆盖
  // 如果没有就往购物车数据添加一个新元素，并带上购买数量属性
  addCartFun(){
    // 1、获取本地存储中的购物车数组
    let cart = Taro.getStorageSync("cart")||[]
    // 2、判断 商品对象是否存在
    let index = cart.findIndex((v) => v.goods_id===this.goodsInfo.goods_id)
    if(index === -1){
      // 不存在
      this.goodsInfo.number = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    }else{
      // 已经存在
      cart[index].number ++
    }
    // 3、将购物车数据重新添加到本地存储
    Taro.setStorageSync("cart", cart)
    // 4、弹窗友好提示
    Taro.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 2000,
      mask:true        //防止用户手抖  有病疯狂点击
    })
  }

  // 跳转购物车
  gotoCartFun(){
    Taro.switchTab({
      url:'/pages/cart/cart'
    })
  }

  render () {
    let { goodsDetailData } = this.state
    return (
      <View className='goodsDetail'>
        <View className="swiper">
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            {
              goodsDetailData.pics.map((item,index) => (
                <SwiperItem key={ index } onClick={this.magnifyFun.bind(this,index)}>
                  <View className='demo-text-1'>
                    <Image src={ item.pics_mid }></Image>
                  </View>
                </SwiperItem>
              ))
            }
          </Swiper>
        </View>

        <View className="detailMs">
          <View className="goods_price"> ￥ { goodsDetailData.goods_price }</View>
          <View className="goods_name">
            <View className="name">{ goodsDetailData.goods_name }</View>
            <View className="love">
              <AtIcon value='star' size='30' color='#ccc'></AtIcon>
              <View>收藏</View>
            </View>
          </View>
        </View>

        <View className="goods_introduce">
          <View className="title">图文详情</View>
          <RichText nodes={goodsDetailData.goods_introduce} />
        </View>

        <View className="footer">
          <View className="footer_item">
            <View className="iconfont icon-lianxikefu"></View>
            <Text>联系客服</Text>
            <Button open-type="contact"></Button>
          </View>
          <View className="footer_item">
            <View className="iconfont icon-share_icon"></View>
            <Text>分享</Text>
            <Button open-type="share"></Button>
          </View>
          <View className="footer_item" onClick={this.gotoCartFun.bind(this)}>
            <View className="iconfont icon-gouwuchezhengpin"></View>
            <Text>购物车</Text>
          </View>
          <View className="footer_item" onClick={this.addCartFun.bind(this)}>
            <Text>加入购物车</Text>
          </View>
          <View className="footer_item">
            <Text>立即购买</Text>
          </View>


        </View>


      </View>
    )
  }
}
