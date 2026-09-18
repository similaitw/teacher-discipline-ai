# TASKS

## Current task
M2.2 — 完整知識庫化：16 大分類、57 查詢主題、27 來源文件、桃園手冊 53 案索引，完成 CI / 375px E2E 驗收。

## M1 status
- M1 已完成並在 PR #1 等待是否 merge。
- 線上 M1：https://teacher-discipline-ai.vercel.app
- Chat2Code 維持暫停。

## M2.1 Done
- 原 11 題擴至 20 題。
- 修正自然語言搜尋，較具體長關鍵詞優先。
- 10 個高頻快捷，其餘折疊。
- M2.1 CI 曾全綠。

## M2.2 Complete knowledge layer
- 16 大分類：
  - 基本原則與程序
  - 一般管教措施
  - 體罰、站立與身體接觸
  - 休息與受教權
  - 手機、財物與安全檢查
  - 言語、人格與個資
  - 緊急安全與危害處理
  - 正式獎懲與重大違規
  - 申訴、救濟與程序保障
  - 校園霸凌
  - 性別事件與性平
  - 輔導、家庭與兒少保護
  - 特殊教育與合理調整
  - 教師責任與校事處理
  - 宜蘭縣地方規範
  - 案例、判決與手冊
- 查詢主題：57。
- 來源文件：27；其中 24 筆為官方已驗證或官方已驗證但需注意生效日。
- 宜蘭縣兩筆地方來源仍標 `needsOfficialSource`，不作逐條斷言。
- 桃園市正向管教手冊：53 案完整目錄索引。
  - 體罰 7
  - 不當管教 24
  - 霸凌 7
  - 教學不力 15
- 桃園案例詳細內容目前一律 `detailStatus: toc_only`，逐頁影像核對後才升級。
- 首頁新增「完整知識庫｜依 16 大類查詢」。
- 同一搜尋框同時搜尋：
  - 教師情境主題
  - 法規／官方文件
  - 桃園手冊案例索引
- 私人 Library 內的申訴練習、判決與內部案例不直接公開到 public repo。

## Source hierarchy
1. 教育部／中央現行法規與官方文件
2. 宜蘭縣政府正式地方文件（須官方全文）
3. 指定學校自訂規範
4. 案例、判決、申訴評議、外縣市手冊

## Validation gates
- 16 categories exactly
- topics >= 50
- sources >= 27
- verified official sources >= 24
- Taoyuan cases exactly 53
- chapter counts exactly 7 / 24 / 7 / 15
- all Taoyuan cases remain toc_only until page-detail review
- data/privacy tests
- ESLint
- Typecheck
- Production build
- 375px Chromium E2E
- unified document lookup E2E

## Next
- M2.2 latest CI 全綠
- 更新 PR #2 驗收紀錄
- 建立不覆蓋 M1 正式網址的 M2 preview
- 後續 M2.3：逐頁核對桃園 53 案內文，分批升級 `verified_detail`
