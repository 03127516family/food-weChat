// store 纯逻辑测试
const { test, eq, ok } = require('./_harness');
const logic = require('../utils/store.logic');
const { isValidId } = require('../mock/dishes');

test('初始状态为空', () => eq(logic.emptyState(), { wish: [], sent: null, sentSeen: false }));

test('toggleWish 添加', () => {
  const r = logic.toggleWish(logic.emptyState(), 'pasta');
  eq(r.added, true);
  eq(r.state.wish, ['pasta']);
});

test('toggleWish 移除', () => {
  const s = { wish: ['pasta'], sent: null, sentSeen: false };
  const r = logic.toggleWish(s, 'pasta');
  eq(r.added, false);
  eq(r.state.wish, []);
});

test('clearWish 清空但保留 sent', () => {
  const s = { wish: ['pasta', 'cake'], sent: { dishes: ['x'], message: 'hi' }, sentSeen: true };
  eq(logic.clearWish(s).wish, []);
  eq(logic.clearWish(s).sent, { dishes: ['x'], message: 'hi' });
});

test('send 固化并清空、点亮红点', () => {
  const s = { wish: ['pasta', 'salmon'], sent: null, sentSeen: true };
  const r = logic.send(s, '  今天好累  ');
  eq(r.ok, true);
  eq(r.state.wish, []);
  eq(r.state.sent.dishes, ['pasta', 'salmon']);
  eq(r.state.sent.message, '今天好累'); // 已 trim
  eq(r.state.sentSeen, false);
});

test('send 空单失败', () => {
  const r = logic.send(logic.emptyState(), '空');
  eq(r.ok, false);
});

test('markSentSeen 熄灭红点', () => {
  const s = { wish: [], sent: { dishes: ['pasta'], message: '' }, sentSeen: false };
  ok(logic.shouldShowBadge(s), '送出后应显示红点');
  const s2 = logic.markSentSeen(s);
  ok(!logic.shouldShowBadge(s2), '查看后应熄灭');
});

test('shouldShowBadge 无 sent 时为 false', () => {
  ok(!logic.shouldShowBadge(logic.emptyState()));
});

test('sanitize 过滤非法 dishId', () => {
  const raw = { wish: ['pasta', 'NOPE', 'cake'], sent: { dishes: ['salmon', 'BAD'], message: 5 }, sentSeen: 1 };
  const s = logic.sanitize(raw, isValidId);
  eq(s.wish, ['pasta', 'cake']);
  eq(s.sent.dishes, ['salmon']);
  eq(s.sent.message, ''); // 非字符串归一
  eq(s.sentSeen, true);
});

test('sanitize 处理垃圾输入', () => {
  eq(logic.sanitize(null, isValidId), { wish: [], sent: null, sentSeen: false });
  eq(logic.sanitize('garbage', isValidId), { wish: [], sent: null, sentSeen: false });
});
