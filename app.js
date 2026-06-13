// app.js —— 全局入口：初始化云开发、系统信息（安全区）、尝试加载衬线字体、预热 store。
const store = require('./utils/store');
const cloudCfg = require('./utils/cloud-config');

App({
  globalData: {
    statusBarHeight: 20, // 状态栏高度(px)，onLaunch 时按真机校正
    safeAreaBottom: 0, // 底部安全区(px)
    navBarHeight: 44, // 自绘导航栏内容高度(px)
  },

  onLaunch() {
    // 0) 云开发：仅当配置了环境 ID 才初始化（未配置时 App 仍按纯静态运行）
    if (wx.cloud && cloudCfg.ENV) {
      wx.cloud.init({ env: cloudCfg.ENV, traceUser: true });
    }

    // 1) 读取系统安全区，供 status-bar / 自绘导航栏使用
    try {
      const win = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
      this.globalData.statusBarHeight = win.statusBarHeight || 20;
      const screenH = win.screenHeight || 0;
      const safeBottom = win.safeArea ? screenH - win.safeArea.bottom : 0;
      this.globalData.safeAreaBottom = safeBottom > 0 ? safeBottom : 0;
    } catch (e) {
      // 保底默认值，不阻塞启动
    }

    // 2) 尝试加载思源宋体（标题用）。真机/网络不可靠 —— 失败静默回退到系统衬线。
    if (wx.loadFontFace) {
      wx.loadFontFace({
        family: 'Noto Serif SC',
        source: 'url("https://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7uK2-n51I.woff2")',
        global: true,
        scopes: ['webview', 'native'],
        fail() {},
      });
    }

    // 3) 预热 store（从本地存储恢复心愿单状态）
    store.init();
  },
});
