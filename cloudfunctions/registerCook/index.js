// 云函数 registerCook —— 做饭的人授权后调用，把他的 openid 记到云数据库。
// 之后她送出心愿单时，notifyCook 就知道该把提醒发给谁。
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async () => {
  const { OPENID } = cloud.getWXContext();
  // 集合不存在时先创建（已存在会报错，忽略即可）
  await db.createCollection('app_meta').catch(() => {});
  await db.collection('app_meta').doc('cook').set({
    data: { openid: OPENID, updatedAt: Date.now() },
  });
  return { ok: true, openid: OPENID };
};
