// section-head —— 分区标题。more 文案存在时显示右侧入口并可触发 bind:more。
const colors = require('../../utils/colors');

Component({
  options: { styleIsolation: 'apply-shared' },
  properties: {
    title: { type: String, value: '' },
    more: { type: String, value: '' }, // 右侧文案，空则不显示
    moreIcon: { type: String, value: 'chevron-right' }, // 右侧图标名，空字符串则无图标
    flush: { type: Boolean, value: false }, // 去掉左右外边距（详情页内用）
    moreIconSize: { type: Number, value: 26 },
  },
  data: {
    moreColor: colors.ink2,
  },
  methods: {
    onMore() {
      this.triggerEvent('more');
    },
  },
});
