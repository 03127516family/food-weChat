// 菜单 menu —— 治愈菜单整页列表（点行进详情 / + 加入心愿单）。数据来自 /mock。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const toast = require('../../utils/toast');

Page({
  data: {
    C: colors,
    copy: mock.copy.MENU,
    dishes: mock.MENU_LIST.map(mock.getDish),
    toast: { show: false, text: '' },
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setSelected(1);
    }
  },

  onDishTap(e) {
    const id = e.detail && e.detail.id;
    if (!id) return; // 防御：无 id 不跳转
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id });
  },
  onDishWish(e) {
    toast.show(this, e.detail.added ? '已加入心愿单 ♥' : '已移出心愿单');
  },
});
