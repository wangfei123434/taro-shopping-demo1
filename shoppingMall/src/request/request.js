import Taro, { Component } from '@tarojs/taro'

// 同时发送异步请求代码的次数
// 为了防止提示框消失，得等同个页面所有的请求都回来了才关闭提示框
let ajaxTimes = 0

export const request = (params) => {
  ajaxTimes ++
  // 发送请求之前显示加载中的提示框效果
  Taro.showLoading({
    title:'加载中',
    mask:true
  })

  // 定义公共的url请求地址
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject) => {
    Taro.request({
      ...params,               //解构
      url:baseUrl+params.url,  //拼接地址
      success:(result) => {
        resolve(result.data.message)
      },
      fail:(err) => {
        reject(err)
      },
      // 不管请求成功或者是失败都会调用complete，从而关闭提示框
      complete:() => {
        ajaxTimes --
        if(ajaxTimes===0){
          setTimeout(function () {
           Taro.hideLoading()
          }, 2000)
        }
      }
    })
  })
}


// https://api-hmugo-web.itheima.net/api/public/v1/categories
