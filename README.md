# 教師管教 AI 幫手

教育部 × 宜蘭縣通用版。Mobile-first、source-first；無 AI API 也能查詢。

## 線上版本
https://teacher-discipline-ai.vercel.app

目前 Vercel 部署已 READY。查詢邏輯在瀏覽器端執行，不會把教師輸入的情境送到伺服器。

## 開發狀態
- M0：專案骨架完成
- M1：11 個高頻／紅線 topic 已建立
- 教育部：3 份官方核心來源已驗證
- 宜蘭縣：已建立地方來源索引；縣府官方公開全文尚待取得者不做逐條法規斷言
- GitHub CI：資料測試、隱私測試、ESLint、TypeScript、production build、375px Chromium E2E 全部通過
- Chat2Code 暫停，目前由 ChatGPT 主開發
- PR #1 尚未合併

## 啟動
```bash
npm install
npm run dev
```

## 驗證
```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```
