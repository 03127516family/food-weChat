// 首页 —— 问候 / 搜索 / 今日推荐 / 治愈菜单横滑 / 心情卡。数据来自 /mock。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const toast = require('../../utils/toast');

// 心情卡配色（对应 tone）
const MOOD_COLOR = { m1: colors.sage600, m2: colors.rose700, m3: '#9A8270', m4: colors.honey600 };

Page({
  data: {
    C: colors,
    home: mock.copy.HOME,
    today: mock.getDish(mock.HOME_TODAY),
    menuDishes: mock.HOME_MENU.map(mock.getDish),
    moods: mock.copy.HOME.moods.map((m) => ({ ...m, color: MOOD_COLOR[m.tone] })),
    todaySaved: false,
    toast: { show: false, text: '' },
  },

  onLoad() {
    this.setData({ todaySaved: !!this.data.today.saved });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setSelected(0);
    }
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
  toggleTodayHeart() {
    this.setData({ todaySaved: !this.data.todaySaved });
  },
  onSearch() {
    toast.show(this, '搜索功能待接入');
  },
  refreshMoods() {
    toast.show(this, '已换一批');
  },
  onMood(e) {
    toast.show(this, this.data.moods[e.currentTarget.dataset.i].label);
  },
});
