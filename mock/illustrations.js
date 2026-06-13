// illustrations.js —— 没有真实照片的菜品，用与配色统一的扁平插画（SVG → base64 data-uri）。
// 这样 dish.img 直接是一张可用图片，所有 <image src> 无需改动即可显示。
// 想换成真实照片：把图片放进 assets/images，再把对应 dish 的 img 改成 '/assets/images/xxx.png'。
const base64 = require('../utils/base64');

function dataUri(svg) {
  return 'data:image/svg+xml;base64,' + base64.encode(svg);
}

// 玉米胡萝卜排骨汤（俯视一碗汤：排骨 + 玉米 + 胡萝卜 + 葱花 + 热气）
const SOUP_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
  '<defs>' +
  '<radialGradient id="bg" cx="32%" cy="22%" r="92%"><stop offset="0%" stop-color="#FBF1E9"/><stop offset="100%" stop-color="#ECDCCB"/></radialGradient>' +
  '<radialGradient id="broth" cx="40%" cy="34%" r="72%"><stop offset="0%" stop-color="#F1D9AC"/><stop offset="100%" stop-color="#E2BC83"/></radialGradient>' +
  '</defs>' +
  '<rect width="400" height="400" fill="url(#bg)"/>' +
  '<circle cx="200" cy="206" r="156" fill="#FCF7F0"/>' +
  '<circle cx="200" cy="206" r="140" fill="#F2E6D4"/>' +
  '<circle cx="200" cy="206" r="120" fill="url(#broth)"/>' +
  // 排骨
  '<rect x="150" y="128" width="66" height="46" rx="20" fill="#C68A62"/>' +
  '<circle cx="152" cy="151" r="12" fill="#F3E4D0"/>' +
  '<rect x="206" y="208" width="58" height="42" rx="18" fill="#B87B55" transform="rotate(20 235 229)"/>' +
  '<circle cx="258" cy="246" r="11" fill="#F3E4D0"/>' +
  // 玉米
  '<g fill="#F4C748"><rect x="228" y="152" width="42" height="42" rx="11"/><rect x="138" y="234" width="40" height="38" rx="11"/></g>' +
  '<g fill="#E3AE2C" opacity=".45"><circle cx="239" cy="163" r="3.2"/><circle cx="251" cy="163" r="3.2"/><circle cx="259" cy="163" r="3.2"/><circle cx="239" cy="175" r="3.2"/><circle cx="251" cy="175" r="3.2"/><circle cx="259" cy="175" r="3.2"/></g>' +
  // 胡萝卜
  '<g><circle cx="252" cy="246" r="19" fill="#E68A3B"/><circle cx="252" cy="246" r="8.5" fill="#F0A75F"/><circle cx="132" cy="180" r="16" fill="#E68A3B"/><circle cx="132" cy="180" r="7" fill="#F0A75F"/></g>' +
  // 葱花
  '<g fill="none" stroke="#7E9270" stroke-width="5"><circle cx="206" cy="260" r="9"/><circle cx="276" cy="198" r="8"/><circle cx="172" cy="148" r="7"/></g>' +
  // 热气
  '<g fill="none" stroke="#D8C3AC" stroke-width="6" stroke-linecap="round" opacity=".5"><path d="M168 72c-10 12 8 20-2 32"/><path d="M210 62c-10 12 8 20-2 32"/><path d="M250 72c-10 12 8 20-2 32"/></g>' +
  '</svg>';

// 凉拌黄瓜（俯视一盘：黄瓜条 + 红辣椒 + 蒜末 + 香菜 + 白芝麻）
const CUCUMBER_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
  '<defs>' +
  '<radialGradient id="cbg" cx="30%" cy="20%" r="92%"><stop offset="0%" stop-color="#FBF1E9"/><stop offset="100%" stop-color="#ECDCCB"/></radialGradient>' +
  '</defs>' +
  '<rect width="400" height="400" fill="url(#cbg)"/>' +
  '<circle cx="200" cy="204" r="156" fill="#FCF7F0"/>' +
  '<circle cx="200" cy="204" r="138" fill="#F4ECDF"/>' +
  // 黄瓜条
  '<g fill="#8FB36A">' +
  '<rect x="118" y="150" width="120" height="22" rx="11" transform="rotate(-18 178 161)"/>' +
  '<rect x="158" y="184" width="132" height="22" rx="11" transform="rotate(12 224 195)"/>' +
  '<rect x="106" y="210" width="122" height="22" rx="11" transform="rotate(-8 167 221)"/>' +
  '<rect x="166" y="240" width="124" height="22" rx="11" transform="rotate(22 228 251)"/>' +
  '<rect x="126" y="266" width="112" height="20" rx="10" transform="rotate(-14 182 276)"/>' +
  '<rect x="150" y="128" width="100" height="20" rx="10" transform="rotate(8 200 138)"/>' +
  '</g>' +
  // 黄瓜高光
  '<g fill="#AEC98A" opacity=".55">' +
  '<rect x="124" y="154" width="108" height="6" rx="3" transform="rotate(-18 178 157)"/>' +
  '<rect x="164" y="188" width="118" height="6" rx="3" transform="rotate(12 224 191)"/>' +
  '<rect x="172" y="244" width="110" height="6" rx="3" transform="rotate(22 228 247)"/>' +
  '</g>' +
  // 红辣椒
  '<g fill="#D8533B"><ellipse cx="252" cy="158" rx="16" ry="7" transform="rotate(30 252 158)"/><ellipse cx="148" cy="252" rx="15" ry="6.5" transform="rotate(-20 148 252)"/><ellipse cx="212" cy="292" rx="13" ry="6" transform="rotate(15 212 292)"/></g>' +
  // 蒜末
  '<g fill="#F3EAD8"><ellipse cx="182" cy="206" rx="9" ry="6"/><ellipse cx="242" cy="228" rx="8" ry="5.5"/><ellipse cx="160" cy="180" rx="7" ry="5"/></g>' +
  // 香菜
  '<g fill="#6F9E55"><circle cx="200" cy="168" r="5"/><circle cx="170" cy="286" r="5"/><circle cx="266" cy="246" r="5"/><circle cx="232" cy="196" r="4"/></g>' +
  // 白芝麻
  '<g fill="#FBF3DD"><circle cx="192" cy="222" r="2.6"/><circle cx="214" cy="236" r="2.6"/><circle cx="178" cy="244" r="2.6"/><circle cx="236" cy="180" r="2.6"/><circle cx="158" cy="214" r="2.6"/><circle cx="206" cy="262" r="2.6"/></g>' +
  '</svg>';

module.exports = {
  soup: dataUri(SOUP_SVG),
  cucumber: dataUri(CUCUMBER_SVG),
};
