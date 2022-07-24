let i18n = require('../../i18n/index')
import utils from '../../common/utils'
const app = getApp()
Page({
  data: {
    languageList: ['Chinese', 'English'],
    languageDefault: [1],
    show: false,
    _t: {},
    theme: app.globalData.isDark,
    menus: [{
      title: "",
      url: '/pages/introduce/index',
      id: utils.uuid()
    }],
    flag: true
  },
  onLoad() {
    app.initThemeColor()
  },
  onShow() {
    this.init()
  },
  init() {
    this.setData({
      _t: i18n._t(),
      languageDefault: i18n.getLanguage() === 'English' ? [1] : [0],
      'languageList[0]': i18n.getLanguage() === 'English' ? 'Chinese' : '中文',
      'menus[0].title': i18n._t()['about']
    })
    wx.setNavigationBarTitle({
      title: i18n._t()['settingTitle'],
    })
  },
  tapShowPicker() {
    this.setData({
      show: true,
      flag: true
    })
  },
  changeLanguage(e) {
    const val = e.detail.value
    this.setData({
      languageDefault: val,
      flag: i18n.getLanguage() === this.data.languageList[val]
    })
  },
  close() {
    this.setData({
      show: false
    })
    if (this.data.flag) return
    let language = this.data.languageDefault[0] === 0 ? 'Chinese' : 'English'
    wx.setStorageSync('Language', language)
    this.init()
  },
  tapFeedbackModel() {
    wx.showModal({
      title: i18n._t()['modelTitle'],
      content: i18n._t()['modelContent'],
      confirmText: i18n._t()['modelConfrimText'],
      cancelText: i18n._t()['modelCancelText'],
      success: res => {
        if (res.confirm) {
          wx.setClipboardData({
            data: i18n._t()['modelContent'],
            success() {
              wx.hideToast({
                success: () => {
                  utils.toast(i18n._t()['clipboardSuccess'])
                },
              })
              wx.getClipboardData({
                success() {}
              })
            }
          })
        }
      }
    })
  }
})