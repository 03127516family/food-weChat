// copy.js —— 集中管理各页静态文案与心情/快捷短语，方便统一改字。
const HOME = {
  greetHl: '今晚想给她做点什么？',
  greetSub: '用一顿饭，治愈彼此的每一天 ✨',
  searchPlaceholder: '搜索菜谱、食材或场景',
  todayBadge: '今日主推',
  todayTop: '人气Top1',
  gridTitle: '治愈菜单',
  // 心情卡：icon 对应 utils/icons 名；tone 对应样式 m1..m4
  moods: [
    { label: '想吃清淡', icon: 'leaf', tone: 'm1' },
    { label: '下班很累', icon: 'moon', tone: 'm2' },
    { label: '想吃甜一点', icon: 'cupcake', tone: 'm3' },
    { label: '想被安慰', icon: 'heart', tone: 'm4' },
  ],
  loveTitle: '爱是一起吃很多很多顿饭',
  loveSub: '一起下厨，一起成长，一起变成更好的人',
};

const MENU = {
  title: '菜谱',
  searchPlaceholder: '搜索菜谱、食材或场景',
};

// 「今晚」页（做饭的人视角，原采购单 shop 升级版）
const TONIGHT = {
  title: '今晚',
  cardTitle: '今晚我们一起做',
  note: '一起动手，\n把平凡的一天\n变得很甜很暖～',
  totalLabel: '预计总耗时',
  peopleLabel: '适合人数',
  shopTitle: '采购清单',
  shopMode: '去超市模式',
  tip: '提前备齐食材，做饭更从容哦～',
  herWho: '— 她悄悄说',
  startCook: '开始做饭',
};

const WISH = {
  title: '今晚想吃这些 ♥',
  sub: '选好菜，写句话，悄悄提醒他来做',
  msgLabel: '给他留一句话',
  msgPlaceholder: '今天有点累，好想吃你做的饭呀～',
  msgMax: 60,
  phrases: ['今天好累，想吃你做的饭 🥺', '辛苦啦，等你回家 ♥', '想被你哄一下嘛～', '做给我吃好不好'],
  // 浮动心愿单条
  barSub: '写句话，提醒他来做 ♥',
  // 空状态
  emptyTitle: '还没选菜呀',
  emptyDesc: '去菜单里挑几道想吃的，\n写句话一起送给他 ♥',
  // 送出确认页
  sentTitle: '已悄悄提醒他 ♥',
  sentDesc: '你的心愿单已经送到他那里啦～\n他会在「今晚」收到提醒，看看你想吃什么。',
  sentMailTag: '已记录到今晚',
};

module.exports = { HOME, MENU, TONIGHT, WISH };
