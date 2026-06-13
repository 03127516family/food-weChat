# 云函数 · 订阅消息提醒（免费）

「她送出心愿单 → 微信里提醒做饭的人」。两个云函数：
- `registerCook`：做饭的人授权后，记录他的 openid。
- `notifyCook`：她送出时，向做饭的人下发订阅消息。

## 一次性配置（约 10 分钟）

1. **开通云开发**
   开发者工具左上「云开发」→ 新建环境（免费基础版）→ 复制**环境 ID**。

2. **填配置**：把环境 ID 填到 `utils/cloud-config.js` 的 `ENV`。

3. **选订阅消息模板**
   小程序后台（mp.weixin.qq.com）→ 功能 → 订阅消息 → 公共模板库 → 选一个「通知/提醒」类模板 → 得到 **模板 ID**。
   - 把模板 ID 填到 `utils/cloud-config.js` 的 `TEMPLATE_ID`。
   - 看清模板里的**字段名**（如 `thing1`/`thing2`/`time3`…），把 `notifyCook/index.js` 里 `data` 的字段名改成一致，否则下发会报错。
   - 字段有长度限制（thing ≤ 20 字符），代码已自动截断。

4. **部署云函数**
   分别右键 `cloudfunctions/registerCook` 和 `cloudfunctions/notifyCook` →
   「在终端中打开」`npm install` → 再右键「**上传并部署：云端安装依赖**」。

5. **建数据库集合**
   云开发控制台 → 数据库 → 新建集合 `app_meta`（registerCook 也会尝试自动建，建好更稳）。

## 怎么用 / 自测

1. 做饭的人：打开小程序 → 「我的」页点「**开启她的点餐提醒**」→ 允许授权
   （此时 `registerCook` 把他的 openid 存进 `app_meta/cook`）。
2. 她：选菜 → 心愿单 → 「送出」→ `notifyCook` 下发提醒，做饭的人微信收到服务通知。

## 注意

- **未配置时**（`cloud-config` 为空）App 照常按纯静态原型运行，送出只弹动效、不发通知，不会报错。
- **一次性订阅**：他每授权一次只能收一条；要长期收，需要他多次授权（可在「我的」页反复点开启来累积）。
- 正式发布后，把 `notifyCook/index.js` 里 `miniprogramState` 从 `'developer'` 改成 `'formal'`。
- 订阅消息**只能发给授权过、用这个小程序的人**——所以做饭的人必须先在「我的」页点过开启。
