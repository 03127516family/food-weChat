// recipes.js —— 每道菜各自的菜谱（详情页）+ 采购项（采购单聚合用）。全静态，集中管理。
// 一道菜 = {
//   desc: { pre, hl, post },                     // 详情页简介（hl 段高亮）
//   ingredients: [{ name, qty, img?, have }],     // 食材（img 没有则详情页用占位；have=已备齐显示对勾）
//   steps: [{ text, icon }],                       // 做法步骤（icon 取自 utils/icons：step-boil/step-fry/step-plate）
//   shopping: [{ group, name, qty }],             // 采购项；group ∈ 主食/肉蛋/蔬菜/调味
// }
//
// 食材缩略图目前仅意面这套有真图（assets/images/ing_*.png）。其余食材用占位块，
// 想换真图：把图片放进 assets/images，再给对应 ingredient 补 img 字段即可。
const IMG = {
  pasta: '/assets/images/ing_pasta.png',
  mushroom: '/assets/images/ing_mushroom.png',
  cream: '/assets/images/ing_cream.png',
  garlic: '/assets/images/ing_garlic.png',
  pepper: '/assets/images/ing_pepper.png',
  parsley: '/assets/images/ing_parsley.png',
};

const RECIPES = {
  pasta: {
    desc: { pre: '浓郁奶香包裹每一根意面，蘑菇的鲜美与黑胡椒的微辛 ', hl: '温柔治愈', post: '，让她从心底感到满足。' },
    ingredients: [
      { name: '意面', qty: '200g', img: IMG.pasta, have: true },
      { name: '蘑菇', qty: '150g', img: IMG.mushroom, have: true },
      { name: '淡奶油', qty: '150ml', img: IMG.cream, have: true },
      { name: '蒜末', qty: '1大勺', img: IMG.garlic, have: true },
      { name: '黑胡椒', qty: '适量', img: IMG.pepper, have: true },
      { name: '欧芹', qty: '适量', img: IMG.parsley, have: true },
    ],
    steps: [
      { text: '水中加盐，放入意面煮 8–10 分钟至八分熟，捞出沥干备用。', icon: 'step-boil' },
      { text: '热锅融化黄油，放入蒜末爆香，加入蘑菇片翻炒至软化出水。', icon: 'step-fry' },
      { text: '倒入淡奶油，加入黑胡椒和少许盐，煮至微微浓稠后，放入意面拌匀。', icon: 'step-plate' },
    ],
    shopping: [
      { group: '主食', name: '意大利面', qty: '100g' },
      { group: '蔬菜', name: '口蘑', qty: '150g' },
      { group: '蔬菜', name: '洋葱', qty: '1/2个' },
      { group: '调味', name: '淡奶油', qty: '100ml' },
      { group: '调味', name: '黄油', qty: '20g' },
      { group: '调味', name: '黑胡椒', qty: '适量' },
      { group: '调味', name: '盐', qty: '适量' },
    ],
  },

  wings: {
    desc: { pre: '可乐与酱油慢慢收汁，裹住每一只鸡翅，咸甜油亮、', hl: '超级下饭', post: '，让她忍不住多添一碗饭。' },
    ingredients: [
      { name: '鸡翅中', qty: '8只', have: false },
      { name: '可乐', qty: '1罐', have: true },
      { name: '生抽', qty: '2勺', have: true },
      { name: '姜', qty: '3片', have: true },
      { name: '蒜末', qty: '1勺', img: IMG.garlic, have: true },
      { name: '葱段', qty: '适量', have: false },
    ],
    steps: [
      { text: '鸡翅两面各划两刀，冷水下锅焯去血水，捞出沥干。', icon: 'step-boil' },
      { text: '热锅少油，放入鸡翅煎至两面金黄，加姜蒜爆香。', icon: 'step-fry' },
      { text: '倒入可乐没过鸡翅，加生抽，大火烧开转小火收汁至浓稠亮色。', icon: 'step-plate' },
    ],
    shopping: [
      { group: '肉蛋', name: '鸡翅中', qty: '8只' },
      { group: '蔬菜', name: '姜', qty: '1块' },
      { group: '蔬菜', name: '蒜', qty: '2瓣' },
      { group: '蔬菜', name: '香葱', qty: '2根' },
      { group: '调味', name: '可乐', qty: '1罐' },
      { group: '调味', name: '生抽', qty: '适量' },
      { group: '调味', name: '食用油', qty: '适量' },
    ],
  },

  salmon: {
    desc: { pre: '外皮煎得焦香，内里依旧粉嫩多汁，挤上柠檬 ', hl: '清爽不腻', post: '，是忙碌一天后的温柔慰藉。' },
    ingredients: [
      { name: '三文鱼', qty: '200g', have: false },
      { name: '柠檬', qty: '半个', have: false },
      { name: '黑胡椒', qty: '适量', img: IMG.pepper, have: true },
      { name: '海盐', qty: '适量', have: true },
      { name: '黄油', qty: '10g', have: true },
      { name: '芦笋', qty: '6根', have: false },
    ],
    steps: [
      { text: '三文鱼用厨房纸吸干水分，两面撒海盐和黑胡椒腌 5 分钟。', icon: 'step-plate' },
      { text: '热锅放黄油，鱼皮朝下中火煎 3 分钟至金黄，翻面再煎 2 分钟。', icon: 'step-fry' },
      { text: '关火挤上柠檬汁，配煎香的芦笋一起装盘。', icon: 'step-plate' },
    ],
    shopping: [
      { group: '肉蛋', name: '三文鱼', qty: '200g' },
      { group: '蔬菜', name: '柠檬', qty: '1个' },
      { group: '蔬菜', name: '芦笋', qty: '1把' },
      { group: '调味', name: '黄油', qty: '10g' },
      { group: '调味', name: '海盐', qty: '适量' },
      { group: '调味', name: '黑胡椒', qty: '适量' },
    ],
  },

  tomato: {
    desc: { pre: '番茄熬出红亮的汁，裹着滑嫩的炒蛋，酸甜开胃、', hl: '最熟悉的家常味', post: '，一口就想起家。' },
    ingredients: [
      { name: '番茄', qty: '2个', have: false },
      { name: '鸡蛋', qty: '3个', have: true },
      { name: '葱花', qty: '适量', have: false },
      { name: '糖', qty: '1小勺', have: true },
      { name: '盐', qty: '适量', have: true },
      { name: '食用油', qty: '适量', have: true },
    ],
    steps: [
      { text: '番茄切块，鸡蛋打散加少许盐搅匀备用。', icon: 'step-plate' },
      { text: '热油倒入蛋液炒至凝固盛出；再下番茄炒出红汁。', icon: 'step-fry' },
      { text: '倒回鸡蛋，加糖和盐翻匀，撒上葱花即可出锅。', icon: 'step-plate' },
    ],
    shopping: [
      { group: '肉蛋', name: '鸡蛋', qty: '3个' },
      { group: '蔬菜', name: '番茄', qty: '2个' },
      { group: '蔬菜', name: '香葱', qty: '1根' },
      { group: '调味', name: '糖', qty: '1小勺' },
      { group: '调味', name: '盐', qty: '适量' },
      { group: '调味', name: '食用油', qty: '适量' },
    ],
  },

  cake: {
    desc: { pre: '掰开的瞬间巧克力缓缓流出，外层微脆内里熔岩、', hl: '甜蜜治愈', post: '，把好心情一勺勺挖给她。' },
    ingredients: [
      { name: '黑巧克力', qty: '100g', have: false },
      { name: '黄油', qty: '60g', have: true },
      { name: '鸡蛋', qty: '2个', have: true },
      { name: '细砂糖', qty: '50g', have: true },
      { name: '低筋面粉', qty: '40g', have: false },
      { name: '可可粉', qty: '适量', have: false },
    ],
    steps: [
      { text: '黑巧克力与黄油隔水融化，搅拌顺滑后放凉备用。', icon: 'step-fry' },
      { text: '鸡蛋加糖打发，拌入巧克力液，筛入面粉切拌均匀。', icon: 'step-plate' },
      { text: '倒入模具，190℃ 烤 10 分钟，至边缘凝固中心微微晃动即可。', icon: 'step-plate' },
    ],
    shopping: [
      { group: '主食', name: '低筋面粉', qty: '40g' },
      { group: '肉蛋', name: '鸡蛋', qty: '2个' },
      { group: '肉蛋', name: '黄油', qty: '60g' },
      { group: '调味', name: '黑巧克力', qty: '100g' },
      { group: '调味', name: '细砂糖', qty: '50g' },
      { group: '调味', name: '可可粉', qty: '适量' },
    ],
  },

  soup: {
    desc: { pre: '玉米的清甜、胡萝卜的回甘，慢炖进排骨的鲜，', hl: '一碗下肚浑身都暖', post: '，把一天的疲惫都熨平了。' },
    ingredients: [
      { name: '排骨', qty: '500g', have: false },
      { name: '玉米', qty: '1根', have: false },
      { name: '胡萝卜', qty: '1根', have: false },
      { name: '姜', qty: '3片', have: true },
      { name: '葱', qty: '2根', have: true },
      { name: '盐', qty: '适量', have: true },
    ],
    steps: [
      { text: '排骨冷水下锅焯水，撇去浮沫后捞出冲净。', icon: 'step-boil' },
      { text: '排骨与姜片放入锅中，加足量清水，大火烧开转小火炖 40 分钟。', icon: 'step-fry' },
      { text: '放入玉米段和胡萝卜块，再炖 30 分钟，加盐调味，撒葱花即可。', icon: 'step-plate' },
    ],
    shopping: [
      { group: '肉蛋', name: '排骨', qty: '500g' },
      { group: '蔬菜', name: '玉米', qty: '1根' },
      { group: '蔬菜', name: '胡萝卜', qty: '1根' },
      { group: '蔬菜', name: '姜', qty: '1块' },
      { group: '蔬菜', name: '香葱', qty: '2根' },
      { group: '调味', name: '盐', qty: '适量' },
    ],
  },

  cucumber: {
    desc: { pre: '拍黄瓜切条，盐糖杀水后浇上酸辣料汁，再淋一勺热油激香，', hl: '清脆爽口', post: '，三两下就上桌的快手开胃凉菜。' },
    ingredients: [
      { name: '黄瓜', qty: '2根', have: false },
      { name: '蒜', qty: '3瓣', have: true },
      { name: '小米辣', qty: '2个', have: false },
      { name: '香菜', qty: '1棵', have: false },
      { name: '白芝麻', qty: '1勺', have: true },
      { name: '花椒', qty: '适量', have: true },
    ],
    steps: [
      { text: '黄瓜切成条，放入盐和糖腌制 20 分钟，杀出多余水分。', icon: 'step-plate' },
      { text: '把腌好的黄瓜多洗几遍，沥干水分。', icon: 'step-boil' },
      { text: '加几圈生抽、2 勺糖、鸡精、醋、香油、蒜末、辣椒、香菜拌匀；最后热油爆香白芝麻和花椒淋上即可。', icon: 'step-fry' },
    ],
    shopping: [
      { group: '蔬菜', name: '黄瓜', qty: '2根' },
      { group: '蔬菜', name: '蒜', qty: '3瓣' },
      { group: '蔬菜', name: '小米辣', qty: '2个' },
      { group: '蔬菜', name: '香菜', qty: '1棵' },
      { group: '调味', name: '生抽', qty: '适量' },
      { group: '调味', name: '糖', qty: '2勺' },
      { group: '调味', name: '醋', qty: '适量' },
      { group: '调味', name: '香油', qty: '适量' },
      { group: '调味', name: '鸡精', qty: '适量' },
      { group: '调味', name: '白芝麻', qty: '适量' },
      { group: '调味', name: '花椒', qty: '适量' },
    ],
  },
};

const INGREDIENT_HINT = '点击食材可查看小贴士';

// 采购单分组：顺序 + 图标
const GROUP_ORDER = ['主食', '肉蛋', '蔬菜', '调味'];
const GROUP_ICON = { 主食: 'leaf-plain', 肉蛋: 'egg', 蔬菜: 'veg', 调味: 'bottle' };

/** 取某道菜的菜谱；未命中回退 pasta，保证详情页不空 */
function getRecipe(id) {
  return RECIPES[id] || RECIPES.pasta;
}

/**
 * 由「今晚要做的菜」聚合出采购清单：按分组归并、同名去重（保留先出现的用量）。
 * @param {string[]} ids 菜品 id 数组
 * @returns {Array<{title,icon,items:Array<{name,qty,done}>}>}
 */
function buildChecklist(ids) {
  const byGroup = {};
  ids.forEach((id) => {
    const r = RECIPES[id];
    if (!r) return;
    r.shopping.forEach((it) => {
      if (!byGroup[it.group]) byGroup[it.group] = {};
      if (!byGroup[it.group][it.name]) {
        byGroup[it.group][it.name] = { name: it.name, qty: it.qty, done: false };
      }
    });
  });
  return GROUP_ORDER.filter((g) => byGroup[g]).map((g) => ({
    title: g,
    icon: GROUP_ICON[g],
    items: Object.keys(byGroup[g]).map((n) => byGroup[g][n]),
  }));
}

module.exports = { RECIPES, INGREDIENT_HINT, GROUP_ORDER, GROUP_ICON, getRecipe, buildChecklist };
