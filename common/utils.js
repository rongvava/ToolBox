// wx.showToast
let toast = (title, duration = 2000, mask = false, icon = 'none') => {
  if (!Boolean(title)) return
  setTimeout(() => {
    wx.showToast({
      title,
      duration,
      mask,
      icon
    });
  }, 10);
}

// 格式化时间
let formatDate = function (data, pattren) {
  var fmt = pattren || 'yyyy-MM-dd hh:mm:ss';
  var date = new Date(data)
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒 
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
        .length)));
  return fmt;
}

// 随机数
let randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// key
let uuid = function () {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  })
  return uuid
}

// 前进
let navPage = (url, tab) => {

  if (tab) wx.switchTab({
    url
  })
  else wx.navigateTo({
    url
  })

}

// 后退
let navBack = (delta = 1) => {
  wx.navigateBack({
    delta
  })
}

// 节流
let timer, flag;
let throttle = (func, wait = 500, immediate = true) => {
  if (immediate) {
    if (!flag) {
      flag = true;
      typeof func === 'function' && func();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true
      timer = setTimeout(() => {
        flag = false
        typeof func === 'function' && func();
      }, wait);
    }

  }
}

// 防抖
let timeout = null;
let debounce = (func, wait = 500, immediate = false) => {
  if (timeout !== null) clearTimeout(timeout);
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}

export default {
  toast,
  formatDate,
  randomInt,
  uuid,
  navPage,
  navBack,
  throttle,
  debounce

}