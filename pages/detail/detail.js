// 菜品详情 detail —— push 子页（非 tab）。
// 头部 + 食材/步骤/简介 都按被点菜品取：mock.getDish(id) + mock.recipes.getRecipe(id)。
const mock = require('../../mock/index');
const colors = require('../../utils/colors');
const toast = require('../../utils/toast');
const store = require('../../utils/store');

Page({
  data: {
    C: colors,
    dish: {},
    recipe: {}, // 当前菜品的菜谱（onLoad 按 id 载入）
    hint: mock.recipes.INGREDIENT_HINT,
    inWish: false,
    collected: false,
    toast: { show: false, text: '' },
  },

  onLoad(options) {
    const id = (options && options.id) || mock.HOME_TODAY;
    const dish = mock.getDish(id);
    this.setData({ dish, recipe: mock.recipes.getRecipe(dish.id), inWish: store.isInWish(dish.id) });
    // 订阅 store：心愿单变化时同步主按钮文案
    this._unsub = store.subscribe(() => {
      this.setData({ inWish: store.isInWish(this.data.dish.id) });
    });
  },

  onUnload() {
    if (this._unsub) this._unsub();
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },

  onCollect() {
    toast.show(this, '已收藏 ♥');
  },

  onShare() {
    toast.show(this, '分享给她 →');
  },

  goShop() {
    wx.switchTab({ url: '/pages/shop/shop' });
  },

  onAddWish() {
    const added = store.toggleWish(this.data.dish.id);
    toast.show(this, added ? '已加入心愿单 ♥' : '已移出心愿单');
  },
});
