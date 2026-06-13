// base64 编码测试
const { test, eq } = require('./_harness');
const { encode } = require('../utils/base64');

test('base64: 空串', () => eq(encode(''), ''));
test('base64: A', () => eq(encode('A'), 'QQ=='));
test('base64: AB', () => eq(encode('AB'), 'QUI='));
test('base64: ABC', () => eq(encode('ABC'), 'QUJD'));
test('base64: hello', () => eq(encode('hello'), 'aGVsbG8='));
test('base64: UTF-8 中', () => eq(encode('中'), '5Lit'));
test('base64: svg 片段可编码且非空', () => {
  const out = encode('<svg fill="#B26E6E"/>');
  eq(typeof out, 'string');
  if (out.length === 0) throw new Error('编码结果为空');
});
