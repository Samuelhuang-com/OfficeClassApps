export interface Lesson {
  id: string;
  title: string;
  funcs: string[];
  tagline: string;
  syntax: string;
  points: string[];
  traps: string[];
  ex: {
    desc: string;
    formula: string;
    result: string;
    table?: {
      cols: string[];
      rows: string[][];
    };
  };
  parameters?: {
    name: string;
    desc: string;
    type: string;
    required: boolean;
  }[];
  hotelScenario?: {
    desc: string;
    formula: string;
    result: string;
    table?: {
      cols: string[];
      rows: string[][];
    };
  };
  keys: string[];
}

export interface Module {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  level: string;
  lvIdx: number;
  color: string;
  bg: string;
  chipCls: string;
  funcs: string[];
  desc: string;
  lessons: Lesson[];
}

export const MODULES: Module[] = [
  {
    id: 1,
    emoji: "📐",
    title: "函數入門：讀懂公式的底層邏輯",
    subtitle: "打好地基，告別死背",
    level: "入門",
    lvIdx: 0,
    color: "#1e3a8a",
    bg: "#dbeafe",
    chipCls: "c1",
    funcs: [],
    desc: "從最基礎的公式結構開始，理解函數的參數、邏輯與巢狀，培養讀懂任何公式的能力。",
    lessons: [
      {
        id: "1.1",
        title: "什麼是函數？公式結構拆解",
        funcs: [],
        tagline: "函數是Excel內建的計算工具，就像餐廳的固定套餐——只要告訴它你要什麼，它自動幫你做好。",
        syntax: "= 函數名稱（參數1，參數2，...）",
        points: ["公式必須以 = 開頭", "括號必須成對出現", "參數之間用英文逗號分隔", "函數名稱不區分大小寫"],
        traps: ["忘記等號直接輸入文字", "中英文括號混用", "逗號用了中文全形逗號"],
        ex: {
          desc: "計算A1到A10的總和",
          formula: "=SUM(A1:A10)",
          result: "300",
          table: {
            cols: ["儲存格", "數值"],
            rows: [["A1", "50"], ["A2", "80"], ["A3", "170"], ["...", "..."], ["合計", "=SUM(A1:A10) → 300"]]
          }
        },
        keys: ["公式結構 = 函數名稱 + 括號 + 參數", "參數之間用逗號分隔", "必要參數 vs 可選參數（可選的會用中括號[]標記）"]
      },
      {
        id: "1.2",
        title: "函數拆解6招萬能法",
        funcs: ["參數", "邏輯", "引用", "巢狀"],
        tagline: "學會拆解比死背更重要。任何複雜函數，都是由「參數、邏輯、引用、巢狀」四個核心概念組成。",
        syntax: "=SUMIF( Range, Criteria, [Sum_range] )",
        points: ["第1招：識別函數參數個數", "第2招：理解每個參數的含義", "第3招：搞清楚引用是絕對還是相對", "第4招：從內往外拆解巢狀", "第5招：先用簡單數據測試", "第6招：對比結果驗證邏輯"],
        traps: ["巢狀太深一次寫完容易錯", "沒有先確認參數順序就亂填"],
        ex: {
          desc: "拆解 SUMIF 函數",
          formula: '=SUMIF(A:A,"蘋果",B:B)',
          result: "20",
          table: {
            cols: ["A(商品)", "B(金額)"],
            rows: [["蘋果", "10"], ["香蕉", "20"], ["蘋果", "10"], ["合計蘋果", "→ 20"]]
          }
        },
        keys: ["從最簡單的形式開始理解", "先拆開每個參數看懂再組合", "遇到複雜公式先拆解再重組"]
      },
      {
        id: "1.3",
        title: "常見錯誤代碼全解析",
        funcs: ["#N/A", "#VALUE!", "#REF!", "#SPILL!", "#CALC!"],
        tagline: "看到紅色錯誤別怕！每個錯誤都是線索，認識它才能修正它。",
        syntax: "各種錯誤類型有不同原因",
        points: ["#N/A：找不到結果（VLOOKUP找不到值）", "#VALUE!：數值和文字格式混用", "#REF!：引用的儲存格被刪除了", "#SPILL!：動態陣列溢出路徑被占用", "#NAME?：函數名稱打錯了", "#DIV/0!：分母為零", "#CALC!：動態函數找不到匹配數據"],
        traps: ["VLOOKUP找不到值不代表數據不存在，可能是格式問題", "#SPILL!清空相鄰儲存格即可解決"],
        ex: {
          desc: "IFERROR 包裹任何函數消除錯誤",
          formula: '=IFERROR(VLOOKUP(A2,Sheet2!A:B,2,0),"未找到")',
          result: '"未找到"',
          table: {
            cols: ["查詢值", "結果"],
            rows: [["1001", "張三（找到）"], ["1003", "未找到（IFERROR捕捉）"]]
          }
        },
        keys: ["#N/A 用 IFERROR 或 IFNA 包裹", "#VALUE! 檢查格式是否一致", "#SPILL! 清空溢出路徑的儲存格"]
      },
      {
        id: "1.4",
        title: "數字格式 vs 文字格式陷阱",
        funcs: ["VALUE", "TEXT"],
        tagline: "明明看起來一樣，為什麼查不到？因為一個是數字，一個是偽裝成數字的文字！",
        syntax: '=VALUE(文字格式的數字)  →  轉回數字\n=TEXT(數字,"0")  →  轉成文字',
        points: ["數字靠右對齊，文字靠左對齊", "儲存格左上角有綠色小三角代表文字格式的數字", "SUM忽略文字格式，VLOOKUP也查不到", "用VALUE()轉換，或用—(負負得正)技巧"],
        traps: ["從系統匯出的數據最常有這個問題", "日期也可能是文字格式"],
        ex: {
          desc: "識別文字vs數字格式",
          formula: "=VALUE(A2)",
          result: "1001（真正的數字）",
          table: {
            cols: ["儲存格", "樣子", "實際格式", "對齊方式"],
            rows: [["A1", "1001", "數字", "靠右"], ["A2", "'1001", "文字", "靠左"], ["VLOOKUP結果", "查1001", "→ A1找到", "A2找不到"]]
          }
        },
        keys: ["遇到搜尋失敗先檢查格式", "善用VALUE()轉換函數", "儲存格格式設定也要統一"]
      }
    ]
  },
  {
    id: 2,
    emoji: "🧮",
    title: "求和與計數：數字統計核心函數",
    subtitle: "SUM / SUMIF / SUMIFS / COUNT 全家桶",
    level: "基礎",
    lvIdx: 1,
    color: "#14532d",
    bg: "#dcfce7",
    chipCls: "c2",
    funcs: ["SUM", "SUMIF", "SUMIFS", "COUNT", "COUNTA", "COUNTBLANK", "COUNTIF", "COUNTIFS", "AVERAGE", "AVERAGEIFS", "SUMPRODUCT", "SUBTOTAL"],
    desc: "掌握統計數字的核心函數，從基礎求和到多條件篩選，讓數字分析變得簡單又精準。",
    lessons: [
      {
        id: "2.1",
        title: "SUM 全面解析：不職是加法",
        funcs: ["SUM", "SUBTOTAL"],
        tagline: "SUM 是「抓娃娃機」——無論可不可見，全部抓！SUBTOTAL 是透視眼——只加看得見的。",
        syntax: "=SUM(數值1, [數值2], ...)\n=SUBTOTAL(9, 範圍)",
        points: ["SUM 忽略文字，只加數字", "SUM vs 加號：SUM更安全不怕文字干擾", "篩選後想只加可見數據，用SUBTOTAL(9,範圍)", "SUBTOTAL 第一個參數9代表SUM"],
        traps: ["篩選後用SUM還是算全部數字", "隱藏列SUBTOTAL一樣忽略"],
        ex: {
          desc: "篩選後只加可見行",
          formula: "=SUBTOTAL(9,B2:B10)",
          result: "只計算篩選後可見的總和",
          table: {
            cols: ["項目", "金額", "狀態"],
            rows: [["銷售A", "10000", "顯示"], ["銷售B", "8000", "隱藏"], ["銷售C", "12000", "顯示"], ["SUM結果", "30000", "全算"], ["SUBTOTAL結果", "22000", "只算可見"]]
          }
        },
        keys: ["日常求和用SUM", "篩選後統計用SUBTOTAL(9,...)", "SUM vs 加號差在對文字的處理"]
      },
      {
        id: "2.2",
        title: "SUMIF 單條件求和",
        funcs: ["SUMIF"],
        tagline: "SUMIF 是「只要蘋果」的求和——SUM是全都要，SUMIF是只挑合格的加。",
        syntax: "=SUMIF( 條件範圍, 條件, [求和範圍] )",
        points: ["第1參數：判斷條件的區域（條件列）", "第2參數：要符合的條件", "第3參數：實際要加總的區域（可省略）", "條件可以是文字、數字、邏輯符號"],
        traps: ['邏輯符號要加雙引號，例如">0"', "條件和求和範圍行數要一致"],
        ex: {
          desc: "計算銷售部的總薪資",
          formula: '=SUMIF(A:A,"銷售部",C:C)',
          result: "75000",
          table: {
            cols: ["A(部門)", "B(姓名)", "C(薪資)"],
            rows: [["銷售部", "張三", "25000"], ["人事部", "李四", "22000"], ["銷售部", "王五", "28000"], ["銷售部", "趙六", "22000"], ["結果", "", "→ 75000"]]
          }
        },
        parameters: [
          { name: "條件範圍 (Range)", desc: "要進行條件判斷的儲存格範圍。", type: "範圍", required: true },
          { name: "條件 (Criteria)", desc: "用來決定哪些儲存格將被加總的條件，可以是數字、表達式、儲存格參照或文字。", type: "文字/數字/邏輯", required: true },
          { name: "求和範圍 (Sum_range)", desc: "實際要加總的儲存格。如果省略，則加總「條件範圍」中的儲存格。", type: "範圍", required: false }
        ],
        hotelScenario: {
          desc: "計算「豪華客房」的總營收",
          formula: '=SUMIF(B:B,"豪華客房",E:E)',
          result: "15000",
          table: {
            cols: ["訂單號", "房型(B)", "入住天數", "單價", "總價(E)"],
            rows: [
              ["R001", "標準客房", "2", "2000", "4000"],
              ["R002", "豪華客房", "1", "5000", "5000"],
              ["R003", "豪華客房", "2", "5000", "10000"],
              ["R004", "家庭套房", "1", "8000", "8000"],
              ["→結果", "豪華客房營收", "", "", "→ 15000"]
            ]
          }
        },
        keys: ['條件文字加雙引號："銷售部"', '邏輯條件也加引號：">5000"', "條件和求和是同一列時第3參數可省"]
      },
      {
        id: "2.3",
        title: "SUMIFS 多條件求和進階",
        funcs: ["SUMIFS"],
        tagline: "SUMIFS 是SUMIF的升級版——可以同時設多個篩選條件，「既要…又要…」場景必用。",
        syntax: "=SUMIFS( 求和範圍, 條件範圍1, 條件1, 條件範圍2, 條件2, ... )",
        points: ["注意！SUMIFS 的求和範圍在第一個", "可以設定任意多個條件（AND邏輯）", '排除特定項用 "<>某部門"', '統計空白用 "="，非空白用 "<>"'],
        traps: ["SUMIF 和 SUMIFS 參數順序不同，SUMIFS求和在前！", "所有條件範圍行數要一致"],
        ex: {
          desc: "計算銷售部+3月的業績",
          formula: '=SUMIFS(C:C,A:A,"銷售部",B:B,"3月")',
          result: "48000",
          table: {
            cols: ["A(部門)", "B(月份)", "C(業績)"],
            rows: [["銷售部", "3月", "28000"], ["人事部", "3月", "18000"], ["銷售部", "3月", "20000"], ["銷售部", "4月", "30000"], ["→ 結果", "", "48000"]]
          }
        },
        keys: ["SUMIFS 求和範圍在最前面（跟SUMIF相反）", "多條件是AND關係（全部滿足才算）", '排除法用 "<>" 符號']
      }
    ]
  },
  {
    id: 3,
    emoji: "🔍",
    title: "查詢比對：從 VLOOKUP 到 INDEX+MATCH",
    subtitle: "數據比對查詢的終極武器",
    level: "基礎",
    lvIdx: 1,
    color: "#78350f",
    bg: "#fef9c3",
    chipCls: "c3",
    funcs: ["VLOOKUP", "HLOOKUP", "XLOOKUP", "INDEX", "MATCH", "IFERROR", "IFNA"],
    desc: "掌握Excel最重要的查詢函數，從基礎VLOOKUP到進階INDEX+MATCH，讓數據匹配不再是難題。",
    lessons: [
      {
        id: "3.1",
        title: "VLOOKUP 全方位拆解",
        funcs: ["VLOOKUP"],
        tagline: "VLOOKUP像自動販賣機：告訴它要什麼（查詢值），在哪找（區域），取第幾格（列號），精不精確（0）。",
        syntax: "=VLOOKUP( 找誰, 在哪裡找, 第幾列, 0 )",
        points: ["第4參數永遠填0（精確匹配）！99%情況都用0", "查詢值必須在查詢範圍的第1列", "只能從左往右找（重要限制！）", "返回結果是查詢範圍的第N列"],
        traps: ["忘記填第4參數0，會用模糊匹配出錯", "查詢值在右邊時無法向左找", "格式不一致（文字vs數字）導致#N/A"],
        ex: {
          desc: "根據飲品名查價格",
          formula: '=VLOOKUP("拿鐵",A:C,3,0)',
          result: "25",
          table: {
            cols: ["A(飲品)", "B(杯型)", "C(價格)"],
            rows: [["美式", "中杯", "20"], ["拿鐵", "大杯", "25"], ["摩卡", "超大杯", "30"], ["→查拿鐵", "", "→ 25"]]
          }
        },
        parameters: [
          { name: "找誰 (lookup_value)", desc: "要在表格第一欄中搜尋的值。", type: "任意", required: true },
          { name: "在哪裡找 (table_array)", desc: "包含資料的儲存格範圍。搜尋值必須位於此範圍的第一欄。", type: "範圍", required: true },
          { name: "第幾列 (col_index_num)", desc: "要傳回的值位於 table_array 中的欄號（從 1 開始）。", type: "數字", required: true },
          { name: "精確度 (range_lookup)", desc: "指定要尋找完全符合 (0/FALSE) 還是大約符合 (1/TRUE) 的值。", type: "布林值/數字", required: false }
        ],
        hotelScenario: {
          desc: "根據「房號」查詢住客姓名與退房狀態",
          formula: '=VLOOKUP("802",A:D,3,0)',
          result: "王大明",
          table: {
            cols: ["房號(A)", "房型(B)", "住客姓名(C)", "狀態(D)"],
            rows: [
              ["801", "標準客房", "陳小華", "已退房"],
              ["802", "豪華客房", "王大明", "入住中"],
              ["803", "家庭套房", "林美麗", "預訂"],
              ["→查802", "", "→ 王大明", ""]
            ]
          }
        },
        keys: ["口訣：找誰，在哪找，第幾列，要精確(0)", "第4參數一定填0避免模糊匹配錯誤", "只能向右找，想向左找改用XLOOKUP"]
      }
    ]
  },
  {
    id: 4,
    emoji: "⚖️",
    title: "邏輯判斷：讓表格自動做決策",
    subtitle: "IF / IFS / AND / OR 條件控制",
    level: "基礎",
    lvIdx: 1,
    color: "#4c1d95",
    bg: "#ede9fe",
    chipCls: "c4",
    funcs: ["IF", "IFS", "AND", "OR", "IFERROR", "IFNA"],
    desc: "學會邏輯判斷函數，讓Excel根據條件自動判斷結果，實現智能化的自動評分與分類。",
    lessons: [
      {
        id: "4.1",
        title: "IF 基礎與巢狀邏輯",
        funcs: ["IF"],
        tagline: "IF就是問一個問題：「如果…就…否則…」——三段式結構，讓表格自己做決定。",
        syntax: "=IF( 條件, 符合時的結果, 不符合時的結果 )",
        points: ["三個參數：條件、是、否", "結果可以是文字、數字或另一個公式", '巢狀IF：=IF(A>90,"優",IF(A>60,"及格","不及格"))', "最多可以巢狀64層（但超過3層建議用IFS）"],
        traps: ["文字結果要加雙引號", "條件是邏輯判斷，不是填文字"],
        ex: {
          desc: "根據分數評等級",
          formula: '=IF(A2>=90,"優秀",IF(A2>=60,"及格","不及格"))',
          result: "及格",
          table: {
            cols: ["姓名", "分數", "等級結果"],
            rows: [["張三", "92", "優秀"], ["李四", "75", "及格"], ["王五", "45", "不及格"]]
          }
        },
        keys: ["=IF(條件, 是, 否) 三段結構", "多條件用巢狀IF或改用IFS", '文字結果加雙引號：IF(A>60,"及格","不及格")']
      }
    ]
  },
  {
    id: 5,
    emoji: "✂️",
    title: "文字處理：截取、合併、拆分文字",
    subtitle: "系統數據清洗的必備函數",
    level: "進階",
    lvIdx: 2,
    color: "#831843",
    bg: "#fce7f3",
    chipCls: "c5",
    funcs: ["LEFT", "RIGHT", "MID", "LEN", "FIND", "CONCAT", "TEXTJOIN", "TEXTSPLIT", "TRIM"],
    desc: "掌握文字函數，從系統導出的雜亂數據中精準提取所需信息，自動化處理重複性文字工作。",
    lessons: [
      {
        id: "5.1",
        title: "LEFT / RIGHT / MID / LEN 字串截取",
        funcs: ["LEFT", "RIGHT", "MID", "LEN"],
        tagline: "字串截取三兄弟：LEFT從左取、RIGHT從右取、MID從中間取，LEN量長度。",
        syntax: "=LEFT(文字, 取幾個字)\n=RIGHT(文字, 取幾個字)\n=MID(文字, 從第幾個開始, 取幾個字)\n=LEN(文字)",
        points: ['LEFT("ABCDE",3) → "ABC"', 'RIGHT("ABCDE",3) → "CDE"', 'MID("ABCDE",2,3) → "BCD"（從第2個取3個）', "LEN算字元數，包括空格"],
        traps: ["MID的起始位置從1開始，不是0", "中英文字元LEN計算結果可能不同"],
        ex: {
          desc: "從身分證號提取出生年份",
          formula: "=MID(A2,7,4)",
          result: "1990",
          table: {
            cols: ["身分證號", "提取年份"],
            rows: [["G12345619900101", 'MID("G...",7,4)→1990'], ["A98765419851225", 'MID("A...",7,4)→1985']]
          }
        },
        keys: ["LEFT/RIGHT 取固定長度用這兩個", "MID 取中間段：(文字, 起始位置, 長度)", "LEN 常用來計算字串長度協助其他函數"]
      }
    ]
  },
  {
    id: 6,
    emoji: "📅",
    title: "日期與時間：讓日期自動計算",
    subtitle: "TODAY / YEAR / DATEDIF 時間計算器",
    level: "基礎",
    lvIdx: 1,
    color: "#134e4a",
    bg: "#ccfbf1",
    chipCls: "c6",
    funcs: ["TODAY", "NOW", "YEAR", "MONTH", "DAY", "DATEDIF", "DATE", "DATEVALUE"],
    desc: "掌握日期函數，讓Excel自動計算員工年資、合同到期天數，告別手動計算日期的痛苦。",
    lessons: [
      {
        id: "6.1",
        title: "TODAY / NOW 動態日期",
        funcs: ["TODAY", "NOW"],
        tagline: "TODAY()是永遠的今天——每次打開檔案都會自動更新，不用手動修改日期。",
        syntax: "=TODAY()   → 今天日期（每天更新）\n=NOW()     → 現在日期+時間",
        points: ["括號裡什麼都不用填", "每次打開或刷新自動更新", "=TODAY()-DATE(2020,1,1) 計算距某日期天數", "TODAY()是日期格式，可以用於日期計算"],
        traps: ["NOW()會導致每次計算都重新計算，大型表格可能變慢", "如果想固定日期，直接輸入，不用TODAY()"],
        ex: {
          desc: "計算今天距離年底還有幾天",
          formula: "=DATE(YEAR(TODAY()),12,31)-TODAY()",
          result: "天數（每天自動更新）",
          table: {
            cols: ["公式", "說明"],
            rows: [["=TODAY()", "顯示今天日期"], ["=TODAY()-A2", "今天距A2那天過了幾天"], ["=DATE(2025,12,31)-TODAY()", "距年底幾天"]]
          }
        },
        keys: ["TODAY() 括號空著，不用填任何東西", "配合日期計算：=TODAY()-入職日期→年資天數", "NOW()含時間，純日期計算用TODAY()"]
      }
    ]
  },
  {
    id: 7,
    emoji: "📊",
    title: "統計分析：排名、極值與分布",
    subtitle: "MAX / MIN / RANK / MEDIAN 統計全家桶",
    level: "進階",
    lvIdx: 2,
    color: "#7c2d12",
    bg: "#ffedd5",
    chipCls: "c7",
    funcs: ["MAX", "MIN", "LARGE", "SMALL", "AVERAGE", "MEDIAN", "RANK", "PERCENTILE"],
    desc: "深入掌握統計分析函數，不只會算平均值，更能做排名、找極值、分析數據分布。",
    lessons: [
      {
        id: "7.1",
        title: "MAX / MIN 極值查找",
        funcs: ["MAX", "MIN"],
        tagline: "MAX是「天花板」，MIN是「地板磚」——從一堆數字裡找最高和最低。",
        syntax: "=MAX( 範圍 ) → 最大值\n=MIN( 範圍 ) → 最小值",
        points: ["MAX/MIN自動忽略文字和空格", "MAXIFS/MINIFS：按條件找最大最小值（365版）", "可以同時輸入多個範圍：=MAX(A1:A10,C1:C10)", "常與IF組合實現條件極值：=MAX(IF(條件,值))"],
        traps: ["注意文字格式數字不會被算進去", "MAXIFS/MINIFS是較新版本才有"],
        ex: {
          desc: "找業績最高和最低",
          formula: "=MAX(B:B) → 最高業績\n=MIN(B:B) → 最低業績",
          result: "MAX=98000 / MIN=12000",
          table: {
            cols: ["業務員", "業績"],
            rows: [["張三", "45000"], ["李四", "98000"], ["王五", "12000"], ["→MAX", "98000"], ["→MIN", "12000"]]
          }
        },
        keys: ["=MAX(範圍) 最大值，=MIN(範圍) 最小值", "自動忽略文字和空格", "配合MAXIFS做條件極值"]
      }
    ]
  },
  {
    id: 8,
    emoji: "⚡",
    title: "動態陣列新函數：365 時代的革命",
    subtitle: "FILTER / SORT / VSTACK / LAMBDA",
    level: "高階",
    lvIdx: 3,
    color: "#3730a3",
    bg: "#e0e7ff",
    chipCls: "c8",
    funcs: ["FILTER", "SORT", "SORTBY", "VSTACK", "SEQUENCE", "BYCOL", "LAMBDA", "UNIQUE"],
    desc: "Excel 365全新動態陣列函數，讓數據篩選、排序、合併完全自動化，結果實時更新無需手動刷新。",
    lessons: [
      {
        id: "8.1",
        title: "FILTER 秒級多條件篩選",
        funcs: ["FILTER"],
        tagline: "FILTER是「動態高級篩選」——比手動篩選快10倍，結果隨數據自動更新，用*表示AND，用+表示OR。",
        syntax: "=FILTER( 數據範圍, 條件, [無結果時顯示] )",
        points: ['條件用邏輯表達式：B:B="銷售部"', "AND多條件用*相乘：(條件1)*(條件2)", "OR多條件用+相加：(條件1)+(條件2)", '第3參數設無匹配時顯示："無數據"'],
        traps: ["#SPILL!：相鄰儲存格有數據，清空溢出路徑", "#CALC!：沒有符合條件的數據，加第3參數"],
        ex: {
          desc: "篩選華東區且業績>10萬的客戶",
          formula: '=FILTER(A2:D6,(B2:B100="華東")*(C2:C100>10))',
          result: "動態返回所有符合的行",
          table: {
            cols: ["公司", "區域", "業績", "狀態"],
            rows: [["A公司", "華東", "12", "✓ 篩選出"], ["B集團", "華南", "9", "✗ 區域不對"], ["C科技", "華東", "15", "✓ 篩選出"], ["E實業", "華東", "20", "✓ 篩選出"]]
          }
        },
        keys: ["AND條件用 * 相乘", "OR條件用 + 相加", '#CALC!：加第3參數 =FILTER(數據,條件,"無數據")']
      }
    ]
  },
  {
    id: 9,
    emoji: "🧹",
    title: "數據清洗：分析前永遠的第一步",
    subtitle: "整理髒數據，讓分析有效率",
    level: "進階",
    lvIdx: 2,
    color: "#7f1d1d",
    bg: "#fee2e2",
    chipCls: "c9",
    funcs: ["TRIM", "CLEAN", "VALUE", "TEXT", "SUBSTITUTE", "PROPER"],
    desc: "學習數據清洗技巧，快速處理從各系統導出的髒數據，把2-3小時的清洗工作縮短到幾分鐘。",
    lessons: [
      {
        id: "9.1",
        title: "認識髒數據的三大問題",
        funcs: [],
        tagline: "做分析前的第一步，永遠是整理數據。各系統導出的表格有三大問題：格式不一樣、欄位不一樣、時間不統一。",
        syntax: "問題1：格式問題（文字/數字混雜）\n問題2：欄位問題（欄名不一致）\n問題3：時間問題（日期格式不統一）",
        points: ["格式問題：數字和文字混在同一列", '欄位問題：同一資料欄名不同（如"姓名"vs"員工姓名"）', "時間問題：YYYY-MM-DD和DD/MM/YYYY混用", "空格問題：值前後有多餘空格（常見於複製貼上）"],
        traps: ["眼睛看起來一樣不代表Excel認為一樣", "清洗前先做備份"],
        ex: {
          desc: "髒數據典型問題",
          formula: "清洗步驟：識別→格式統一→驗證",
          result: "清洗後可直接分析",
          table: {
            cols: ["問題類型", "典型症狀", "解決方法"],
            rows: [["格式不一", "數字靠左/靠右混亂", "VALUE()轉換"], ["多餘空格", "VLOOKUP找不到", "TRIM()去空格"], ["日期格式", "計算日期報錯", "DATEVALUE()轉換"]]
          }
        },
        keys: ["分析前先整理數據，不要直接分析", "三大問題：格式、欄位、日期", "清洗後用COUNTBLANK驗證是否有遺漏"]
      }
    ]
  },
  {
    id: 10,
    emoji: "🧩",
    title: "萬能組合：INDEX + MATCH",
    subtitle: "比 VLOOKUP 更強大的查找組合",
    level: "高階",
    lvIdx: 3,
    color: "#1e3a8a",
    bg: "#dbeafe",
    chipCls: "c10",
    funcs: ["INDEX", "MATCH"],
    desc: "掌握Excel最強大的查找組合 INDEX+MATCH，突破VLOOKUP只能向右找、插入列會報錯的限制。",
    lessons: [
      {
        id: "10.1",
        title: "INDEX + MATCH 組合技",
        funcs: ["INDEX", "MATCH"],
        tagline: "MATCH找位置，INDEX取數據——這對黃金搭檔可以實現「向左查找」和「動態引用」。",
        syntax: "=INDEX( 結果範圍, MATCH(找誰, 在哪找, 0) )",
        points: ["MATCH(找誰, 範圍, 0) 返回數字位置", "INDEX(範圍, 位置) 返回該位置的值", "優點1：可以向左查找", "優點2：插入列不會導致公式出錯"],
        traps: ["MATCH的範圍和INDEX的範圍高度必須一致", "MATCH最後一個參數一定要填0"],
        ex: {
          desc: "根據姓名找工號（工號在姓名左側）",
          formula: "=INDEX(A:A, MATCH(D2, B:B, 0))",
          result: "返回對應工號",
          table: {
            cols: ["工號(A)", "姓名(B)", "查找姓名(D)", "結果"],
            rows: [["No.001", "張三", "李四", "No.002"], ["No.002", "李四", "", ""], ["No.003", "王五", "", ""]]
          }
        },
        keys: ["MATCH 負責定位，INDEX 負責取值", "範圍高度必須一致", "比 VLOOKUP 更穩定、更靈活"]
      }
    ]
  },
  {
    id: 11,
    emoji: "🎨",
    title: "視覺化呈現：條件格式與圖表",
    subtitle: "讓數據說話，一眼看出重點",
    level: "基礎",
    lvIdx: 1,
    color: "#3f6212",
    bg: "#ecfccb",
    chipCls: "c11",
    funcs: ["SPARKLINE", "REPT", "TEXT"],
    desc: "學習如何利用條件格式和迷你圖表，將枯燥的數字轉化為直觀的視覺信號，提升報表專業度。",
    lessons: [
      {
        id: "11.1",
        title: "條件格式：自動標記重點",
        funcs: [],
        tagline: "條件格式是「自動螢光筆」——讓Excel根據數值大小，自動幫你畫重點、標顏色。",
        syntax: "操作路徑：常用 → 條件格式",
        points: ["大於/小於某值自動變色", "資料條：在儲存格內畫出長度條", "色階：根據數值分布顯示漸層色", "圖示集：顯示上升/下降箭頭"],
        traps: ["規則太多會導致表格變慢", "注意規則的優先順序"],
        ex: {
          desc: "標記不及格的分數",
          formula: "設定：小於60則儲存格變紅",
          result: "不及格分數一眼看出",
          table: {
            cols: ["學生", "分數", "視覺效果"],
            rows: [["A", "85", "無"], ["B", "42", "背景變紅"], ["C", "90", "無"]]
          }
        },
        keys: ["資料條最適合看業績分布", "色階適合看數據密集度", "規則管理員可以修改現有規則"]
      }
    ]
  },
  {
    id: 12,
    emoji: "🤖",
    title: "AI 輔助：Excel + AI 的新工作流",
    subtitle: "用自然語言寫公式與處理數據",
    level: "高階",
    lvIdx: 3,
    color: "#111827",
    bg: "#f3f4f6",
    chipCls: "c12",
    funcs: ["GPT", "AI.ASK"],
    desc: "探索AI如何改變Excel工作方式。學會用自然語言描述需求，讓AI幫你寫複雜公式、清洗數據與分析趨勢。",
    lessons: [
      {
        id: "12.1",
        title: "AI 寫公式：從需求到函數",
        funcs: [],
        tagline: "不再死背函數——只要描述「我想做什麼」，AI就能幫你寫出正確的Excel公式。",
        syntax: "提示詞範例：幫我寫一個Excel公式，如果A2大於100且B2是'已支付'，就顯示'完成'，否則顯示'待辦'。",
        points: ["精確描述儲存格位置", "說明判斷邏輯", "要求處理錯誤情況（如IFERROR）", "讓AI解釋公式的原理"],
        traps: ["AI寫的公式需要實際測試", "注意版本差異（如365專有函數）"],
        ex: {
          desc: "AI 輔助寫複雜邏輯",
          formula: "Prompt: 幫我寫一個提取括號內文字的公式",
          result: "=MID(A2,FIND('(',A2)+1,FIND(')',A2)-FIND('(',A2)-1)",
          table: {
            cols: ["原始文字", "AI 建議公式", "結果"],
            rows: [["產品(蘋果)", "上述公式", "蘋果"], ["客戶(華為)", "上述公式", "華為"]]
          }
        },
        keys: ["描述要具體：包含儲存格、條件、結果", "可以要求AI優化現有公式", "AI是學習Excel的最佳助教"]
      }
    ]
  }
];
