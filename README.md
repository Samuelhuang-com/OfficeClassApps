# Excel 基礎到進階完整教學課程 (Excel Learning Platform)

這是一個專為學習 Excel 函數與公式所設計的互動式網頁應用程式。透過系統化的課程模組、互動式程式碼編輯器以及實用的情境演練，幫助使用者從零開始掌握 Excel 的核心技能。

## ✨ 核心功能

*   **系統化課程模組**：將 Excel 技能分為入門、基礎、進階、高階四個等級，涵蓋從基礎求和到動態陣列函數。
*   **互動式公式編輯器 (`CodeEditor`)**：
    *   支援 Excel 公式語法高亮 (Syntax Highlighting)。
    *   內建函數搜尋與快速插入功能。
    *   支援語言切換（Excel 公式 / 純文字）。
    *   一鍵複製程式碼。
*   **實用情境演練**：結合真實職場情境（如：飯店營收計算、房客查詢），讓學習更具實用性。
*   **AI 助手整合**：內建 AI 聊天介面，可設定 API Key 來詢問 Excel 相關問題（目前為 UI 框架與模擬回應）。
*   **響應式設計**：支援桌面端與行動裝置的無縫瀏覽體驗。

## 🛠 技術棧 (Tech Stack)

*   **前端框架**：React 18, Vite
*   **樣式與排版**：Tailwind CSS
*   **圖示庫**：Lucide React
*   **動畫效果**：Framer Motion (`motion/react`)
*   **程式碼編輯器**：`react-simple-code-editor`, `prismjs`

## 📂 程式架構說明 (Project Structure)

專案採用模組化的 React 架構，主要檔案與目錄結構如下：

```text
/
├── src/
│   ├── components/
│   │   └── CodeEditor.tsx  # 互動式程式碼編輯器元件 (處理語法高亮、函數搜尋與插入)
│   ├── App.tsx             # 主程式入口 (負責狀態管理、視圖切換與主要 UI 佈局)
│   ├── constants.ts        # 靜態資料中心 (定義課程模組、單元內容、函數參數與情境)
│   ├── index.css           # 全域樣式與 Tailwind CSS 配置
│   ├── main.tsx            # React 應用程式掛載點
│   └── vite-env.d.ts       # Vite 型別定義
├── package.json            # 專案依賴與腳本設定
├── tailwind.config.js      # Tailwind CSS 設定檔
├── vite.config.ts          # Vite 設定檔
└── README.md               # 專案說明文件
```

### 🧩 核心元件架構 (Component Architecture)

在 `src/App.tsx` 中，應用程式被拆分為幾個主要視圖與元件：

1.  **`App` (Root Component)**：
    *   管理全域狀態：目前視圖 (`view`)、選擇的模組/單元、搜尋狀態、AI 聊天紀錄、API Key 等。
    *   負責在 `HomeView`、`ModuleView` 和 `CardView` 之間進行路由切換。
2.  **`Header` (頂部導覽列)**：
    *   顯示麵包屑導覽、搜尋按鈕與 AI 助手開關。
3.  **`Sidebar` (側邊欄)**：
    *   提供課程目錄導覽，支援行動版抽屜式 (Drawer) 展開。
4.  **`HomeView` (首頁視圖)**：
    *   展示所有課程模組，提供按難易度篩選的功能。
5.  **`ModuleView` (模組視圖)**：
    *   顯示單一模組的詳細介紹與其包含的單元列表 (Accordion 展開設計)。
6.  **`CardView` (教學卡片視圖)**：
    *   顯示單一課程的詳細內容，包含：一句話理解、語法說明、參數表格、實戰範例、飯店實用情境、以及核心重點與陷阱。
    *   在此視圖中深度整合了 `CodeEditor` 元件。

### 💾 資料流與狀態管理

*   **靜態內容**：所有的課程資料皆定義於 `src/constants.ts` 中的 `MODULES` 陣列，這使得新增或修改課程內容非常容易，無需更動 UI 邏輯。
*   **狀態傳遞**：主要依賴 React 的 `useState` 與 Props 進行由上而下的狀態傳遞。

## 🚀 安裝與執行

1. 安裝依賴套件：
   ```bash
   npm install
   ```

2. **啟動開發伺服器 (Development)**：
   如果你想要在本地端開發並即時看到修改結果，請執行：
   ```bash
   npm run dev
   ```
   執行後，終端機會顯示一個本地網址（通常是 `http://localhost:3000` 或 `http://localhost:5173`），在瀏覽器開啟即可。

3. **建置與預覽正式環境版本 (Production)**：
   如果你已經執行過 `npm run build` 完成打包，想要在本地端預覽打包後的正式版本，請執行：
   ```bash
   npm run build    # 建置靜態檔案 (若已執行過可跳過)
   npm run preview  # 啟動本地預覽伺服器
   ```
