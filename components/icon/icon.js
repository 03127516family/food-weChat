// icon —— SVG 图标渲染组件。见 CLAUDE.md 第 6 节。
const { getIcon } = require('../../utils/icons');
const base64 = require('../../utils/base64');

// 模块级缓存：同 name+color 只编码一次
const cache = {};

Component({
  options: {
    styleIsolation: 'apply-shared',
    virtualHost: true, // 不生成额外包裹节点，便于行内排版
  },
  properties: {
    name: { type: String, value: '' },
    color: { type: String, value: '#3E3733' },
    size: { type: null, value: 48 }, // rpx
  },
  data: {
    src: '',
  },
  observers: {
    'name, color': function (name, color) {
      this._render(name, color);
    },
  },
  lifetimes: {
    attached() {
      this._render(this.data.name, this.data.color);
    },
  },
  methods: {
    _render(name, color) {
      if (!name) return;
      const key = name + '|' + color;
      let src = cache[key];
      if (!src) {
        const tpl = getIcon(name);
        if (!tpl) return;
        const svg = tpl.split('currentColor').join(color);
        src = 'data:image/svg+xml;base64,' + base64.encode(svg);
        cache[key] = src;
      }
      if (src !== this.data.src) this.setData({ src });
    },
  },
});
