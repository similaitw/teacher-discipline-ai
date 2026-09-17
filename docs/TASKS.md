# TASKS

## Current task
M1.5 — 線上版本已驗收；等待使用者決定是否將 PR #1 合併到 main。Chat2Code 維持暫停。

## Done
- M0.1 Next.js/TypeScript 手機版骨架
- M0.2 風險卡片與固定答案格式
- M1.0 教育部《學校訂定教師輔導與管教學生辦法注意事項》source registry
- M1.0 emergency mode / unknown fallback
- M1.1 新增教育部《國民小學及國民中學學生獎懲準則》（2024-04-30）
- M1.1 宜蘭縣地方來源 registry；未取得縣府官方全文者不得做逐條斷言
- M1.2 topics 逐項核對教育部現行規範
- M1.2 「手機／物品」依第31點修正為有條件暫時保管
- M1.2 新增《教師法施行細則》第8條體罰定義與「體罰紅線」入口
- M1.2 資料／來源／隱私回歸測試
- M1.3 375px 手機 UI：44px 觸控目標、focus-visible、aria-live、來源防溢出
- M1.3 修正「網路攻擊」誤判緊急事件
- M1.3 GitHub Actions 全綠：Install / Data+privacy tests / ESLint / Typecheck / Production build / Chromium / Mobile E2E
- M1.4 Vercel 專案建立完成：`prj_8bsUDgXskOXvhETxP2dYmtdu9B94`
- M1.4 部署 `dpl_CqnqAzCb9nR4aXyQtWmdeXwUmEhw`：READY
- M1.4 線上首頁 HTTP 200，標題、11 個入口、隱私提醒與法規版本資訊正常
- M1.4 Vercel runtime error scan：0 errors

## Live
https://teacher-discipline-ai.vercel.app

## Important
- Vercel API 回報此次部署 `target=production`，雖原始部署請求指定 preview；因此目前正式別名已可公開存取。
- PR #1 仍維持 open，尚未 merge 到 `main`。
- Chat2Code control issue #15 已移除 `chat2code:ready`，不得自動接單。
- 日後使用者明確要求「交回 Chat2Code」時，Runner 必須先拉取最新 `main`／最新工作分支，不得從舊 worktree 覆蓋。

## Next
- 使用者驗收線上版本
- 決定是否 merge PR #1
- 若繼續由 ChatGPT：進入 M2（擴充題庫、案例、自然語言查詢品質）
- 若交回 Chat2Code：先同步最新 GitHub 狀態後重新派工
