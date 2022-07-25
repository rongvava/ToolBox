let i18n = require('../../i18n/index')

const app = getApp()

Page({
  data: {
    navHeight: '',
    batteryNum: 0,
    timer: null,
    theme: '',
    t: {}
  },
  onLoad() {
    this.setData({
      navHeight: app.globalData.navHeight,
      theme: app.globalData.isDark,
      t: i18n._t()
    })
    console.log(this.data.t);
  },
  onShow() {
    wx.getBatteryInfo({
      success: (res) => {
        this.setData({
          batteryNum: Math.ceil(res.level)
        })
      },
    })
    this.setData({
      timer: setInterval(() => {
        wx.getBatteryInfo({
          success: (res) => {
            this.setData({
              batteryNum: Math.ceil(res.level)
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