// 云函数 notifyCook —— 她送出心愿单时调用，向做饭的人下发订阅消息。
// 依赖：app_meta/cook 里已有 openid（做饭的人先在「我的」页授权过）。
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// 订阅消息字段有长度限制（thing 类 ≤ 20 字符），统一截断。
function clip(s, n) {
  s = (s || '').trim();
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

// 北京时间（云函数服务器为 UTC，+8h 后取 UTC 各分量即为北京时间）→ "2026年06月13日 20:30"
function beijingTime() {
  const d = new Date(Date.now() + 8 * 3600 * 1000);
  const p = (n) => (n < 10 ? '0' + n : '' + n);
  return d.getUTCFullYear() + '年' + p(d.getUTCMonth() + 1) + '月' + p(d.getUTCDate()) + '日 ' + p(d.getUTCHours()) + ':' + p(d.getUTCMinutes());
}

exports.main = async (event) => {
  const { dishes = [], templateId, miniprogramState = 'formal' } = event;
  if (!templateId) return { ok: false, reason: 'NO_TEMPLATE' };

  // 取做饭的人 openid
  const doc = await db.collection('app_meta').doc('cook').get().catch(() => null);
  const touser = doc && doc.data && doc.data.openid;
  if (!touser) return { ok: false, reason: 'NO_COOK' }; // 还没人授权接收

  const n = dishes.length;
  const dishesText = clip(n ? dishes.join('、') + (n > 1 ? '等' + n + '道菜' : '') : '几道菜', 20);

  try {
    await cloud.openapi.subscribeMessage.send({
      touser,
      templateId,
      page: 'pages/shop/shop',
      miniprogramState, // 由前端按当前版本传入：developer/trial/formal
      lang: 'zh_CN',
      // 模板字段：thing2=点餐内容，time4=点餐时间
      data: {
        thing2: { value: dishesText },
        time4: { value: beijingTime() },
      },
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: (e && e.errCode) || String(e) };
  }
};
