// _harness.js —— 零依赖测试收集器 + 极简断言。
let tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function eq(actual, expected, msg) {
  const A = JSON.stringify(actual);
  const E = JSON.stringify(expected);
  if (A !== E) throw new Error((msg || 'eq') + ` → expected ${E}, got ${A}`);
}

function ok(v, msg) {
  if (!v) throw new Error(msg || 'expected truthy value');
}

function run() {
  let pass = 0;
  let fail = 0;
  for (const t of tests) {
    try {
      t.fn();
      console.log('  ✓ ' + t.name);
      pass++;
    } catch (e) {
      console.log('  ✗ ' + t.name + '\n      ' + e.message);
      fail++;
    }
  }
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  return fail;
}

module.exports = { test, eq, ok, run };
