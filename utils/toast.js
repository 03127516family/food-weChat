// toast.js —— 轻量 toast（适配 Page()）。
// 页面 data 里需有 toast:{show,text}，wxml 放：
//   <view class="toast {{toast.show?'show':''}}">{{toast.text}}</view>
// 调用：const toast = require('../../utils/toast'); toast.show(this, '已加入心愿单 ♥')
let timers = new WeakMap();

function show(ctx, text) {
  const t = timers.get(ctx);
  if (t) clearTimeout(t);
  ctx.setData({ 'toast.text': text, 'toast.show': true });
  timers.set(
    ctx,
    setTimeout(() => ctx.setData({ 'toast.show': false }), 1600)
  );
}

module.exports = { show };
