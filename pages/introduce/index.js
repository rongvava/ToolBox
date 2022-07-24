let i18n = require('../../i18n/index')

const app = getApp()
Page({
  data: {
    theme: app.globalData.isDark,
    _t: {}
  },
  onShow() {
    this.setData({
      _t: i18n._t()
    })
    wx.setNavigationBarTitle({
      title: this.data._t['aboutMeTitle'],
    })
  },
  onLoad() {
    app.initThemeColor()
  }
})