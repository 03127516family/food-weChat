// 菜谱 menu —— 整页列表 + 分类筛选（点行进详情 / + 加入心愿单）。数据来自 /mock。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const toast = require('../../utils/toast');

const ALL = mock.MENU_LIST.map(mock.getDish);

Page({
  data: {
    C: colors,
    copy: mock.copy.MENU,
    filters: mock.FILTERS,
    curFilter: '全部',
    dishes: ALL,
    statusBarH: 20, // 状态栏高度(px)，供搜索框吸顶定位
    toast: { show: false, text: '' },
  },

  onLoad() {
    const app = getApp();
    this.setData({ statusBarH: (app && app.globalData && app.globalData.statusBarHeight) || 20 });
  },

  onShow() {
    const tb = this.getTabBar && this.getTabBar();
    if (tb) tb.setSelected(1);
  },

  setFilter(e) {
    const f = e.currentTarget.dataset.f;
    if (f === this.data.curFilter) return;
    const dishes = f === '全部' ? ALL : ALL.filter((d) => d.cat === f);
    this.setData({ curFilter: f, dishes });
  },

  onDishTap(e) {
    const id = e.detail && e.detail.id;
    if (!id) return; // 防御：无 id 不跳转
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id });
  },
  onDishWish(e) {
    toast.show(this, e.detail.added ? '已加入心愿单 ♥' : '已移出心愿单');
  },
  onSearch() {
    toast.show(this, '为你寻找灵感中…');
  },
  onSort() {
    toast.show(this, '默认排序');
  },
  onFilterMore() {
    toast.show(this, '筛选条件');
  },
});
