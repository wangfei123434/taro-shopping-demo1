import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './goods_list.scss'

// 导入封装的请求方法request
import  {request}  from "../../request/request.js"

// 导入search组件
import search from "../../components/search/search"

// 导入ui组件
import { AtTabs, AtTabsPane } from 'taro-ui'


export default class Goods_list extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      goods_list:[]
    }
  }

  // 接口要的参数
  queryParameter = {
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  }
  // 总页数
  totalPage:1


  handleClick (value) {
    this.setState({
      current: value
    })
  }

  config = {
    navigationBarTitleText: '商品列表',
    enablePullDownRefresh:true,     //下拉刷新必填
    backgroundTextStyle:"dark"      //下拉刷新时候的顶部样式
  }

  componentWillMount () {
    console.log("传递的参数",this.$router.params)    //传过来的具体商品参数ID值
    this.queryParameter.cid = this.$router.params.catId     //将拿到传过来的参数赋值给接口需要的参数对象
    console.log("xxxx",this.queryParameter.cid)
    // 调用请求数据的方法
    this.getGoodsList()

    // 请求数据的时候显示加载中的小图标
    // Taro.showLoading({
    //   title: '加载中',
    // })
    // setTimeout(function () {
    //   Taro.hideLoading()
    // }, 1000)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 获取商品列表数据
  async getGoodsList(){
    const result = await request({url:"/goods/search",data:this.queryParameter})
    console.log("商品列表页res",result)
    // 获取数据的总条熟
    const total = result.total
    // 计算总页数并赋值给全局的totalPage
    this.totalPage = Math.ceil(total/this.queryParameter.pagesize)
    console.log("总页数",this.totalPage)
    this.setState({
      // goods_list:result.goods
      goods_list:[...this.state.goods_list,...result.goods]    //将原来默认第一页的数据数组与加载的下一页数据合并
    })
  }

  // 用户上拉页面，滚动条触底，加载下一页数据
  // 滚动条事件  Taro.pageScrollTo   useReachBottom
  // 判断有没有下一页数据   获取当前页码和总页码
  // 没有就给提示====》当前页码大于总页数   pagenum>  总页数=Math.ceil(总条数total,total是返回回来的总条数/页容量pagesize)
  // 有就加载=====》当前页码小于总页数
  //      当前页码++   重新发送请求   将data中的数组拼接 不是替换
  onReachBottom(){
    console.log('页面触底了')
    // 判断还有没有下一页
    if(this.queryParameter.pagenum >= this.totalPage){
      // 当前页码大于或等于总页码就代表没有下一页了
      Taro.showToast({
        title: '没有下一页数据了',
        icon: 'success',
        duration: 2000
      })
    }else{
      // 还有下一页数据
      this.queryParameter.pagenum ++    //先将页码++
      this.getGoodsList()   //重新调用请求函数
    }
  }



  // 用户下拉刷新页面
  // 1、触发下拉刷新事件   Taro.startPullDownRefresh( option )
  // 2、重置   数据    数组
  // 3、重置页码，设置为1
  onPullDownRefresh(){
    console.log("正在刷新")
    // 1、重置数组
    this.setState({
      goods_list:[]
    })
    // 2、重置页码
    this.queryParameter.pagenum = 1 
    // 3、重新发请求
    this.getGoodsList()
  }


  // 跳转商品详情
  gotoGoodsDetail(goods_id){
    console.log("e",goods_id)
    Taro.navigateTo({
      url:'/pages/goodsDetail/goodsDetail?goods_id='+goods_id
    })
  }

  render () {
    const tabList = [{ title: '综合' }, { title: '销量' }, { title: '价格' }]
    const { goods_list } = this.state
    return (
      <View className='goods_list'>
        <search></search>

        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View >
              {
                goods_list.map((item,index) => (
                  <View className="item" key={index} onClick={this.gotoGoodsDetail.bind(this,item.goods_id)}>
                    <View className="item_img">
                      <Image src={ item.goods_big_logo }></Image>
                    </View>
                    <View className="item_describe">
                      <View className="describe_title">{ item.goods_name }</View>
                      <View className="desceibe_price">￥{ item.goods_price }</View>
                    </View>
                  </View>
                ))
              }
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>

      </View>
    )
  }
}
