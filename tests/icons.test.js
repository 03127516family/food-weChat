// 图标注册表完整性测试：mock 里引用的每个 icon 名都必须存在，且模板含 currentColor + viewBox。
const { test, eq, ok } = require('./_harness');
const { ICONS, getIcon } = require('../utils/icons');
const { recipes, shopping, PROFILE, copy } = require('../mock/index');

test('每个图标模板都含 currentColor 与统一 viewBox', () => {
  Object.keys(ICONS).forEach((name) => {
    const tpl = ICONS[name];
    ok(tpl.indexOf('currentColor') >= 0, name + ' 缺少 currentColor 占位');
    ok(tpl.indexOf('viewBox="0 0 24 24"') >= 0, name + ' viewBox 不统一');
    ok(tpl.indexOf('xmlns') >= 0, name + ' 缺少 xmlns');
  });
});

test('getIcon 未命中返回空串', () => eq(getIcon('___nope___'), ''));

// 收集 mock 中所有被引用的 icon 名
function collectIconNames() {
  const names = [];
  Object.keys(recipes.RECIPES).forEach((id) => {
    recipes.RECIPES[id].steps.forEach((s) => names.push(s.icon));
  });
  Object.keys(recipes.GROUP_ICON).forEach((g) => names.push(recipes.GROUP_ICON[g]));
  shopping.TIMELINE.forEach((t) => names.push(t.icon));
  PROFILE.menu.forEach((m) => names.push(m.icon));
  copy.HOME.moods.forEach((m) => names.push(m.icon));
  return names;
}

test('mock 引用的所有图标均已注册', () => {
  collectIconNames().forEach((name) => {
    ok(!!ICONS[name], '图标未注册: ' + name);
  });
});

// 页面/组件里写死引用的关键图标，确保不会漏
test('核心交互图标存在', () => {
  ['heart', 'plus', 'check', 'close', 'trash', 'send', 'mail', 'chevron-right', 'chevron-left', 'clock', 'level', 'star', 'search', 'home', 'bowl', 'clipboard', 'user', 'quote', 'chef', 'share', 'share-nodes', 'arrow-right'].forEach((n) => {
    ok(!!ICONS[n], '缺少核心图标: ' + n);
  });
});
