// shopping.js —— 采购单页：默认菜单 + 做饭时间线。
// 采购清单不再写死——改由「今晚要做的菜」用 mock/recipes.buildChecklist() 聚合生成。

// 没有「她送出的心愿单」时，采购单默认展示的两道菜
const DEFAULT_TONIGHT = ['pasta', 'salmon'];

// 做饭时间线（tone 对应样式 a/b/c → sage/rose/honey；icon 对应 utils/icons 名）
const TIMELINE = [
  { time: '18:00', name: '备菜', desc: '清洗切配食材', icon: 'tl-prep', tone: 'a' },
  { time: '18:20', name: '开始烹饪', desc: '烹饪今晚的菜', icon: 'tl-cook', tone: 'b' },
  { time: '18:50', name: '装盘', desc: '摆盘与点缀', icon: 'tl-plate', tone: 'c' },
];

module.exports = { DEFAULT_TONIGHT, TIMELINE };
