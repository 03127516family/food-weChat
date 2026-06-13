// wish-bar —— 订阅 store，选了菜就浮出；点击进入心愿单页。
const store = require('../../utils/store');
const colors = require('../../utils/colors');
const { getDish } = require('../../mock/dishes');
const { WISH } = require('../../mock/copy');

Component({
  options: { styleIsolation: 'apply-shared' },
  data: {
    C: colors,
    barSub: WISH.barSub,
    show: false,
    count: 0,
    thumbs: [],
  },
  lifetimes: {
    attached() {
      this._sync(store.getState());
      this._unsub = store.subscribe((s) => this._sync(s));
    },
    detached() {
      if (this._unsub) this._unsub();
    },
  },
  methods: {
    _sync(s) {
      const count = s.wish.length;
      this.setData({
        show: count > 0,
        count,
        thumbs: s.wish.slice(0, 3).map((id) => getDish(id).img),
      });
    },
    goWish() {
      wx.navigateTo({ url: '/pages/wish/wish' });
    },
  },
});
