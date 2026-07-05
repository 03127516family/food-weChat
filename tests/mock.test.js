// mock 数据形状测试：保证页面拿到的数据结构稳定。
const { test, eq, ok } = require('./_harness');
const mock = require('../mock/index');

test('DISHES 每项字段齐全', () => {
  Object.keys(mock.DISHES).forEach((id) => {
    const d = mock.DISHES[id];
    eq(d.id, id, 'id 应与 key 一致');
    ['name', 'img', 'tag', 'difficulty', 'serves', 'desc'].forEach((k) => ok(d[k], id + ' 缺字段 ' + k));
    ok(typeof d.time === 'number', id + ' time 应为数字');
    ok(['rose', 'sage', 'honey'].indexOf(d.tagType) >= 0, id + ' tagType 非法');
    ok(d.img.indexOf('/assets/images/') === 0 || d.img.indexOf('data:image/') === 0, id + ' 图片应为绝对路径或 data-uri 插画');
  });
});

test('首页/菜谱引用的 dishId 均有效', () => {
  [mock.HOME_TODAY, ...mock.HOME_GRID, ...mock.MENU_LIST, ...mock.shopping.DEFAULT_TONIGHT].forEach((id) => {
    ok(mock.isValidId(id), '非法 dishId: ' + id);
  });
});

test('每道菜有分类(cat) 且在 FILTERS 内', () => {
  ok(mock.FILTERS[0] === '全部', 'FILTERS 首项应为全部');
  Object.keys(mock.DISHES).forEach((id) => {
    const d = mock.DISHES[id];
    ok(mock.FILTERS.indexOf(d.cat) > 0, id + ' 分类不在 FILTERS: ' + d.cat);
    ok(['rose', 'sage', 'honey'].indexOf(d.catClass) >= 0, id + ' catClass 非法');
  });
});

test('getDish 兜底回退 pasta', () => {
  eq(mock.getDish('___x___').id, 'pasta');
});

test('时间线 3 段、tone 为 a/b/c', () => {
  eq(mock.shopping.TIMELINE.length, 3);
  eq(mock.shopping.TIMELINE.map((t) => t.tone), ['a', 'b', 'c']);
});

test('文案存在', () => {
  ok(mock.copy.HOME.greetHl && mock.copy.WISH.title && mock.copy.TONIGHT.title && mock.copy.MENU.title);
  eq(mock.copy.WISH.phrases.length, 4);
  eq(mock.copy.HOME.moods.length, 4);
});

test('做饭分步：每道菜都能取到 ≥3 步', () => {
  Object.keys(mock.DISHES).forEach((id) => {
    const steps = mock.cooking.getCookSteps(id);
    ok(steps.length >= 3, id + ' 做饭步骤过少');
    steps.forEach((s) => ok(s.title && typeof s.sug === 'number' && s.img, id + ' 步骤字段缺失'));
  });
  eq(mock.cooking.getCookSteps('pasta').length, 6);
});

test('每道菜都有独立菜谱（desc/食材/步骤/采购项）', () => {
  Object.keys(mock.DISHES).forEach((id) => {
    const r = mock.recipes.RECIPES[id];
    ok(r, id + ' 缺少菜谱');
    ok(r.desc.pre && r.desc.hl && r.desc.post, id + ' desc 不完整');
    ok(r.ingredients.length >= 4, id + ' 食材过少');
    r.ingredients.forEach((it) => ok(it.name && it.qty && typeof it.have === 'boolean', id + ' 食材字段缺失'));
    ok(r.steps.length >= 3, id + ' 步骤过少');
    r.steps.forEach((s) => ok(s.text && s.icon, id + ' 步骤字段缺失'));
    ok(r.shopping.length >= 4, id + ' 采购项过少');
    r.shopping.forEach((it) => {
      ok(it.name && it.qty, id + ' 采购项缺字段');
      ok(mock.recipes.GROUP_ORDER.indexOf(it.group) >= 0, id + ' 采购项分组非法: ' + it.group);
    });
  });
});

test('getRecipe 兜底回退 pasta', () => {
  eq(mock.recipes.getRecipe('___x___'), mock.recipes.RECIPES.pasta);
});

test('buildChecklist 按选菜聚合、同名去重、done 默认 false', () => {
  const list = mock.recipes.buildChecklist(['pasta', 'salmon']);
  ok(list.length > 0, '应生成分组');
  list.forEach((g) => {
    ok(g.title && g.icon && Array.isArray(g.items), '分组结构错误');
    const names = g.items.map((it) => it.name);
    eq(names.length, new Set(names).size, g.title + ' 组内有重复项');
    g.items.forEach((it) => {
      ok(it.name && it.qty, '清单项缺字段');
      eq(it.done, false, 'done 应默认 false');
    });
  });
  // 分组顺序遵循 GROUP_ORDER
  const order = list.map((g) => g.title);
  const expected = mock.recipes.GROUP_ORDER.filter((g) => order.indexOf(g) >= 0);
  eq(order, expected);
});

test('buildChecklist 跨菜去重（盐/黑胡椒等共用项不重复）', () => {
  const list = mock.recipes.buildChecklist(['pasta', 'salmon', 'tomato']);
  const flat = list.flatMap((g) => g.items.map((it) => g.title + '/' + it.name));
  eq(flat.length, new Set(flat).size, '同组同名应已去重');
});
