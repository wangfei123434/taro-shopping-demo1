import Taro, { Component } from '@tarojs/taro'
// 获取收货地址的改造   Promise形式

// Promise形式的getSetting
export const getSetting = () => {
  return new Promise((resolve,reject) => {
    Taro.getSetting({
      success:(res) => {
        resolve(res)
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}

// Promise形式的chooseAddress
export const chooseAddress = () => {
  return new Promise((resolve,reject) => {
    Taro.chooseAddress({
      success:(res) => {
        resolve(res)
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}

// Promise形式的getSetting
export const openSetting = () => {
  return new Promise((resolve,reject) => {
    Taro.openSetting({
      success:(res) => {
        resolve(res)
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}

// Promise形式的login
export const login = () => {
  return new Promise((resolve,reject) => {
    Taro.login({
      success:(res) => {
        resolve(res)
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}

