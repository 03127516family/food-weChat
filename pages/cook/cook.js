// 开始做饭 cook —— push 子页（非 tab）。按菜品分步引导 + 每步倒计时。
// 步骤数据来自 mock.cooking.getCookSteps(id)；进入自 detail「直接开始」或 tonight「开始做饭」。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const toast = require('../../utils/toast');

function fmt(s) {
  const m = Math.floor(s / 60);
  const x = s % 60;
  return (m < 10 ? '0' : '') + m + ':' + (x < 10 ? '0' : '') + x;
}
function fmtSug(s) {
  const m = Math.floor(s / 60);
  const x = s % 60;
  return m + ':' + (x < 10 ? '0' : '') + x;
}

Page({
  data: {
    C: colors,
    dishId: 'pasta',
    steps: [],
    idx: 0,
    total: 0,
    nodes: [],
    step: {},
    countText: '',
    doneLbl: '完成这一步',
    remain: 0,
    timeText: '00:00',
    sugText: '0:00',
    running: false,
    finished: false,
    toast: { show: false, text: '' },
  },

  onLoad(options) {
    const id = (options && options.id) || 'pasta';
    const steps = mock.cooking.getCookSteps(id);
    this.setData({ dishId: id, steps, total: steps.length });
    this._load(0);
  },
  onUnload() {
    this._stop();
  },
  onHide() {
    this._stop();
  },

  _load(i) {
    const steps = this.data.steps;
    const s = steps[i];
    const nodes = steps.map((_, k) => ({ id: k, state: k < i ? 'done' : k === i ? 'cur' : '' }));
    this.setData({
      idx: i,
      finished: false,
      nodes,
      step: { ...s, hbShow: !!s.hb },
      remain: s.sug,
      timeText: fmt(s.sug),
      sugText: fmtSug(s.sug),
      doneLbl: i === steps.length - 1 ? '完成 · 开饭咯' : '完成这一步',
      countText: '· ♥ · 步骤 ' + (i + 1) + '/' + steps.length + ' · ♥ ·',
    });
    this._start();
  },

  _tick() {
    if (this.data.remain > 0) {
      const r = this.data.remain - 1;
      this.setData({ remain: r, timeText: fmt(r) });
    } else {
      this._stop();
      toast.show(this, '这一步时间到啦 ♥');
    }
  },
  _start() {
    this._stop();
    this._timer = setInterval(() => this._tick(), 1000);
    this.setData({ running: true });
  },
  _stop() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    if (this.data.running) this.setData({ running: false });
  },
  toggleTimer() {
    if (this._timer) {
      this._stop();
    } else {
      this._timer = setInterval(() => this._tick(), 1000);
      this.setData({ running: true });
    }
  },

  prevStep() {
    if (this.data.idx > 0) this._load(this.data.idx - 1);
  },
  nextStep() {
    if (this.data.idx < this.data.total - 1) this._load(this.data.idx + 1);
  },
  completeStep() {
    if (this.data.idx < this.data.total - 1) {
      this._load(this.data.idx + 1);
      toast.show(this, '完成 ✓ 进入下一步');
    } else {
      this._stop();
      this.setData({ finished: true });
    }
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },
  viewRecipe() {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + this.data.dishId });
  },
  backHome() {
    wx.switchTab({ url: '/pages/home/home' });
  },
  logMeal() {
    toast.show(this, '已记录这一餐 ♥');
    wx.switchTab({ url: '/pages/mine/mine' });
  },
});
