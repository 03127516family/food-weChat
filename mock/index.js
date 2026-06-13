// index.js —— mock 数据汇总出口。页面统一从这里取：const mock = require('../../mock/index')
const dishes = require('./dishes');
const recipes = require('./recipes');
const shopping = require('./shopping');
const profile = require('./profile');
const copy = require('./copy');

module.exports = {
  ...dishes, // DISHES, HOME_TODAY, HOME_MENU, MENU_LIST, getDish, isValidId
  recipes, // { RECIPES, INGREDIENT_HINT, getRecipe, buildChecklist, ... }
  shopping, // { DEFAULT_TONIGHT, TIMELINE }
  ...profile, // PROFILE
  copy, // { HOME, MENU, SHOP, WISH }
};
