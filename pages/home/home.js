// 首页 —— 问候 / 搜索 / 心情 / 今日主推 / 治愈菜单三宫格 / 爱心横幅。数据来自 /mock。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const toast = require('../../utils/toast');

// 心情卡配色（对应 tone m1..m4）
const MOOD_COLOR = { m1: colors.sage600, m2: '#9A8270', m3: colors.honey600, m4: colors.rose700 };

Page({
  data: {
    C: colors,
    home: mock.copy.HOME,
    today: mock.getDish(mock.HOME_TODAY),
    gridDishes: mock.HOME_GRID.map(mock.getDish),
    moods: mock.copy.HOME.moods.map((m) => ({ ...m, color: MOOD_COLOR[m.tone] })),
    statusBarH: 20, // 状态栏高度(px)，供搜索框吸顶定位
    toast: { show: false, text: '' },
  },

  onLoad() {
    const app = getApp();
    this.setData({ statusBarH: (app && app.globalData && app.globalData.statusBarHeight) || 20 });
  },

  onShow() {
    const tb = this.getTabBar && this.getTabBar();
    if (tb) tb.setSelected(0);
  },

  goToday() {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + this.data.today.id });
  },
  onDishTap(e) {
    const id = e.detail && e.detail.id;
    if (!id) return; // 防御：无 id 不跳转
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id });
  },
  onDishWish(e) {
    toast.show(this, e.detail.added ? '已加入心愿单 ♥' : '已移出心愿单');
  },
  goMenu() {
    wx.switchTab({ url: '/pages/menu/menu' });
  },
  onSearch() {
    toast.show(this, '为你寻找灵感中…');
  },
  onMood() {
    // 心情卡：跳到菜谱页帮她挑
    wx.switchTab({ url: '/pages/menu/menu' });
  },
});
