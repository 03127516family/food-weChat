// icons.js —— SVG 图标注册表。原型里每个唯一图标按原样存储（viewBox 统一 0 0 24 24），
// 颜色处一律写 currentColor，由 components/icon 在渲染时替换为真实色。
// 新增图标：加一条，name 用语义化 kebab；保持 currentColor 占位。
const NS = 'http://www.w3.org/2000/svg';

// 每条 = 完整 <svg>，仅颜色用 currentColor 占位。统一无 width/height，尺寸由 icon 组件控制。
const ICONS = {
  // —— 爱心 / 收藏 ——
  heart: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-9.7-9.2C.9 8.4 2.6 5 5.9 5c2 0 3.3 1.2 4.1 2.4C10.8 6.2 12.1 5 14.1 5c3.3 0 5 3.4 3.6 6.8C19.5 16.4 12 21 12 21z"/></svg>`,
  'heart-line': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-9.7-9.2C.9 8.4 2.6 5 5.9 5c2 0 3.3 1.2 4.1 2.4C10.8 6.2 12.1 5 14.1 5c3.3 0 5 3.4 3.6 6.8C19.5 16.4 12 21 12 21z"/></svg>`,
  star: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.8l1.2-6.6L2.5 9l6.6-.9z"/></svg>`,

  // —— 通用箭头 / 指示 ——
  clock: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg>`,
  level: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 19v-5M12 19V9M19 19V5"/></svg>`,
  'chevron-right': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>`,
  'chevron-left': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>`,
  'chevron-down': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>`,
  'arrow-right': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M14 7l5 5-5 5"/></svg>`,
  search: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" stroke-linecap="round"/></svg>`,
  refresh: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M21 4v4h-4M3 20v-4h4"/></svg>`,
  filter: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>`,

  // —— 操作 ——
  plus: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 6v12M6 12h12"/></svg>`,
  check: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4L19 7"/></svg>`,
  close: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  trash: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13"/></svg>`,
  send: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
  mail: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6" stroke-linecap="round"/></svg>`,
  bell: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>`,
  share: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M8 8l4-4 4 4"/><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>`,
  'share-nodes': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.5 10.5l7-4M8.5 13.5l7 4"/></svg>`,

  // —— 心情 / 分类 ——
  leaf: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 8-3 14-9 14z"/><path d="M11 20c0-4 2-7 5-9" stroke-linecap="round"/></svg>`,
  'leaf-plain': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 8-3 14-9 14z"/></svg>`,
  moon: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
  cupcake: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 11l1.5 9h11L19 11"/><path d="M4 11h16M8 11a4 4 0 0 1 8 0" stroke-linecap="round"/><path d="M12 4v2" stroke-linecap="round"/></svg>`,
  veg: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22c5-4 7-8 7-11a7 7 0 0 0-14 0c0 3 2 7 7 11z"/><path d="M12 3v8" stroke-linecap="round"/></svg>`,
  egg: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3c3.3 0 6 4.5 6 9a6 6 0 0 1-12 0c0-4.5 2.7-9 6-9z"/></svg>`,
  bottle: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3h6v3l1 2v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8l1-2z"/><path d="M8 12h8" stroke-linecap="round"/></svg>`,

  // —— 人 / 设置 ——
  person: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke-linecap="round"/></svg>`,
  user: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M5 21c0-4 3.1-7 7-7s7 3 7 7" stroke-linecap="round"/></svg>`,
  calendar: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16" stroke-linecap="round"/></svg>`,
  settings: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L16 2H8l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 3 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1c.6.5 1.3.9 2 1.2L8 22h8l.5-2.6c.7-.3 1.4-.7 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/></svg>`,

  // —— 厨房 / tab 图标 ——
  home: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9" stroke-linecap="round"/></svg>`,
  bowl: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 13h16a8 8 0 0 1-16 0z"/><path d="M3 13h18" stroke-linecap="round"/><path d="M9 8c0-1.5 6-1.5 6 0" stroke-linecap="round"/></svg>`,
  clipboard: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h4" stroke-linecap="round"/></svg>`,
  bulb: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18h6M10 21h4" stroke-linecap="round"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>`,
  chef: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 21h10M8 21v-4M16 21v-4" stroke-linecap="round"/><path d="M6 8a6 6 0 0 1 12 0c0 3-2 5-2 9H8c0-4-2-6-2-9z"/></svg>`,
  quote: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h4v6c0 2.2-1.5 3.7-4 4v-2c1.2-.3 2-1 2-2H7V7zm8 0h4v6c0 2.2-1.5 3.7-4 4v-2c1.2-.3 2-1 2-2h-2V7z"/></svg>`,

  // —— 做法步骤 (sw 1.4) ——
  'step-boil': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 11h14a7 7 0 0 1-14 0z"/><path d="M3 11h18M9 5c0-1 .6-2 1.5-2M13 5c0-1 .6-2 1.5-2"/></svg>`,
  'step-fry': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="10" cy="13" r="6"/><path d="M16 13h6" stroke-linecap="round"/></svg>`,
  'step-plate': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 12h16a8 8 0 0 1-16 0z"/><path d="M9 8c0-2 6-2 6 0" stroke-linecap="round"/></svg>`,

  // —— 时间线 (sw 1.6) ——
  'tl-prep': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 11h14a7 7 0 0 1-14 0z"/><path d="M3 11h18" stroke-linecap="round"/></svg>`,
  'tl-cook': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="13" r="6"/><path d="M16 13h6" stroke-linecap="round"/></svg>`,
  'tl-plate': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 14h16a8 8 0 0 0-16 0z"/><path d="M3 18h18" stroke-linecap="round"/></svg>`,

  // —— 做饭页 控制 ——
  play: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7z"/></svg>`,
  pause: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.4"/><rect x="14" y="5" width="4" height="14" rx="1.4"/></svg>`,
  'skip-back': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>`,
  'skip-fwd': `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>`,
  utensils: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M6 3v7M4 3v3a2 2 0 0 0 4 0V3M6 10v11"/><path d="M16 3c-1.5 1-2 3-2 6s.5 4 2 4v8"/></svg>`,

  // —— 采购 / 我的 ——
  cart: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l2 12h11"/></svg>`,
  wheat: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 3c4 2 5 6 3 10M12 3c-4 2-5 6-3 10M12 13v8"/></svg>`,
  bookmark: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4v8l2.4-1.6L14 12V4"/></svg>`,
  taste: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 11h16a8 8 0 0 1-16 0z"/><path d="M3 11h18M9 7c0-1 6-1 6 0"/></svg>`,
  flower: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.4"/><path d="M12 3.2c1.5 0 2.5 1.4 1.9 2.9 1.4-.8 2.9 0 2.9 1.6s-1.5 2.4-2.9 1.6c.6 1.5-.4 2.9-1.9 2.9s-2.5-1.4-1.9-2.9c-1.4.8-2.9 0-2.9-1.6s1.5-2.4 2.9-1.6C9.5 4.6 10.5 3.2 12 3.2z"/></svg>`,
  info: `<svg xmlns="${NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>`,
};

/**
 * 取图标模板（含 currentColor 占位）。未命中返回空字符串。
 * @param {string} name
 * @returns {string}
 */
function getIcon(name) {
  return ICONS[name] || '';
}

module.exports = { ICONS, getIcon };
