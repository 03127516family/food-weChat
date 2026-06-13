// status-bar —— 读取 app.globalData.statusBarHeight 作为占位高度。
Component({
  options: { styleIsolation: 'apply-shared' },
  data: { height: 20 },
  lifetimes: {
    attached() {
      const app = getApp();
      const h = (app && app.globalData && app.globalData.statusBarHeight) || 20;
      this.setData({ height: h });
    },
  },
});
