import utils from './utils'
let http = {
  baseUrl: 'https://api.apiopen.top/api',
  headers: {
    "content-type": "application/json;charset=utf-8"
    // "content-type": "application/x-www-form-urlencoded"
  },
  get,
  post,
  delete: Delete,
  put,
  request
}

function request(url, data, success, failure, complete, method, headers) {
  wx.request({
    url: url.startsWith('http') ? url : (http.baseUrl + url),
    method: method || "GET",
    data,
    header: headers || http.headers,
    dataType: 'json',
    success: (res) => {
      let data = res.data;
      if (data.code == 2001) {
        setTimeout(() => {
          utils.toast('登录已过期，请重新登录')
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/profile/login'
            })
          }, 2000)
        }, 300)
      } else {
        success && success(data);
      }
    },
    fail: () => {
      utils.toast('您的网络好像不太给力，请稍后再试')
      failure && failure();
    },
    complete: () => {
      complete && complete();
    }
  });
}

function get(url, data, success, failure, complete, headers) {
  request(url, data, success, failure, complete, "GET", headers);
}

function post(url, data, success, failure, complete, headers) {
  request(url, data, success, failure, complete, "POST", headers);
}

function Delete(url, data, success, failure, complete, headers) {
  request(url, data, success, failure, complete, "DELETE", headers);
}

function put(url, data, success, failure, complete, headers) {
  request(url, data, success, failure, complete, "PUT", headers);
}

export default http