# TASKS

## Current task
M1.3 — 手機 UI / accessibility 驗收，並以 CI 完成 typecheck 與 production build。

## Done
- M0.1 Next.js/TypeScript 手機版骨架
- M0.2 風險卡片與固定答案格式
- M1.0 教育部《學校訂定教師輔導與管教學生辦法注意事項》source registry
- M1.0 10 個高頻 topics
- M1.0 emergency mode 關鍵字路由
- M1.0 unknown fallback
- M1.1 新增教育部《國民小學及國民中學學生獎懲準則》（2024-04-30）為全國核心來源
- M1.1 宜蘭縣 2005 學生獎懲要點與 2024-07-03 函建立地方 source registry；未取得縣府官方全文，不做內容推測
- M1.2 10 個 topic 逐項重新核對教育部現行規範
- M1.2 修正「手機／物品」為第31點所定有條件暫時保管
- M1.2 資料 schema / source validation tests：3/3 passed

## Current validation status
- `npm test`: PASS（3/3）
- `npm install`: 此 ChatGPT 執行環境逾時，未完成依賴安裝
- `npm run typecheck` / `npm run build`: 等待 GitHub Actions 或可安裝依賴的環境驗證

## Next
- M1.3 GitHub Actions typecheck / production build
- M1.3 375px 手機 UI 與 accessibility
- M1.4 Vercel project / preview deployment
