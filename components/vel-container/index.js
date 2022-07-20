const app = getApp()
Component({
  data: {
    isDark: app.globalData.isDark
  },
  pageLifetimes: {
    show() {
      app.initThemeColor()

    }
  },
})