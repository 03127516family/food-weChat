// dish-card —— 订阅 store 反映「是否已加入心愿单」；收藏(♥)为本地装饰态。
const store = require('../../utils/store');
const colors = require('../../utils/colors');

Component({
  options: { styleIsolation: 'apply-shared' },
  properties: {
    dish: { type: Object, value: {} },
  },
  data: {
    C: colors,
    inWish: false,
    saved: false,
    pressed: false,
  },
  lifetimes: {
    attached() {
      this.setData({ saved: !!this.data.dish.saved });
      this._sync();
      this._unsub = store.subscribe(() => this._sync());
    },
    detached() {
      if (this._unsub) this._unsub();
    },
  },
  methods: {
    _sync() {
      const id = this.data.dish.id;
      if (!id) return;
      const inWish = store.isInWish(id);
      if (inWish !== this.data.inWish) this.setData({ inWish });
    },
    onTap() {
      // 事件名不能用 'tap'：会与原生 tap 冒泡冲突导致父级 bind 触发两次。
      this.triggerEvent('select', { id: this.data.dish.id });
    },
    onAdd() {
      const id = this.data.dish.id;
      this.setData({ pressed: true });
      setTimeout(() => this.setData({ pressed: false }), 150);
      const added = store.toggleWish(id);
      this.triggerEvent('wish', { id, added });
    },
    onHeart() {
      this.setData({ saved: !this.data.saved });
    },
  },
});
