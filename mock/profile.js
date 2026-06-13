// profile.js —— 「我的」页数据。
const PROFILE = {
  name: '为她下厨的人',
  streakText: '已连续为她做饭',
  streakDays: 1,
  stats: [
    { v: '1', k: '做过的菜' },
    { v: '1', k: '连续天数' },
    { v: '100%', k: '她的好评' },
  ],
  // menu 项：icon 对应 utils/icons 名
  menu: [
    { label: '她的收藏夹', icon: 'heart' },
    { label: '做饭日历', icon: 'calendar' },
    { label: '她的口味偏好', icon: 'star' },
    { label: '设置', icon: 'settings' },
  ],
};

module.exports = { PROFILE };
