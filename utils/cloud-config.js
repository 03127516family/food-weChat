// cloud-config.js —— 云开发 + 订阅消息 的两处配置。开通后把这两项填上即可启用真实提醒。
// 两项都为空时，App 仍按纯静态原型正常运行（送出只弹动效，不发通知）。
module.exports = {
  // 1) 云开发环境 ID：开发者工具「云开发」创建环境后复制（形如 'zhiyu-xxxxx'）
  ENV: 'cloud1-d8gj12jsff26d90db',

  // 2) 订阅消息模板 ID：小程序后台「功能 → 订阅消息」从公共模板库选一个「通知/提醒」类模板后得到
  TEMPLATE_ID: 'yHirVI68ZCYKv8ALxA-nsmMzgyAodjpLUTN2Dqbm-2Y',
};
