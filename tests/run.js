// 测试入口：node tests/run.js
const h = require('./_harness');

require('./base64.test');
require('./store.test');
require('./icons.test');
require('./mock.test');

console.log('\n治愈点餐 · 逻辑测试\n');
const fail = h.run();
process.exit(fail ? 1 : 0);
