const app = getApp()

Page({
  data: {
    navHeight: '',
    batteryNum: 0,
    timer: null,
    theme: ''
  },
  onLoad() {
    this.setData({
      navHeight: app.globalData.navHeight,
      theme: app.globalData.isDark
    })
  },
  onShow() {
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