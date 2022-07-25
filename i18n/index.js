import Chinese from './Chinese'
import English from './English'

function getLanguage() {
  return wx.getStorageSync('Language') || setLanguage()
}

function setLanguage() {
  wx.setStorageSync('Language', 'English')
}

function translate() {
  if (wx.getStorageSync('Language') === "English") {
    return English
  }
  return Chinese
}

function translateTxt(desc) {
  return translate()[desc] || ''
}

module.exports = {
  getLanguage: getLanguage,
  _t: translate,
  translateTxt: translateTxt
}