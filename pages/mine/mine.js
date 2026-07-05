// 我的 mine —— 头像 / 名称 / 统计 / 菜单列表 / 爱心横幅。数据来自 /mock。
// 这里也是「做饭的人」授权接收订阅消息提醒的入口（见 mine-subscribe）。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const toast = require('../../utils/toast');
const notify = require('../../utils/notify');

const TONE_COLOR = { rose: colors.rose500, sage: colors.sage600, honey: colors.honey600 };

Page({
  data: {
    C: colors,
    p: mock.PROFILE,
    stats: mock.PROFILE.stats.map((s) => ({ ...s, color: TONE_COLOR[s.tone] })),
    menu: mock.PROFILE.menu.map((m) => ({ ...m, color: TONE_COLOR[m.tone] })),
    subscribed: false,
    toast: { show: false, text: '' },
  },

  onShow() {
    const tb = this.getTabBar && this.getTabBar();
    if (tb) tb.setSelected(3);
  },

  onMenuTap(e) {
    toast.show(this, this.data.p.menu[e.currentTarget.dataset.i].label);
  },

  // 做饭的人点一下：授权订阅 + 记录 openid 到云端
  onSubscribe() {
    if (this.data.subscribed) {
      toast.show(this, '已开启，她下单会提醒你 ♥');
      return;
    }
    notify.subscribeAsCook().then((r) => {
      if (r.ok) {
        this.setData({ subscribed: true });
        toast.show(this, '已开启，她下单会提醒你 ♥');
      } else if (r.reason === 'NOT_CONFIGURED') {
        toast.show(this, '请先在 cloud-config 配置云开发');
      } else if (r.reason === 'REJECTED') {
        toast.show(this, '你拒绝了授权');
      } else {
        toast.show(this, '开启失败，请重试');
      }
    });
  },
});
