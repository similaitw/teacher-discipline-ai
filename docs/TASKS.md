# TASKS

## Current task
M2.1 — 擴充教師常見情境與自然語言搜尋，完成 CI / 375px E2E 驗收。

## M1 status
- M1 已完成並在 PR #1 等待使用者決定是否 merge。
- 線上 M1：https://teacher-discipline-ai.vercel.app
- Chat2Code 維持暫停。

## M2 changes
- topics 由 11 題擴至 20 題。
- 新增：
  - 禁止全班連坐處罰
  - 要求道歉／書面自省
  - 教學場所一隅暫時分隔（兩堂課上限）
  - 行為當日暫送其他班學習
  - 一般管教無效後請學務／輔導處帶離
  - 課後留置須家長／實際照顧者同意
  - 限制正式課程以外活動
  - 書包／抽屜／身體安全檢查程序
  - 單純低學業成就不得處罰
- 每筆 topic 新增 category / quick metadata。
- 首頁改為「常用情境＋更多常見情境」折疊，不把 20 題全部攤開。
- 搜尋加入標點、空白正規化。
- 補 M2 data / mobile E2E 測試。

## Official basis
主要依教育部《學校訂定教師輔導與管教學生辦法注意事項》第14、20、23、25、29、30點。

## Next
- GitHub CI 全套驗證
- 建立 stacked PR（base: chatgpt/m1-mvp）
- M2 preview deployment，不覆蓋已上線 M1 正式別名
