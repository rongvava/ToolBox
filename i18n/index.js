function getLanguage() {
  return wx.getStorageSync('Language') || setLanguage()
}

function setLanguage() {
  return wx.setStorageSync('Language', 'English')
}

function translate() {
  return require(`./${getLanguage()}.js`).languageMap
}

function translateTxt(desc) {
  return translate()[desc] || ''
}

module.exports = {
  getLanguage: getLanguage,
  _t: translate,
  translateTxt: translateTxt
}