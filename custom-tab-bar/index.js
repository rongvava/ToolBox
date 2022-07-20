import utils from '../common/utils'
Component({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    tabBarList: [{
        pagePath: "/pages/index/index",
        iconPath: "/static/tabbar-icon/tab1.png",
        selectedIconPath: "/static/tabbar-icon/tab1-active.png",
        id: utils.uuid()
      },
      {
        pagePath: "/pages/tool/index",
        iconPath: "/static/tabbar-icon/tab2.png",
        selectedIconPath: "/static/tabbar-icon/tab2-active.png",
        id: utils.uuid()

      },
      {
        pagePath: "/pages/setting/index",
        iconPath: "/static/tabbar-icon/tab3.png",
        selectedIconPath: "/static/tabbar-icon/tab3-active.png",
        id: utils.uuid()

      }
    ]
  },
  methods: {
    onChange(e) {
      console.log(e);
      this.setData({
        active: e.detail
      });
      wx.switchTab({
        url: this.data.tabBarList[e.detail].pagePath,
      })
    },
  }
})