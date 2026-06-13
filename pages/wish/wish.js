// 心愿单 wish —— 她选菜 → 写留言 → 送出（邮件提醒动效）。核心闭环页。
// navigateTo 子页：无 tabBar、无 wish-bar。状态全部来自 store。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const store = require('../../utils/store');
const toast = require('../../utils/toast');
const notify = require('../../utils/notify');

Page({
  data: {
    C: colors,
    copy: mock.copy.WISH,
    dishes: [], // 当前心愿单菜品对象
    msg: '',
    msgCount: 0,
    sentShow: false, // 送出确认遮罩
    toast: { show: false, text: '' },
  },

  onLoad() {
    this._render(store.getState());
    this._unsub = store.subscribe((s) => this._render(s));
  },
  onUnload() {
    if (this._unsub) this._unsub();
  },

  _render(s) {
    this.setData({ dishes: s.wish.map(mock.getDish) });
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },
  clearAll() {
    if (this.data.dishes.length === 0) return;
    store.clearWish();
    toast.show(this, '已清空心愿单');
  },
  removeDish(e) {
    store.toggleWish(e.currentTarget.dataset.id); // 已在单内 → 移出
    toast.show(this, '已移出心愿单');
  },
  goMenu() {
    wx.switchTab({ url: '/pages/menu/menu' });
  },

  onMsgInput(e) {
    const v = e.detail.value;
    this.setData({ msg: v, msgCount: v.length });
  },
  fillPhrase(e) {
    const v = e.currentTarget.dataset.text;
    this.setData({ msg: v, msgCount: v.length });
  },

  sendWish() {
    if (this.data.dishes.length === 0) {
      toast.show(this, '还没选菜呀～');
      return;
    }
    // 先取菜名 —— store.send 会清空心愿单
    const dishNames = this.data.dishes.map((d) => d.name);
    const msg = this.data.msg;
    const ok = store.send(msg);
    if (!ok) return;
    this.setData({ sentShow: true }); // 动效照常先弹
    // 下发订阅消息提醒做饭的人（未配置云开发时安全降级，不影响动效）
    notify.sendOrderNotify({ dishes: dishNames, message: msg });
  },
  viewCookSide() {
    this.setData({ sentShow: false });
    wx.switchTab({ url: '/pages/shop/shop' });
  },
  backHome() {
    this.setData({ sentShow: false });
    wx.switchTab({ url: '/pages/home/home' });
  },
});
