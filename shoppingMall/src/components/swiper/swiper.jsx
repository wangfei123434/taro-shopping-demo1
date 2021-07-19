import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem  } from '@tarojs/components'
import './swiper.scss'


export default class Swiper1 extends Component {

  config = {
    navigationBarTitleText: 'swiper'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      indexBannerArr:[]
    }
  }


  componentWillMount () {
    let _this = this
    Taro.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: function (res) {
        console.log("首页轮播图res",res.data)
        _this.setState({
          indexBannerArr:res.data.message
        })
      }
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () {

  }

  render () {
    let {indexBannerArr} = this.state
    return (
      <View className='swiper'>
        <Swiper className='test-h' indicatorColor='#999' indicatorActiveColor='#333' circular indicatorDots >
        {
          indexBannerArr.map((item,index) => (
            <SwiperItem key={item.goods_id}>
              <View className='demo-text-1'>
                <Image src={item.image_src} ></Image>
              </View>
            </SwiperItem>
          ))
        }
        </Swiper>
      </View>
    )
  }
}
