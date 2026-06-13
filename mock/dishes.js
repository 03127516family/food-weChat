// dishes.js —— 菜品主数据（全静态）。改菜品/文案只动这里。
// 字段：id 唯一键；name 名称；img 图片；time 分钟；difficulty 难易；serves 人份；
//      tag 标签文案；tagType 标签配色(rose|sage|honey)；love 她的喜爱度%；
//      saved 是否默认已收藏；desc 一句话简介。
// img 可以是 /assets/images/xxx.png，也可以是插画 data-uri（见 ./illustrations）。
const ILLUS = require('./illustrations');

const DISHES = {
  pasta: { id: 'pasta', name: '奶油蘑菇意面', img: '/assets/images/pasta.png', time: 25, difficulty: '简单', serves: '2人份', tag: '招牌推荐', tagType: 'rose', love: 95, saved: true, desc: '浓郁奶香，温柔入心的治愈系意面' },
  wings: { id: 'wings', name: '可乐鸡翅', img: '/assets/images/wings.png', time: 30, difficulty: '简单', serves: '2人份', tag: '超级下饭', tagType: 'rose', love: 92, saved: false, desc: '酸甜浓郁，一口一个超满足' },
  salmon: { id: 'salmon', name: '香煎三文鱼', img: '/assets/images/salmon.png', time: 20, difficulty: '简单', serves: '2人份', tag: '高蛋白低脂', tagType: 'sage', love: 90, saved: false, desc: '外焦里嫩，清爽又有营养' },
  tomato: { id: 'tomato', name: '番茄炒蛋', img: '/assets/images/tomato.png', time: 15, difficulty: '简单', serves: '2人份', tag: '经典家常', tagType: 'honey', love: 88, saved: false, desc: '酸甜开胃，最熟悉的家的味道' },
  cake: { id: 'cake', name: '熔岩巧克力蛋糕', img: '/assets/images/cake.png', time: 35, difficulty: '中等', serves: '2人份', tag: '甜蜜治愈', tagType: 'rose', love: 96, saved: false, desc: '掰开流心，甜蜜瞬间融化心情' },
  soup: { id: 'soup', name: '玉米胡萝卜排骨汤', img: ILLUS.soup, time: 90, difficulty: '简单', serves: '3-4人份', tag: '暖心靓汤', tagType: 'sage', love: 94, saved: false, desc: '清甜暖胃，咕嘟慢炖的治愈靓汤' },
  cucumber: { id: 'cucumber', name: '凉拌黄瓜', img: ILLUS.cucumber, time: 25, difficulty: '简单', serves: '2人份', tag: '开胃爽口', tagType: 'sage', love: 89, saved: false, desc: '清脆爽口，酸辣开胃的快手凉菜' },
};

// 首页「今日推荐」大卡
const HOME_TODAY = 'soup';
// 首页「治愈菜单」横滑（不含今日推荐）
const HOME_MENU = ['pasta', 'wings', 'salmon', 'cucumber', 'tomato', 'cake'];
// 「治愈菜单」整页列表
const MENU_LIST = ['pasta', 'wings', 'salmon', 'soup', 'cucumber', 'tomato', 'cake'];

/** 取菜品；未命中回退到 pasta，保证页面不空 */
function getDish(id) {
  return DISHES[id] || DISHES.pasta;
}

/** dishId 是否有效（store 清洗用） */
function isValidId(id) {
  return Object.prototype.hasOwnProperty.call(DISHES, id);
}

module.exports = { DISHES, HOME_TODAY, HOME_MENU, MENU_LIST, getDish, isValidId };
