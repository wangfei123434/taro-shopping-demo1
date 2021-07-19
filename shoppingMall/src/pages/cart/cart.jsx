import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './cart.scss'

// 导入封装改造过后的的获取地址方法
import  { getSetting, chooseAddress, openSetting }  from "../../utils/utils.js"

export default class Cart extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      address:{},
      cartData:[],
      allChecked:false,
      totalPrice:0,
      totalNum:0
    }
  }

  config = {
    navigationBarTitleText: '购物车'
  }

  componentWillMount () {


  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    // 1、获取本地存储的收货地址信息
    const address = Taro.getStorageSync("address")
    // 获取本地存储中购物车的数据
    const cartData = Taro.getStorageSync("cart")||[]
    // console.log("cartData",cartData.length)
    // 计算全选  记住：空数组调用every方法返回的也是true（不合理）  如果本地数据为空的话直接赋值false
    // const allChecked = cartData.length?cartData.every((item) => { return item.checked}):false
    // console.log("全选",allChecked)

    // //计算总价以及总数量
    // let totalPrice = 0
    // let totalNum = 0
    // cartData.forEach(item => {
    //   if(item.checked){
    //     totalPrice += item.number*item.goods_price
    //     totalNum += item.number
    //   }
    // })

    // this.setState({
    //   address,
    //   cartData,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })

    // 上面计算代码的封装方法执行
    this.computersFun()

  }

  componentDidHide () { }


  // 添加收货地址 ====  分析
  // 调用taro内置api  获取用户收货地址
  // 获取用户对小程序所授予 获取地址的权限状态  scope   authSetting    scope.address
  //     1、点击确定：scope=true        直接调用
  //     2、用户从来没有调用过收货地址api  scope=undefined    直接调用
  //     3、点击取消：scope=false
  //        1、诱导用户自己先打开授权设置  当用户重新给予获取地址时
  //        2、获取收货地址
  //     4、将拿到的地址存到本地存储
  async addressFun(){
    try {
      // 1、调用taro内置api  获取用户收货地址    ******
      // Taro.chooseAddress({
      //   success: (res) => {
      //     console.log(res)
      //   }
      // })

      // 获取用户 是否授权  获取用户地址
      // Taro.getSetting({
      //   success: function (res) {
      //     console.log(res)
      //     // res.authSetting = {
      //     //   "scope.userInfo": true,
      //     //   "scope.userLocation": true
      //     // }
      //   }
      // })

      // **************  改造1  最原始版本 ****************
      // 1、获取权限状态
      // Taro.getSetting({
      //   success: (res1) => {
      //     console.log("res1",res1)
      //     const scopeAddress = res1.authSetting["scope.address"]   //用户授权状态
      //     // 2、判断  如果状态为true或者是undefined的时候就直接调用api获取地址
      //     if(scopeAddress===true||scopeAddress===undefined){
      //       Taro.chooseAddress({
      //         success: (res2) => {
      //           console.log("res2",res2)
      //         }
      //       })
      //     }else{
      //       // 3、用户之前拒绝过授权   调用api诱导用户重新设置授权
      //       Taro.openSetting({
      //         success: function (res3) {
      //           console.log("res3",res3.authSetting)
      //           Taro.chooseAddress({
      //             success: (res4) => {
      //               console.log("res4",res4)
      //             }
      //           })
      //         }
      //       })
      //     }
      //   }
      // })

      // // ************   改造2   ************
      // // 1、获取权限状态
      // const res1 = await getSetting();
      // const scopeAddress = res1.authSetting["scope.address"];
      // // 2、判断权限状态
      // if(scopeAddress===true||scopeAddress===undefined){
      //   // 3、调用获取收货地址的API
      //   const res2 = await chooseAddress();
      //   console.log("直接获取的用户地址",res2)
      // }else{
      //   // 调用api诱导用户重新设置授权
      //   await openSetting();
      //   // 4、重新调用获取地址API
      //   const res2 = await chooseAddress();
      //   console.log("重新获取的用户地址",res2)
      // }

      // ************   改造3  最终版本   ************
      // 1、获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2、判断权限状态
      if(scopeAddress===false){
        // 3、调用api诱导用户重新设置授权
        await openSetting();
      }
      // 4、重新调用获取地址API
      const address = await chooseAddress();
      console.log("直接获取的用户地址",address)
      // 将地址存到本地
      Taro.setStorageSync("address", address)
      this.setState({
        address
      })
    } catch(err){
      console.log(err)
    }
  }

  // 设置购物车状态，以及所有计算的方法
  computersFun(){
    const cartData = Taro.getStorageSync("cart")||[]
    // 计算全选  记住：空数组调用every方法返回的也是true（不合理）  如果本地数据为空的话直接赋值false
    const allChecked = cartData.length?cartData.every((item) => { return item.checked}):false
    console.log("全选",allChecked)
    //计算总价以及总数量
    let totalPrice = 0
    let totalNum = 0
    cartData.forEach(item => {
      if(item.checked){
        totalPrice += item.number*item.goods_price
        totalNum += item.number
      }
    })
    this.setState({
      cartData,
      totalPrice,
      totalNum,
      allChecked
    })
  }


  // 单个商品选中
  checkedFun(item,index){
    // 获取被修改的商品对象
    const cartData = Taro.getStorageSync("cart")||[]
    // console.log(cartData[index])
    // console.log(item,index)
    cartData[index].checked = !cartData[index].checked

    Taro.setStorageSync("cart",cartData)
    // console.log("cartData",cartData.length)
    // 计算全选  记住：空数组调用every方法返回的也是true（不合理）  如果本地数据为空的话直接赋值false
    // const allChecked = cartData.length?cartData.every((item) => { return item.checked}):false
    // console.log("全选",allChecked)

    // //计算总价以及总数量
    // let totalPrice = 0
    // let totalNum = 0
    // cartData.forEach(item => {
    //   if(item.checked){
    //     totalPrice += item.number*item.goods_price
    //     totalNum += item.number
    //   }
    // })
    // this.setState({
    //   cartData,
    //   totalPrice,
    //   totalNum,
    //   allChecked
    // })

    // 上面计算代码的封装方法执行
    this.computersFun()
  }

  // 购物车页面数量-
  reduceNumFun(item,index){
    console.log(index)
    let _this = this
    let {cartData} = this.state
    cartData[index].number --
    if(cartData[index].number < 1){
      cartData[index].number = 1
      Taro.showModal({
        title: '提示',
        content: '确定要删除此商品？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            cartData.splice(index,1)

            //计算总价以及总数量
            let totalPrice = 0
            let totalNum = 0
            cartData.forEach(item => {
              if(item.checked){
                totalPrice += item.number*item.goods_price
                totalNum += item.number
              }
            })

            _this.setState({
              cartData,
              totalPrice,
              totalNum
            })
            Taro.setStorageSync("cart",cartData)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    // return
    //计算总价以及总数量
    let totalPrice = 0
    let totalNum = 0
    cartData.forEach(item => {
      if(item.checked){
        totalPrice += item.number*item.goods_price
        totalNum += item.number
      }
    })
    this.setState({
      cartData,
      totalPrice,
      totalNum
    })
    Taro.setStorageSync("cart",cartData)
  }

  // 购物车页面数量+
  addNumFun(item,index){
    console.log(index)
    let {cartData} = this.state
    cartData[index].number ++
    //计算总价以及总数量
    let totalPrice = 0
    let totalNum = 0
    cartData.forEach(item => {
      if(item.checked){
        totalPrice += item.number*item.goods_price
        totalNum += item.number
      }
    })
    this.setState({
      cartData,
      totalPrice,
      totalNum
    })
    Taro.setStorageSync("cart",cartData)
  }

  // 全选   ***有bug**
  allCheckedFun(){
    // 1、拿data数据中的购物车数据以及全选状态
    let { cartData, allChecked } = this.state

    if(cartData.length===0){
      return
    }
    // 2、修改其全选的状态值   取反
    allChecked=!allChecked
    // 3、循环购物车中的checked值
    cartData.forEach(item => item.checked=allChecked)
    // 4、将修改后的值赋值给data中
    this.computersFun()

  }

  // 去结算
  gotoCloseFun(){
    let { address, cartData } = this.state
    const myChecked = cartData.length?cartData.some((item) => { return item.checked}):false
    if(!myChecked){
      Taro.showToast({
        title: '请勾选商品',
        icon: 'none',
        duration: 2000
      })
    }else{
      if(!address.userName){
        Taro.showToast({
          title: '请添加地址',
          icon: 'none',
          duration: 2000
        })
      }else{
        console.log("验证成功，可以跳转")
        Taro.navigateTo({
          url:"/pages/pay/pay"
        })
      }
    }

  }


  render () {
    const { address, cartData, totalPrice, totalNum } = this.state
    return (
      <View className='cart'>
        {
          cartData.length?(
            <View className="userMesg">
              {
                address.userName?
                (<View className="user">
                  <View className="name">
                    <Text className="name_i">{address.userName}</Text>
                    <Text className="phone">{address.telNumber}</Text>
                  </View>
                  <View className="address">{address.provinceName}{address.cityName}{address.countyName}{address.detailInfo}</View>
                </View>)
                :(<Button className='btn-max-w' plain type='primary' onClick={this.addressFun.bind(this)}>添加收货地址</Button>)
              }
            </View>
          ):null
        }

        {
          cartData.length?(<View className="tag">购物车</View>):null
        }

        {
          cartData.length?(
            <View className="content">
              {
                cartData.map((item,index) => (
                  <View className="cartContent" key={index}>
                    <View className="contentLeft">
                      <Checkbox checked={item.checked} onClick={this.checkedFun.bind(this,item,index)}>勾选</Checkbox>
                    </View>
                    <View className="contentImg">
                      <Image src={ item.goods_small_logo}></Image>
                    </View>
                    <View className="contentRight">
                      <View className="name">{ item.goods_name }</View>
                      <View className="operation">
                        <View className="price">￥{ item.goods_price }</View>
                        <View className="num">
                          <Text onClick={this.reduceNumFun.bind(this,item,index)}>-</Text>
                          <Text>{ item.number }</Text>
                          <Text onClick={this.addNumFun.bind(this,item,index)}>+</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              }
            </View>
          ):(<View className="catImg" style="margin-top:150px">
               <Image style="width:100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595579179769&di=ae2b30433fe259f44f9b32609f04c134&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2F687c72e4gy1fl2b8o5xukj20c80960sw.jpg"></Image>
            </View>)
        }


        {
          cartData.length?(
            <view className="totalBox" style="margin-top:80px">
              <View className="checkAll">
                <Checkbox value='全选' checked={ this.state.allChecked } onClick={this.allCheckedFun.bind(this)}>全选</Checkbox>
              </View>
              <View className="total">
                <View className="totalPrice">
                  合计:<Text>￥ {totalPrice}</Text>
                </View>
                <View>包含运费</View>
              </View>
              <Button onClick={this.gotoCloseFun.bind(this)} className='btn-max-w' plain type='primary' style="background:red;color:#fff">结算({totalNum})</Button>
            </view>
          ):null
        }


      </View>
    )
  }
}
