// copy.js —— 集中管理各页静态文案与心情/快捷短语，方便统一改字。
const HOME = {
  greetLine1: '晚上好，',
  greetHl: '今天想给她做点什么？',
  greetSub: '用一餐饭的温度，治愈她的每一天',
  searchPlaceholder: '搜索菜谱、食材或灵感',
  todayBadge: '今日推荐',
  // 心情卡：icon 对应 utils/icons 名；tone 对应样式 m1..m4
  moods: [
    { label: '想吃清淡', icon: 'leaf', tone: 'm1' },
    { label: '想被哄', icon: 'heart', tone: 'm2' },
    { label: '下班很累', icon: 'moon', tone: 'm3' },
    { label: '想吃甜一点', icon: 'cupcake', tone: 'm4' },
  ],
};

const MENU = {
  title: '治愈菜单',
  sub: '为她精选的每一道温柔料理',
};

const SHOP = {
  title: '今晚准备',
  sub: '用心准备，治愈她的一天',
  tonightTitle: '她今晚想吃',
  tonightFoot: '她为你点的温柔一餐',
  herWho: '— 她悄悄说',
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
  sentDesc: '你的心愿单已经送到他那里啦～\n他会收到提醒，看看你今晚想吃什么。',
  sentMailTag: '已通过邮件通知他',
};

module.exports = { HOME, MENU, SHOP, WISH };
