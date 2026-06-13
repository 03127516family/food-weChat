// store.logic.js —— 纯函数 reducer（不依赖小程序运行时，可在 Node 直接测）。
// 状态形状：{
//   wish: string[],                                  // 当前心愿单
//   sent: { dishes: string[], message: string }|null,// 已送出的一单
//   sentSeen: boolean                                // 做饭的人是否已查看（控制采购单红点）
// }

/** 安全初始状态 */
function emptyState() {
  return { wish: [], sent: null, sentSeen: false };
}

/**
 * 校验 / 清洗持久化读出的状态，丢弃非法 dishId。
 * @param {any} raw 任意来源数据
 * @param {(id:string)=>boolean} isValidId 判断 dishId 是否存在
 */
function sanitize(raw, isValidId) {
  const s = raw && typeof raw === 'object' ? raw : {};
  const wish = Array.isArray(s.wish) ? s.wish.filter(isValidId) : [];
  let sent = null;
  if (s.sent && Array.isArray(s.sent.dishes)) {
    const dishes = s.sent.dishes.filter(isValidId);
    sent = { dishes, message: typeof s.sent.message === 'string' ? s.sent.message : '' };
  }
  return { wish, sent, sentSeen: !!s.sentSeen };
}

/** 切换某道菜的心愿单状态，返回 { state, added } */
function toggleWish(state, id) {
  const i = state.wish.indexOf(id);
  const wish = state.wish.slice();
  const added = i < 0;
  if (added) wish.push(id);
  else wish.splice(i, 1);
  return { state: { ...state, wish }, added };
}

/** 清空心愿单 */
function clearWish(state) {
  return { ...state, wish: [] };
}

/** 送出：把当前心愿单 + 留言固化为 sent，清空 wish，并点亮红点（sentSeen=false） */
function send(state, message) {
  if (state.wish.length === 0) return { state, ok: false };
  return {
    state: {
      wish: [],
      sent: { dishes: state.wish.slice(), message: (message || '').trim() },
      sentSeen: false,
    },
    ok: true,
  };
}

/** 标记已查看（做饭的人打开采购单）→ 熄灭红点 */
function markSentSeen(state) {
  return { ...state, sentSeen: true };
}

/** 采购单红点是否应显示 */
function shouldShowBadge(state) {
  return !!state.sent && !state.sentSeen;
}

module.exports = { emptyState, sanitize, toggleWish, clearWish, send, markSentSeen, shouldShowBadge };
