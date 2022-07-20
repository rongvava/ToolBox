const app = getApp()
Page({
  data: {
    theme: app.globalData.isDark,
  },
  onLoad() {
    app.initThemeColor()
  }
})