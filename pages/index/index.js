let i18n = require('../../i18n/index')

const app = getApp()

Page({
  data: {
    navHeight: '',
    batteryNum: 0,
    timer: null,
    theme: '',
    _t: {}
  },
  onLoad() {
    this.setData({
      navHeight: app.globalData.navHeight,
      theme: app.globalData.isDark,
      _t: i18n._t()
    })
  },
  onShow() {
    wx.getBatteryInfo({
      success: (res) => {
        this.setData({
          batteryNum: res.level
        })
      },
    })
    this.setData({
      timer: setInterval(() => {
        wx.getBatteryInfo({
          success: (res) => {
            this.setData({
              batteryNum: res.level
            })
          },
        })
      }, 1000)
    })
  },
  onHide() {
    clearInterval(this.data.timer)
  }
})