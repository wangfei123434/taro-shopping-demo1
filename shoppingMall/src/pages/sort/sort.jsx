import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './sort.scss'

// 导入search组件
import search from "../../components/search/search"

// 导入ui组件
import { AtTabs, AtTabsPane } from 'taro-ui'

// 导入封装的请求方法request
import  {request}  from "../../request/request.js"

export default class Sort extends Component {

  config = {
    navigationBarTitleText: '分类'
  }

  constructor () {
    super(...arguments)
    this.state = {
      leftNavData:[],
      rightContentData:[],
      current: 0,
    }
  }

  // 返回回来的数据
  returnData:[]

  componentWillMount () {
    // 发送请求之前判断本地存储中有没有旧的数据
    // 数据类型：{ time:Date.now(),data:[...] }
    // 没有的话就直接发送请求
    // 有的话判断有没有过期 没过期直接使用，过期了重新请求

    // 1、获取本地存储的内容  localityData本地存储的key值
    const localityData = Taro.getStorageSync('thisLocality')
    // 2、判断是否存在
    if(!localityData){
      // 不存在的话发送请求
      this.getSortData()
    }else{
      // 存在的话判断有没有过期  超过10s的话重新请求
      if(Data.now()-localityData.time>1000*10){
        // 已经过期  需要重新请求
        this.getSortData()
      }else{
        // 没有过期  不需要重新请求可以直接使用
        console.log("没有过期")
        this.returnData = localityData.data

        let leftNavData  = this.returnData.map((item) => {
           return item.cat_name
        })
        let newLeftNavData = []
        leftNavData.forEach((item) => {
          let obj = {}
          obj.title = item
          newLeftNavData.push(obj)
        })
        let rightContentData  = this.returnData
        // console.log("右边",rightContentData)
        this.setState({
          leftNavData:newLeftNavData,
          rightContentData
        })
      }
    }
    
    // 请求数据的时候显示加载中的小图标
    // Taro.showLoading({
    //   title: '加载中',
    // })
    // setTimeout(function () {
    //   Taro.hideLoading()
    // }, 2000)

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    // {
    //   leftNavData.map((item,index) => {
    //     return (
    //       <View>{ item }</View>
    //     )
    //   })
    // }
  }

  componentDidHide () { }

  // 获取左侧导航栏数据
  async getSortData(){
    let _this = this
    // request({
    //   url:"/categories"
    // }).then(result => {
    //   console.log("导航页res",result.data.message)
    //   this.returnData = result.data.message
    //   // 将数据存储到本地
    //   Taro.setStorageSync('localityData',{time:Date.now(),data:this.returnData})

    //   let leftNavData  = this.returnData.map((item) => {
    //      return item.cat_name
    //   })
    //   let newLeftNavData = []
    //   leftNavData.forEach((item) => {
    //     let obj = {}
    //     obj.title = item
    //     newLeftNavData.push(obj)
    //   })
    //   let rightContentData  = this.returnData
    //   console.log("右边",rightContentData)
    //   this.setState({
    //     leftNavData:newLeftNavData,
    //     rightContentData
    //   })
    // })

    // ES7  async await函数改造
    const result = await request({url:"/categories"})
    // 上面请求没回来的话  下面的不会执行
    // this.returnData = result.data.message
    this.returnData = result
      // 将数据存储到本地
    Taro.setStorageSync('localityData',{time:Date.now(),data:this.returnData})

    let leftNavData  = this.returnData.map((item) => {
       return item.cat_name
    })
    let newLeftNavData = []
    leftNavData.forEach((item) => {
      let obj = {}
      obj.title = item
      newLeftNavData.push(obj)
    })
    let rightContentData  = this.returnData
    console.log("右边",rightContentData)
    this.setState({
      leftNavData:newLeftNavData,
      rightContentData
    })

  }

  //ui组件左侧导航点击切换的方法
  handleClick (value) {
    console.log(value)
    this.setState({
      current: value,
    })
  }

  // 点击右侧任意一项  带参数跳转到goods_list页面
  gotoGoodsList(cat_id){
    console.log("跳列表需要传递的参数",cat_id)
    Taro.navigateTo({
      url:'/pages/goods_list/goods_list?catId='+cat_id
    })
  }

  render () {
    let { leftNavData, rightContentData } = this.state
    return (
      <View className='sort'>
        <search></search>
        <View className="sort_content">
         <AtTabs
           current={this.state.current}
           scroll
           height='520px'
           tabDirection='vertical'
           scroll
           tabList={leftNavData}
           onClick={this.handleClick.bind(this)}>
            {
              rightContentData.map((item1,index1) => (
                <AtTabsPane tabDirection='vertical' current={this.state.current} index={index1} key={index1}>
                  <View>
                    {
                      item1.children.map((item,index) => (
                        <View key={index}>
                          <View className="itemTitle">{ item.cat_name }</View>
                          <View className="itemContent">
                            {
                              item.children.map((itemChild,indexChild) => (
                                <View className="itemChild" key={indexChild} onClick={this.gotoGoodsList.bind(this,itemChild.cat_id)}>
                                  <Image src={ itemChild.cat_icon }></Image>
                                  <Text>{ itemChild.cat_name }</Text>
                                </View>
                              ))
                            }
                          </View>
                        </View>
                      ))
                    }
                  </View>
                </AtTabsPane>
              ))
            }
         </AtTabs>
        </View>
      </View>
    )
  }
}
