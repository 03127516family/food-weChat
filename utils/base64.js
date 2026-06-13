// base64.js —— UTF-8 安全的 base64 编码（小程序无 btoa）。
// 仅用于把 SVG 字符串编码成 data-uri 给 <image> 用。纯函数，可在 Node 直接测。
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
 * 将字符串按 UTF-8 编码为 base64。
 * @param {string} str
 * @returns {string}
 */
function encode(str) {
  // 1) 字符串 -> UTF-8 字节数组
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0xd800 || code >= 0xe000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      // 代理对
      i++;
      code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f)
      );
    }
  }

  // 2) 字节数组 -> base64
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : NaN;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : NaN;
    out += CHARS[b0 >> 2];
    out += CHARS[((b0 & 3) << 4) | (isNaN(b1) ? 0 : b1 >> 4)];
    out += isNaN(b1) ? '=' : CHARS[((b1 & 15) << 2) | (isNaN(b2) ? 0 : b2 >> 6)];
    out += isNaN(b2) ? '=' : CHARS[b2 & 63];
  }
  return out;
}

module.exports = { encode };
