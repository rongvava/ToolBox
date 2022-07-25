let i18n = require('../../i18n/index')

const app = getApp()

Page({
  data: {
    navHeight: '',
    batteryNum: 0,
    timer: null,
    theme: app.globalData.isDark,
    _t: {}
  },
  onLoad() {
    app.initThemeColor()
    this.setData({
      navHeight: app.globalData.navHeight
    })
  },
  onShow() {
    this.setData({
      _t: i18n._t()
    })
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