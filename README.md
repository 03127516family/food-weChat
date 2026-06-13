# 治愈点餐 · 为她下厨（微信小程序）

一个治愈风的「为她下厨」小程序：**她**选菜 → 写一句撒娇留言 → 送出（邮件提醒效果）→ **做饭的人**在「采购单」看到她想吃什么 + 留言。

由 [claude.ai/design](https://claude.ai/design) 导出的 HTML 高保真原型（`design-source/治愈点餐 App.html`）**像素级还原**为结构清晰、全静态、易二次开发的小程序。

## 快速开始

1. 用**微信开发者工具**打开本目录。
2. 渲染器：经典 **WebView**（非 Skyline，见 `CLAUDE.md`）。`app.json` 已配 `navigationStyle:custom` + 自定义 tabBar。
3. 直接预览即可，**无需任何后端**——所有数据是静态的。

> 逻辑测试（纯函数，零依赖）：`node tests/run.js`

## 页面

| 页面 | 路径 | 说明 |
| --- | --- | --- |
| 首页 | `pages/home` | 问候 / 搜索 / 今日推荐 / 治愈菜单横滑 / 心情卡（tab 0）|
| 菜单 | `pages/menu` | 治愈菜单整页列表（tab 1）|
| 采购单 | `pages/shop` | 做饭的人视角：今晚准备 + 她的留言 + 采购清单 + 时间线（tab 2）|
| 我的 | `pages/mine` | 个人统计与入口（tab 3）|
| 详情 | `pages/detail` | 菜品详情 + 食材 + 步骤（push 子页）|
| 心愿单 | `pages/wish` | 选菜 → 写留言 → 送出确认动效（push 子页，核心闭环）|

## 目录结构

```
app.{js,json,wxss}     全局入口 / 配置 / 样式
styles/                tokens.wxss（设计变量）+ shared.wxss（共享原子类）
mock/                  ★ 全部静态数据，按领域分文件，改数据只动这里
utils/                 store（状态+持久化）/ store.logic（纯reducer）/ icons / base64 / colors / toast
components/            icon / dish-card / menu-item / wish-bar / section-head / status-bar
custom-tab-bar/        自定义 tabBar（毛玻璃 + 玫瑰高亮 + 采购单红点）
pages/                 home / detail / shop / menu / mine / wish
assets/images/         菜品 & 食材图（来自原型）
tests/                 逻辑单测，node tests/run.js
design-source/         原始 HTML 原型 + 截图（仅参考，打包时忽略）
CLAUDE.md              ★ 工程规范 + 决策日志（自我维护，先读它）
```

## 想改什么，动哪里

- **改菜品 / 文案 / 数量** → 只动 `mock/`（`dishes.js` / `recipe.js` / `shopping.js` / `profile.js` / `copy.js`）。页面会自动跟着变。
- **改配色 / 圆角 / 阴影** → `styles/tokens.wxss`（CSS 变量）。⚠️ 给图标用的 JS 调色板 `utils/colors.js` 要同步改。
- **加图标** → 往 `utils/icons.js` 加一条（颜色处写 `currentColor`），页面用 `<icon name="..." />`。
- **改交互状态逻辑** → `utils/store.logic.js`（纯函数，有测试）。

## 关键技术点

- **SVG 图标**：小程序 WXML 不渲染内联 `<svg>`。`utils/icons.js` 存原始 SVG，`components/icon` 注入颜色后转 base64 用 `<image>` 渲染（带缓存）。
- **状态管理**：`utils/store.js` 单例 + `wx.setStorageSync` 持久化 + 订阅广播；组件/页面订阅后 `setData`。
- **尺寸换算**：设计 px × 2 = rpx（1px 细线保留）。详见 `CLAUDE.md` 第 5 节。

更多约定与踩坑见 **`CLAUDE.md`**。
