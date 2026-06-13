# CLAUDE.md — 治愈点餐小程序工程规范（自我维护）

> 这是本项目的**最高约束**。每次开始工作前先读它；每次有新约定或踩坑，就回来更新它。
> 目标：把一个 HTML 高保真原型（`治愈点餐 App.html`）**像素级还原**成结构清晰、易于二次开发的微信小程序，
> **全静态、零接口**，数据集中可改。

---

## 1. 项目是什么

- **App 名**：治愈点餐 · 为她下厨
- **核心闭环**：她选菜 → 写一句撒娇留言 → 送出（邮件提醒效果）→ 做饭的人在「采购单」看到她选了什么 + 留言。
- **来源**：`claude.ai/design` 导出的 HTML 原型（见 `/design-source/` 若保留）。原型是「目标外观」，不是代码结构蓝本——我们按小程序最佳实践重写，只对齐**视觉输出**。
- **页面**：首页 home / 详情 detail / 采购单 shop / 菜单 menu / 我的 mine / 心愿单 wish。
- **tab**：首页 · 菜单 · 采购单 · 我的（detail / wish 为 push 子页，非 tab）。

## 2. 不可动摇的原则

1. **全静态**：不调任何网络接口。所有展示数据来自 `/mock`。要改文案/菜品/清单，只动 `/mock`。
2. **集中数据**：组件/页面**不内联硬编码业务数据**，一律从 `/mock` 取，从 props 传入。
3. **像素级还原**：颜色、圆角、间距、字号、阴影对齐原型。拿不准时回看 `治愈点餐 App.html` 源码（不是截图）。
4. **模块分离**：design tokens / mock 数据 / 状态 store / 图标 / 可复用组件 / 页面，各司其职，互不越界。
5. **可演进**：每加一个约定 → 写进本文件；每修一个 bug → 在第 9 节记一行。

## 3. 目录约定

```
app.{js,json,wxss}        全局入口 / 全局配置 / 全局样式+设计变量
project.config.json        开发者工具配置
sitemap.json
/styles                    共享样式（被 @import 进各 wxss）
  tokens.wxss              设计变量（颜色/圆角/阴影），通过 page{} 暴露 CSS 变量
  shared.wxss              共享原子类（chip / meta / btn / ph / sec-head ...）
/mock                      全部静态数据，按领域分文件，index.js 汇总导出
/utils
  store.js                 心愿单/已送出 状态 + 本地持久化 + 订阅
  icons.js                 SVG 图标注册表（name -> 原始 svg，用 currentColor 占位）
  base64.js                UTF-8 安全的 base64（给 icon 组件生成 data-uri）
  px.js                    设计稿换算备注（见第 5 节）
/components                可复用组件（icon / dish-card / menu-item / wish-bar / section-head / status-bar）
/custom-tab-bar            自定义 tabBar（还原毛玻璃底 + 玫瑰高亮 + 红点）
/pages                     home / detail / shop / menu / mine / wish
/assets/images             菜品 & 食材 PNG（来自原型）
/tests                     轻量断言测试（纯逻辑，Node 跑，见第 8 节）
```

## 4. 命名与代码风格

- 文件夹/文件：kebab-case（`dish-card`）。JS 变量：camelCase。CSS class：沿用原型命名（kebab，如 `sec-head`、`btn-primary`）以降低对照成本。
- 组件统一以 `properties` 接收数据，`triggerEvent` 上抛事件，**不在组件内读全局业务数据**（store 例外：wish-bar / tab-bar 这类全局态消费者）。
- WXML 不写业务字面量；用 `{{ }}` 绑定 data / props。
- 每个文件顶部一句话注释：职责 + 数据来源。
- 颜色只用 tokens 变量（`var(--rose-500)`），不写裸 hex（除非 tokens 里没有的一次性装饰色，需注释说明）。

## 5. 尺寸换算（关键）

- 原型基于 iPhone 逻辑宽 **393px**；小程序用 **rpx**（750rpx = 屏宽）。
- **约定：设计 px × 2 = rpx**（以 375 为基线，工业标准、取整方便；与 393 的 ~4.6% 差异肉眼不可辨）。
  例：`padding:22px` → `padding:44rpx`；`border-radius:18px` → `36rpx`；`font-size:13px` → `26rpx`。
- **例外**：`1px` 的细描边保留为 `1px`（hairline，不放大），如卡片 `border:1px solid var(--line)`。
- 原型里的「手机外壳 bezel / 舞台标题 / 假状态栏 / 灵动岛 / home indicator」**全部丢弃**——真机由系统提供。
  顶部状态栏用 `navigationStyle:custom` + `status-bar` 占位组件处理安全区。

## 6. SVG 图标方案（重要技术决策）

小程序 WXML **不渲染内联 `<svg>`**。方案：

- `utils/icons.js`：把原型里每个**唯一** SVG 原样存为字符串，颜色处统一写 `currentColor`。
- `components/icon`：`name` + `color`(+`size`) → 取模板 → 把 `currentColor` 替换成真实色 → `base64.js` 编码 → `<image src="data:image/svg+xml;base64,...">`。
- 结果按 `name|color|size` 缓存，避免重复编码。
- 用法：`<icon name="clock" color="{{...}}" size="28" />`。新增图标 → 往 `icons.js` 加一条，name 用语义化 kebab。

## 7. 状态管理（store）

- `utils/store.js`：单例。`state = { wish:[], sent:null }`，启动从 `wx.getStorageSync('zydc_wish')` 恢复。
- API：`getState() / toggleWish(id) / clearWish() / send(message) / subscribe(fn) -> unsubscribe`。
- 任何变更后 `wx.setStorageSync` 持久化并通知订阅者。
- 页面/组件在 `onShow`/`attached` 订阅，`onHide`/`detached` 退订，回调里 `setData`。**不要**在多处各自 new 一份状态。

## 8. 测试

- `/tests/*.test.js`：纯逻辑单测（store reducer、icons 完整性、mock 数据形状、base64 正确性）。
- 不依赖小程序运行时：被测逻辑写成**可在 Node 直接 require 的纯函数/纯数据**（store 的纯 reducer 抽出 `store.logic.js`）。
- 跑：`node tests/run.js`（自带极简断言，零依赖）。提交前必须全绿。

## 9. 踩坑 & 决策日志（持续追加）

- **[决策] 丢弃 bezel/状态栏装饰**：原型的外壳只为桌面预览，真机有系统状态栏/Home Indicator。
- **[决策] 自定义 tabBar**：原生 tabBar 无法还原毛玻璃 + SVG + 动态红点，改用 `custom-tab-bar`。
- **[决策] 字体**：Google Fonts 真机不可靠。栈 = 标题 `"Noto Serif SC","Songti SC",serif`，正文 `"Noto Sans SC","PingFang SC",sans-serif`；`app.js` 尝试 `wx.loadFontFace` 加载思源宋体，失败则回退，不阻塞。
- **[决策] SVG 走 base64 image**：见第 6 节。URL-encoded data-uri 在部分基础库不稳，统一 base64。
- **[决策] WebView 渲染器（非 Skyline）**：模板默认给了 Skyline，但 Skyline 对 `backdrop-filter`、`position:sticky`、`env()`、部分 CSS 变量支持受限。为最大程度还原 Web 设计，`app.json` 改回经典 WebView 渲染（删掉 `renderer:skyline`）。
- **[决策] 组件样式贯通**：所有自定义组件 `options.styleIsolation:'apply-shared'`，让 `app.wxss`(tokens+shared) 与页面 wxss 能作用到组件内（含跨组件的 CSS 变量继承）。icon 组件额外 `virtualHost:true`，避免多一层包裹节点影响 flex 排版。
- **[坑] icon 组件居中**：icon 渲染为 `<image class="icon">` 且 `display:block`。需要居中/外边距时，在父级用 `.父 .icon{margin:...}`（apply-shared 下页面样式可穿透到组件内的 image）。timeline 卡片即用此法。
- **[决策] 组件宽度由父级定**：dish-card 用 `:host{display:block}`，宽度交给页面（home 的 `.hscroll dish-card{flex:0 0 300rpx}`），组件内 `.dish{width:100%}`。
- **[决策] tab 页内的底部操作条**：tab 页（如 shop）底部有自己的操作条时，**不能**用 `.actionbar`(sticky bottom:0)——会被自定义 tabBar 盖住。改 `position:fixed; bottom:calc(env(safe-area-inset-bottom) + 116rpx)` 浮在 tabBar 之上，并在内容尾部加 ~220rpx 占位。push 子页（detail/wish 无 tabBar）则可直接用 `.actionbar` + `padding-bottom:env(safe-area-inset-bottom)`。
- **[决策] 自定义导航栏**：`navigationStyle:custom` 全局开启。tab 页顶部仅放 `<status-bar/>` 占位；detail/wish 子页放 `<status-bar/>` + `.navbar`（含返回键，`wx.navigateBack`），detail 的 navbar 额外 `position:sticky;top:0` 滚动吸顶。
- **[坑] 多字节文案换行**：原型里的 `<br>`/`\n`（greet 标题、空状态/送出描述）→ 用块级元素分行，或文案存 `\n` + 容器 `white-space:pre-line`。
- **[决策] 选中态同步**：自定义 tabBar 选中态不会自动跟随，每个 tab 页 `onShow` 调 `this.getTabBar().setSelected(idx)`；采购单 `onShow` 还要 `store.markSentSeen()` 熄灭红点。
- **[决策] 订阅消息提醒（云开发，可选模块）**：发真实通知需后端，选用微信云开发（免运维、免费额度）。`cloudfunctions/registerCook`（记录做饭的人 openid）+ `cloudfunctions/notifyCook`（`cloud.openapi.subscribeMessage.send` 下发，需 `config.json` 声明 openapi 权限）。前端封装 `utils/notify.js`，配置在 `utils/cloud-config.js`（`ENV` + `TEMPLATE_ID` 两个空，填了才启用）。**关键约束**：订阅消息只能发给「自己授权过且在用本小程序」的人 → 做饭的人在「我的」页点「开启提醒」(`requestSubscribeMessage` + registerCook)；她在心愿单送出时 `notifyCook`。**降级**：`cloud-config` 为空时 notify 全部 no-op，App 仍按纯静态运行、测试不受影响。模板字段名(thing1/thing2)要对齐所选公共模板，thing ≤20字符已截断。详见 `cloudfunctions/README.md`。
- **[决策] 每道菜独立菜谱 + 采购单聚合**：`mock/recipes.js` 按 dishId 存各自的 `desc/ingredients/steps/shopping`。详情页用 `getRecipe(id)` 取当前菜；采购单不再写死，用 `buildChecklist(今晚的菜ids)` 按分组（主食/肉蛋/蔬菜/调味）归并、同名去重生成。shop 页仅当「今晚的菜」集合变化时重建清单（用 `_checklistSig` 比对），避免 store 其它变更覆盖用户已勾选状态。食材缩略图目前仅意面那套有真图，其余食材 `img` 为空时详情页用 `.ph` 占位块（放真图进 assets 再补 img 即可）。
- **[坑] 自定义事件名禁用原生事件名（`tap` 等）**：组件 `triggerEvent('tap', {...})` 同时让父级 `bind:tap` 收到「自定义事件」+「内部 view 原生 tap 冒泡」两次。第二次原生事件 `e.detail` 为空 → `id=undefined` → 详情页 `getDish('undefined')` 兜底成奶油蘑菇意面，于是出现「先进正确详情、又自动叠一层 pasta、返回才对」（真机必现）。修复：自定义事件改用非原生名（本项目 dish-card/menu-item 用 `select`），父级 `bind:select`；并在跳转前 `if(!id)return` 兜底。triggerEvent 一律避开 tap/longpress/touch*/input/change/confirm/scroll 等原生名。
- **[坑] scroll-view 里的 `gap` 不生效**：`scroll-view scroll-x enable-flex` 内用 CSS `gap` 做横向间隔，在部分基础库/WebView 下**不渲染**（首页「治愈菜单」横滑 + 「心情卡」就因此间隔丢失）。修复：scroll-view 这一层改用**子元素 `margin-right`**（最后一个 `:last-child{margin-right:0}`）。普通 view（非 scroll-view）里的 `gap` 正常，不受影响（如 shop 时间线 / menu 列表）。横滑组件一律用 margin 间隔。

## 10. 验收清单（每次大改后过一遍）

- [ ] 四个 tab 可切换，detail/wish 可 push/返回。
- [ ] 选菜 → wish-bar 浮出（仅 home/menu/mine）→ 心愿单可删/写留言 → 送出 → sent 动效 → 采购单显示她的菜+留言+红点。
- [ ] 改 `/mock` 任一数据，界面随之变化，无需动组件。
- [ ] `node tests/run.js` 全绿。
- [ ] 颜色/圆角/间距对照原型无明显偏差。
