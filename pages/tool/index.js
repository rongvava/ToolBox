import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import utils from '../../common/utils'

const app = getApp()

Page({
  data: {
    theme: app.globalData.isDark,
    toolsList: [{
        // title: '手持弹幕',
        title: 'Holding a barrage',
        icon: '/static/tool/font.png',
        bColor: '120deg, #84fab0 0%, #8fd3f4 100%',
        shadow: '#84fab0',
        pagePath: '/package_tool/pages/marquee/index',
        keyId: utils.uuid()
      },
      {
        title: 'More Tool',
        icon: '/static/tool/more.png',
        bColor: 'to top, #fbc2eb 0%, #a6c1ee 100%',
        shadow: '#fbc2eb',
        keyId: utils.uuid()
      }
    ]
  },
  onLoad() {
    app.initThemeColor()
    wx.getBatteryInfo({
      success: (res) => {
        console.log(res);
      },
    })
  },
  tapToolNodes(e) {
    let index = e.currentTarget.dataset.id,
      list = this.data.toolsList
    if (index == list.length - 1) this.showMoreToolNotify()
    else utils.navPage(list[index].pagePath)
  },
  showMoreToolNotify() {
    Notify({
      
      // message: '更多小工具正在加班加点开发中...',
      message: 'Hard at work...',
      color: '#ffffff',
      background: '#096',
    });
  }
})