const app = getApp()
import utils from '../../common/utils'
Page({
  data: {
    theme: app.globalData.isDark,
    menus: [{
      title: 'About applets',
      url: '/pages/introduce/index'
    }]
  },
  onLoad() {
    app.initThemeColor()
  },
  tapFeedbackModel() {

    let content = 'You can tell me about your problems or bugs, and also give me your suggestions or comments.\nz443902775@126.com'
    // let content = '您可以告诉我你遇到的问题或BUG，也可以向我提出您的建议或意见。\nz443902775@126.com'
    wx.showModal({
      title: 'problem feedback',
      content,
      confirmText: 'Copy',
      cancelText: 'Cancel',
      success: res => {
        if (res.confirm) {
          wx.setClipboardData({
            data: content,
            success(res) {
              wx.hideToast({
                success: (res) => {
                  utils.toast('Copy success')
                },
              })
              wx.getClipboardData({
                success(res) {}
              })
            }
          })
        }
      }
    })
  }
})