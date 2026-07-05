// 今晚 tonight —— 做饭的人视角：今晚一起做的菜 + 她的留言 + 采购清单 + 开始做饭。
// 「今晚的菜」与留言来自 store（她送出的心愿单），其余静态数据来自 /mock。
// 由原「采购单 shop」升级：合并今晚菜品、她的留言、聚合采购清单，并接入做饭流程。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const store = require('../../utils/store');
const toast = require('../../utils/toast');

// 采购分组配色（base64 SVG 读不到 CSS 变量，这里给 JS 侧色）
const GROUP_COLOR = { 主食: colors.honey600, 肉蛋: colors.rose500, 蔬菜: colors.sage600, 调味: colors.honey600 };

Page({
  data: {
    C: colors,
    copy: mock.copy.TONIGHT,
    tonight: [],
    tonightCount: 0,
    tonightTime: 0,
    herMessage: '',
    // 采购清单由「今晚的菜」聚合生成（见 _refresh）；勾选状态为页面本地态
    checklist: [],
    shopCount: 0,
    toast: { show: false, text: '' },
  },

  onLoad() {
    // 订阅 store：她送出心愿单后实时刷新今晚内容
    this._unsub = store.subscribe(() => this._refresh());
    this._refresh();
  },

  onUnload() {
    if (this._unsub) this._unsub();
  },

  onShow() {
    const tb = this.getTabBar && this.getTabBar();
    if (tb) tb.setSelected(2);
    store.markSentSeen(); // 做饭的人打开今晚 → 熄灭红点
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
    if (sig !== this._sig) {
      const checklist = mock.recipes.buildChecklist(ids).map((g) => ({ ...g, color: GROUP_COLOR[g.title] || colors.honey600 }));
      patch.checklist = checklist;
      patch.shopCount = checklist.reduce((n, g) => n + g.items.length, 0);
      this._sig = sig;
    }
    this.setData(patch);
  },

  toggleLi(e) {
    const { gi, ii } = e.currentTarget.dataset;
    const path = `checklist[${gi}].items[${ii}].done`;
    this.setData({ [path]: !this.data.checklist[gi].items[ii].done });
  },

  onShopMode() {
    toast.show(this, '已切换超市模式 🛒');
  },

  onStartCook() {
    const id = (this.data.tonight[0] && this.data.tonight[0].id) || 'pasta';
    wx.navigateTo({ url: '/pages/cook/cook?id=' + id });
  },
});
