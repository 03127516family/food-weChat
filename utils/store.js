// store.js —— 心愿单/已送出 全局状态单例：本地持久化 + 订阅通知。
// 纯逻辑在 store.logic.js（可测）；这里只负责持久化与广播。
const logic = require('./store.logic');
const { isValidId } = require('../mock/dishes');

const STORAGE_KEY = 'zydc_wish';

let state = logic.emptyState();
let subscribers = [];
let inited = false;

function persist() {
  try {
    wx.setStorageSync(STORAGE_KEY, state);
  } catch (e) {
    // 存储失败不影响内存状态
  }
}

function notify() {
  const snapshot = getState();
  subscribers.forEach((fn) => {
    try { fn(snapshot); } catch (e) {}
  });
}

/** 启动时从本地恢复（app.onLaunch 调用一次即可，重复调用安全） */
function init() {
  if (inited) return;
  inited = true;
  let raw = null;
  try { raw = wx.getStorageSync(STORAGE_KEY); } catch (e) {}
  state = logic.sanitize(raw, isValidId);
}

/** 返回当前状态的浅拷贝（防止外部直接改内部数组） */
function getState() {
  return {
    wish: state.wish.slice(),
    sent: state.sent ? { dishes: state.sent.dishes.slice(), message: state.sent.message } : null,
    sentSeen: state.sentSeen,
  };
}

function isInWish(id) {
  return state.wish.indexOf(id) >= 0;
}

/** 采购单红点是否应显示 */
function showBadge() {
  return logic.shouldShowBadge(state);
}

/** 做饭的人打开采购单 → 熄灭红点 */
function markSentSeen() {
  if (state.sentSeen) return;
  state = logic.markSentSeen(state);
  persist();
  notify();
}

/** 切换某道菜 → 返回是否为「加入」（用于提示文案） */
function toggleWish(id) {
  const r = logic.toggleWish(state, id);
  state = r.state;
  persist();
  notify();
  return r.added;
}

function clearWish() {
  state = logic.clearWish(state);
  persist();
  notify();
}

/** 送出心愿单 → 返回是否成功（空单失败） */
function send(message) {
  const r = logic.send(state, message);
  if (!r.ok) return false;
  state = r.state;
  persist();
  notify();
  return true;
}

/**
 * 订阅状态变化。回调立即收不到当前值——需要的话自行先 getState()。
 * @returns {() => void} 退订函数
 */
function subscribe(fn) {
  subscribers.push(fn);
  return function unsubscribe() {
    subscribers = subscribers.filter((f) => f !== fn);
  };
}

module.exports = { init, getState, isInWish, showBadge, markSentSeen, toggleWish, clearWish, send, subscribe, STORAGE_KEY };
