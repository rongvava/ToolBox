import utils from '../../../common/utils'
import http from '../../../common/http'
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';

Page({
  data: {
    isShowInput: false,
    inputText: '',
    text: 'Please enter the barrage~',
    // text: '请输入弹幕~',
    sliderValOfFontSize: 50,
    fontSize: 300,
    fontColor: 'white',
    backgroundColor: 'black',

    animateTime: 10,
    sliderValOfAnimateTime: 50,

    currentTab: 0,
    textMoveAnimate: null,
    colorArr: [{
        color: '#ffc0cb',
        id: utils.uuid()
      },
      {
        color: "#ff0000",
        id: utils.uuid()
      },
      {
        color: "#0000ff",
        id: utils.uuid()
      },
      {
        color: "#ffff00",
        id: utils.uuid()
      },
      {
        color: "#ffffff",
        id: utils.uuid()
      },
      {
        color: "#00ffff",
        id: utils.uuid()
      },
      {
        color: "#008000",
        id: utils.uuid()
      },
      {
        color: "#87ceeb",
        id: utils.uuid()
      },
      {
        color: "#ff69b4",
        id: utils.uuid()
      },
      {
        color: "#000000",
        id: utils.uuid()
      }
    ],
    access_token: '',
  },
  showInput() {
    this.setData({
      isShowInput: !this.data.isShowInput
    })
  },
  //改变背景颜色
  setBackGroundColor(e) {
    let index = e.target.dataset.index;
    let that = this;
    let selectColor = that.data.colorArr[index].color;
    that.setData({
      backgroundColor: selectColor
    })
    wx.setNavigationBarColor({
      backgroundColor: selectColor,
      frontColor: '#ffffff',
    })
    wx.setBackgroundColor({
      backgroundColor: selectColor,
    })
  },

  // 选择弹幕的字体颜色
  setColor(e) {
    let index = e.target.dataset.index;
    let that = this;
    let selectColor = that.data.colorArr[index].color;
    that.setData({
      fontColor: selectColor
    })
  },
  //改变弹幕滚动速度
  changeTextSpeend(e) {
    let sliderVal = e.detail.value;
    let that = this;
    //50 默认 10s
    //0 是 15s
    //100 是 5s
    that.setData({
      animateTime: sliderVal * -0.1 + 15,
      sliderValOfAnimateTime: sliderVal
    })
  },

  // 改变字号
  changeFontSize(e) {
    //获取滑竿的值
    let sliderVal = e.detail.value;
    let that = this;
    //运算边界值
    //50 对应 300rpx 的字号
    //0 对应 150rpx
    //100 对应 450rpx

    that.setData({
      fontSize: sliderVal * 3 + 150,
      sliderValOfFontSize: sliderVal
    })

  },


  // input失去焦点时获取输入的文字
  inputBlur(e) {
    let that = this;
    that.setData({
      text: e
    })
  },

  sendBtn(res) {
    this.setData({
      inputText: res.detail.value,
    })
  },

  //敏感字验证
  //修改！！！
  queryRequest() {
    let text = 'Please enter the barrage'
    if (!this.data.inputText.replace(/\s+/g, '')) return this.showNotify(text, '#096')
    this.setInputText()
  },
  setInputText() {
    this.setData({
      text: this.data.inputText,
      isShowInput: false
    })
  },
  //显示对话框
  showModal() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      isShowInput: false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  //滑动切换
  swiperTab(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  showNotify(msg, bColor) {
    Notify({
      message: msg,
      color: '#ffffff',
      background: bColor || '#ee0a24',
      duration: 2000
    });
  }
})