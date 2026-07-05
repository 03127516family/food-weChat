// profile.js —— 「我的」页数据。avatar 为真实头像图；stats 三项统计；menu 六行入口。
const PROFILE = {
  avatar: '/assets/images/avatar-couple.png',
  name: '饭团小熊',
  desc: '一起做饭，一起成长，一起变成更好的人 ✨',
  // 统计三宫格：icon 对应 utils/icons 名；tone 对应配色 rose/sage/honey
  stats: [
    { v: '12', k: '本月做饭次数', icon: 'chef', tone: 'rose' },
    { v: '36', k: '收藏菜谱数量', icon: 'bookmark', tone: 'sage' },
    { v: '9', k: '成功晚餐次数', icon: 'heart', tone: 'honey' },
  ],
  // menu 行：icon 对应 utils/icons 名；tone 配色；desc 副标题
  menu: [
    { label: '口味偏好', desc: '告诉我们你们喜欢的口味', icon: 'taste', tone: 'rose' },
    { label: '忌口设置', desc: '添加忌口，贴心推荐更合适的菜谱', icon: 'leaf', tone: 'sage' },
    { label: '收藏记录', desc: '你们喜欢的菜谱都在这里', icon: 'flower', tone: 'rose' },
    { label: '做饭记录', desc: '记录每一次下厨的美好时刻', icon: 'calendar', tone: 'honey' },
    { label: '最近做过', desc: '快速找到最近做过的菜谱', icon: 'clock', tone: 'sage' },
    { label: '关于我们', desc: '了解情侣做饭助手的更多故事', icon: 'info', tone: 'rose' },
  ],
  loveTitle: '每一顿饭，都是爱的表达',
  loveSub: '愿你们在烟火气中，收获满满的幸福',
};

module.exports = { PROFILE };
