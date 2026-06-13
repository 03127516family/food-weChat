// notify.js —— 订阅消息前端封装。未配置（cloud-config 为空）时全部安全降级为 no-op，不报错。
// 角色：做饭的人在「我的」页 subscribeAsCook 授权一次；她在心愿单 sendOrderNotify 触发下发。
const cfg = require('./cloud-config');

function ready() {
  return !!(wx.cloud && cfg.ENV && cfg.TEMPLATE_ID);
}

// 当前运行版本 → 订阅消息 miniprogramState（develop→developer / trial→trial / release→formal）
function currentState() {
  const MAP = { develop: 'developer', trial: 'trial', release: 'formal' };
  try {
    return MAP[wx.getAccountInfoSync().miniProgram.envVersion] || 'formal';
  } catch (e) {
    return 'formal';
  }
}

/**
 * 做饭的人：授权接收提醒 + 把自己的 openid 记到云端。
 * @returns {Promise<{ok:boolean, reason?:string}>}
 */
function subscribeAsCook() {
  if (!ready()) return Promise.resolve({ ok: false, reason: 'NOT_CONFIGURED' });
  return new Promise((resolve) => {
    wx.requestSubscribeMessage({
      tmplIds: [cfg.TEMPLATE_ID],
      success: (res) => {
        if (res[cfg.TEMPLATE_ID] !== 'accept') {
          resolve({ ok: false, reason: 'REJECTED' });
          return;
        }
        wx.cloud
          .callFunction({ name: 'registerCook' })
          .then((r) => resolve({ ok: true, openid: r.result && r.result.openid }))
          .catch((e) => resolve({ ok: false, reason: 'CALL_FAIL:' + (e && e.errMsg) }));
      },
      fail: (e) => resolve({ ok: false, reason: 'SUBSCRIBE_FAIL:' + (e && e.errMsg) }),
    });
  });
}

/**
 * 她：送出心愿单时下发提醒给做饭的人。
 * @param {{dishes:string[], message:string}} payload
 * @returns {Promise<{ok:boolean, reason?:string}>}
 */
function sendOrderNotify(payload) {
  if (!ready()) return Promise.resolve({ ok: false, reason: 'NOT_CONFIGURED' });
  return wx.cloud
    .callFunction({ name: 'notifyCook', data: { ...payload, templateId: cfg.TEMPLATE_ID, miniprogramState: currentState() } })
    .then((r) => r.result || { ok: false })
    .catch((e) => ({ ok: false, reason: 'CALL_FAIL:' + (e && e.errMsg) }));
}

module.exports = { ready, subscribeAsCook, sendOrderNotify };
