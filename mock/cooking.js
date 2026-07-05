// cooking.js —— 「开始做饭」页的分步引导 + 计时。全静态。
// 一步 = { title, hb(标题末尾是否带♥), hint(✨小提示), sug(建议秒数), tip(小贴士), img(占位图文字) }
// pasta 有完整 6 步（对齐原型）；其余菜品由各自 recipes.steps 自动生成 3 步，保证每道菜都能进入做饭流程。
const recipes = require('./recipes');

const COOK = {
  pasta: [
    { title: '洗净食材，备好配料', hb: true, hint: '✨ 蘑菇切片，蒜切末，欧芹切碎备用～', sug: 300, tip: '食材提前备齐，下锅就不慌啦～', img: '备菜中' },
    { title: '水中加盐，下意面煮 8 分熟', hb: false, hint: '✨ 加一点盐和橄榄油，面条更有味也不黏～', sug: 480, tip: '煮到八分熟就好，后面还要回锅吸汁哦～', img: '煮面中' },
    { title: '热锅融化黄油，爆香蒜末', hb: false, hint: '✨ 小火慢煎，蒜香出来就够啦，别炒糊～', sug: 60, tip: '黄油不要烧太热，微微冒泡时下蒜最香～', img: '爆香中' },
    { title: '加入蘑菇翻炒至变软，再倒入淡奶油', hb: true, hint: '✨ 中小火慢炒，蘑菇出水后会更香哦～', sug: 180, tip: '蘑菇不要炒太久，保持嫩滑口感更好吃～', img: '炒蘑菇' },
    { title: '小火煮酱至微微浓稠', hb: false, hint: '✨ 加入黑胡椒和少许盐，慢慢收汁～', sug: 120, tip: '酱汁能挂住勺背就刚刚好，别收太干～', img: '煮酱中' },
    { title: '放入意面拌匀，撒欧芹装盘', hb: true, hint: '✨ 拌匀让每根面都裹上奶香，温柔出锅～', sug: 60, tip: '装盘时转两圈更好看，再撒点黑胡椒提香～', img: '装盘中' },
  ],
};

const AUTO_SUG = [300, 300, 180]; // 自动生成时各步的建议秒数
const AUTO_IMG = ['备菜中', '烹饪中', '装盘中'];

/**
 * 取某道菜的做饭分步。有专门编排则用之，否则由 recipes.steps 自动生成。
 * @param {string} id 菜品 id
 * @returns {Array<{title,hb,hint,sug,tip,img}>}
 */
function getCookSteps(id) {
  if (COOK[id]) return COOK[id];
  const r = recipes.getRecipe(id);
  return r.steps.map((s, i) => ({
    title: s.text,
    hb: i % 2 === 0,
    hint: '✨ 跟着步骤慢慢来，享受下厨的过程～',
    sug: AUTO_SUG[i] != null ? AUTO_SUG[i] : 180,
    tip: '不慌不忙，用心做的饭最好吃～',
    img: AUTO_IMG[i] != null ? AUTO_IMG[i] : '烹饪中',
  }));
}

module.exports = { COOK, getCookSteps };
