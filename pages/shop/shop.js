// 采购单 shop —— 做饭的人的视角：今晚准备 / 她的留言 / 采购清单 / 时间线。
// 「今晚」菜品与留言来自 store（已送出的心愿单），其余静态数据来自 /mock。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const store = require('../../utils/store');
const toast = require('../../utils/toast');

// 时间线 tone → 文字/图标色（base64 SVG 读不到 CSS 变量，这里给 JS 侧色）
const TL_COLOR = { a: colors.sage600, b: colors.rose700, c: colors.honey600 };

Page({
  data: {
    C: colors,
    copy: mock.copy.SHOP,
    tonight: [],
    tonightCount: 0,
    tonightTime: 0,
    herMessage: '',
    // 采购清单由「今晚的菜」聚合生成（见 _refresh）；勾选状态为页面本地态
    checklist: [],
    timeline: mock.shopping.TIMELINE.map((t) => ({ ...t, color: TL_COLOR[t.tone] })),
    toast: { show: false, text: '' },
  },

  onLoad() {
    // 订阅 store：她送出心愿单后实时刷新「今晚」内容
    this._unsub = store.subscribe(() => this._refresh());
    this._refresh();
  },

  onUnload() {
    if (this._unsub) this._unsub();
  },

  onShow() {
    const tb = this.getTabBar && this.getTabBar();
    if (tb) tb.setSelected(2);
    store.markSentSeen(); // 做饭的人打开采购单 → 熄灭红点
    this._refresh();
  },

  _refresh() {
    const { sent } = store.getState();
    const ids = sent && sent.dishes.length ? sent.dishes : mock.shopping.DEFAULT_TONIGHT;
    const tonight = ids.map(mock.getDish);
    const tonightTime = tonight.reduce((s, d) => s + d.time, 0);
    const patch = {
      tonight,
      tonightCount: ids.length,
      tonightTime,
      herMessage: sent && sent.message ? sent.message : '',
    };
    // 仅当「今晚的菜」集合变化时重建采购清单，避免覆盖用户已勾选状态
    const sig = ids.join(',');
    if (sig !== this._checklistSig) {
      patch.checklist = mock.recipes.buildChecklist(ids);
      this._checklistSig = sig;
    }
    this.setData(patch);
  },

  toggleLi(e) {
    const { gi, ii } = e.currentTarget.dataset;
    const path = `checklist[${gi}].items[${ii}].done`;
    this.setData({ [path]: !this.data.checklist[gi].items[ii].done });
  },

  clearChecked() {
    const checklist = this.data.checklist.map((g) => ({
      ...g,
      items: g.items.map((it) => ({ ...it, done: false })),
    }));
    this.setData({ checklist });
    toast.show(this, '已清空勾选');
  },

  onShare() {
    toast.show(this, '已生成分享卡片 →');
  },

  onStartCook() {
    toast.show(this, '开始为她下厨 ♥');
  },
});
