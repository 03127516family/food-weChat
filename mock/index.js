// index.js —— mock 数据汇总出口。页面统一从这里取：const mock = require('../../mock/index')
const dishes = require('./dishes');
const recipes = require('./recipes');
const cooking = require('./cooking');
const shopping = require('./shopping');
const profile = require('./profile');
const copy = require('./copy');

module.exports = {
  ...dishes, // DISHES, HOME_TODAY, HOME_GRID, MENU_LIST, FILTERS, getDish, isValidId
  recipes, // { RECIPES, INGREDIENT_HINT, getRecipe, buildChecklist, GROUP_ORDER, GROUP_ICON }
  cooking, // { COOK, getCookSteps }
  shopping, // { DEFAULT_TONIGHT, TIMELINE }
  ...profile, // PROFILE
  copy, // { HOME, MENU, TONIGHT, WISH }
};
