import Taro, { Component } from '@tarojs/taro'
import { View, Text, } from '@tarojs/components'
import './content.scss'

// 导入封装的请求方法request
import  {request}  from "../../request/request.js"

export default class Content extends Component {

  config = {
    navigationBarTitleText: 'content'
  }

  constructor () {
    super(...arguments)
    this.state = {
      indexNavData:[],
      indexFloor:[]
    }
  }

  componentWillMount () {
    this.getNavFun()
    this.getFloorFun()

    // 请求数据的时候显示加载中的小图标
    // Taro.showLoading({
    //  title: '加载中',
    // })
    // setTimeout(function () {
    //  Taro.hideLoading()
    // }, 2000)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 获取导航数据
  getNavFun(){
    request({
      url:"/home/catitems"
    }).then(result => {
      console.log("导航res",result)
      this.setState({
        indexNavData:result
      })
    })
  }

  // 获取楼层数据
  getFloorFun(){
    request({
      url:"/home/floordata"
    }).then(result => {
      console.log("楼层res",result)
      this.setState({
        indexFloor:result
      })
    })
  }

  render () {
    let { indexNavData, indexFloor } = this.state
    return (
      <View className='content'>
        <View className="indexNav">
          {
            indexNavData.map((item,index) => (
              <Image src={item.image_src} key={item.name}></Image>
            ))
          }
        </View>

        <View className="indexFloor">
          {
            indexFloor.map((item,index) => (
              <View className="indexFloorItem" key={index}>
                <View className="item_title">
                  <Image src={ item.floor_title.image_src}></Image>
                </View>
                <view className="aaa">
                  {
                    item.product_list.map((itemChild,indexChild) => {
                      return (
                        <Image className="item_content_img" src={ itemChild.image_src } key={index}></Image>
                      )
                    })
                  }
                </view>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
