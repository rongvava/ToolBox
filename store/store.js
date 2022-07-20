// 在这个 JS 文件中， 专门来创建 Store 的实例对象

import {
  action,
  observable
} from 'mobx-miniprogram'

export const store = observable({
  // 数据字段
  numA: 1,
  numB: 2,
  // 计算属性
  get sum() {
    return this.numA + this.numB
  },

  // actions 方法, 用来修改 store 中的数据

  updateNum1: action(function (step) {
    this.numA += step
  }),

  updateNum2: action(function (step) {
    this.numB += step
  })
})