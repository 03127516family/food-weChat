// 自定义 tabBar —— 订阅 store 控制采购单红点；tab 页 onShow 调 setSelected 同步高亮。
const store = require('../utils/store');
const colors = require('../utils/colors');

Component({
  options: { styleIsolation: 'apply-shared' },
  data: {
    C: colors,
    selected: 0,
    badge: false,
    list: [
      { path: '/pages/home/home', text: '首页', icon: 'home' },
      { path: '/pages/menu/menu', text: '菜单', icon: 'bowl' },
      { path: '/pages/shop/shop', text: '采购单', icon: 'clipboard', badge: true },
      { path: '/pages/mine/mine', text: '我的', icon: 'user' },
    ],
  },
  lifetimes: {
    attached() {
      this.setData({ badge: store.showBadge() });
      this._unsub = store.subscribe(() => this.setData({ badge: store.showBadge() }));
    },
    detached() {
      if (this._unsub) this._unsub();
    },
  },
  methods: {
    // 供 tab 页 onShow 调用：this.getTabBar().setSelected(index)
    setSelected(index) {
      if (index !== this.data.selected) this.setData({ selected: index });
    },
    onTap(e) {
      const { index, path } = e.currentTarget.dataset;
      if (index === this.data.selected) return;
      wx.switchTab({ url: path });
    },
  },
});
