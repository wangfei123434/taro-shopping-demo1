import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './search.scss'

import { AtSearchBar } from 'taro-ui'

export default class Search extends Component {

  config = {
    navigationBarTitleText: 'search'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  onChange (value) {
    this.setState({
    value: value
    })
  }
  onActionClick () {
	  console.log('开始搜索')
  }

  componentWillMount () { 
    // https://gate.wanou1.com/miniprogram3/banner/bannerAllList
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='search'>
        <AtSearchBar
          actionName='搜一下'
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
	      />
      </View>
    )
  }
}
