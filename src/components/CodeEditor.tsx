import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-excel-formula';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme
import { Copy, Check, ChevronDown, Search, X, Plus } from 'lucide-react';

// Define a plain text grammar for Prism to handle escaping properly
Prism.languages.plain = {};

const EXCEL_FUNCTIONS = [
  { name: 'SUM', desc: '加總範圍內的數值', syntax: 'SUM()' },
  { name: 'SUMIF', desc: '加總符合指定條件的儲存格', syntax: 'SUMIF(, , )' },
  { name: 'SUMIFS', desc: '加總符合多個條件的儲存格', syntax: 'SUMIFS(, , , , )' },
  { name: 'VLOOKUP', desc: '垂直搜尋並回傳對應值', syntax: 'VLOOKUP(, , , 0)' },
  { name: 'HLOOKUP', desc: '水平搜尋並回傳對應值', syntax: 'HLOOKUP(, , , 0)' },
  { name: 'XLOOKUP', desc: '新一代搜尋函數，支援雙向搜尋', syntax: 'XLOOKUP(, , )' },
  { name: 'INDEX', desc: '回傳表格或範圍內的值或參照', syntax: 'INDEX(, )' },
  { name: 'MATCH', desc: '搜尋指定項目並回傳其相對位置', syntax: 'MATCH(, , 0)' },
  { name: 'IF', desc: '邏輯判斷，符合傳回A，否則傳回B', syntax: 'IF(, , )' },
  { name: 'IFS', desc: '檢查多個條件，傳回第一個符合條件的值', syntax: 'IFS(, , , )' },
  { name: 'COUNT', desc: '計算範圍內包含數字的儲存格數目', syntax: 'COUNT()' },
  { name: 'COUNTA', desc: '計算範圍內非空白的儲存格數目', syntax: 'COUNTA()' },
  { name: 'COUNTIF', desc: '計算符合指定條件的儲存格數目', syntax: 'COUNTIF(, )' },
  { name: 'AVERAGE', desc: '計算平均值', syntax: 'AVERAGE()' },
  { name: 'MAX', desc: '傳回最大值', syntax: 'MAX()' },
  { name: 'MIN', desc: '傳回最小值', syntax: 'MIN()' },
  { name: 'LEFT', desc: '從字串左側擷取指定字元數', syntax: 'LEFT(, )' },
  { name: 'RIGHT', desc: '從字串右側擷取指定字元數', syntax: 'RIGHT(, )' },
  { name: 'MID', desc: '從字串中間擷取指定字元數', syntax: 'MID(, , )' },
  { name: 'LEN', desc: '傳回字串長度', syntax: 'LEN()' },
  { name: 'TODAY', desc: '傳回今天的日期', syntax: 'TODAY()' },
  { name: 'NOW', desc: '傳回現在的日期與時間', syntax: 'NOW()' },
  { name: 'FILTER', desc: '根據條件篩選範圍', syntax: 'FILTER(, )' },
  { name: 'SORT', desc: '排序範圍或陣列', syntax: 'SORT()' },
  { name: 'UNIQUE', desc: '傳回範圍內的唯一值', syntax: 'UNIQUE()' },
];

interface CodeEditorProps {
  initialCode?: string;
  readOnly?: boolean;
  onChange?: (code: string) => void;
  title?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode = '', 
  readOnly = false,
  onChange,
  title = 'Excel 公式編輯器'
}) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('excel-formula');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const editorId = React.useId();

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleValueChange = (newCode: string) => {
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string) => {
    return Prism.highlight(code, Prism.languages[language] || Prism.languages.plain, language);
  };

  const handleInsert = (syntax: string) => {
    const textarea = document.getElementById(`editor-${editorId}`) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + syntax + code.substring(end);
      handleValueChange(newCode);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + syntax.length, start + syntax.length);
      }, 0);
    } else {
      handleValueChange(code + (code.endsWith('\n') || code === '' ? '' : '\n') + syntax);
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const filteredFunctions = EXCEL_FUNCTIONS.filter(fn => 
    fn.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    fn.desc.includes(searchQuery)
  );

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-xl my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-xs font-medium text-white/70">{title}</div>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white/10 text-white/80 text-xs px-2 py-1 pr-6 rounded border border-white/10 focus:outline-none focus:border-white/30 cursor-pointer"
            >
              <option value="excel-formula">Excel 公式</option>
              <option value="plain">純文字</option>
            </select>
            <ChevronDown className="w-3 h-3 text-white/50 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!readOnly && (
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`text-white/50 hover:text-white transition-colors p-1.5 rounded ${isSearchOpen ? 'bg-white/10 text-white' : ''}`}
              title="搜尋並插入函數"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={handleCopy}
            className="text-white/50 hover:text-white transition-colors p-1.5 rounded"
            title="複製代碼"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isSearchOpen && !readOnly && (
        <div className="absolute top-10 left-0 right-0 bottom-0 bg-[#1e1e1e]/95 backdrop-blur-sm z-10 flex flex-col border-t border-white/10">
          <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-black/20">
            <Search className="w-4 h-4 text-white/50" />
            <input
              autoFocus
              type="text"
              placeholder="搜尋函數 (例如: SUM, VLOOKUP)..."
              className="flex-1 bg-transparent text-sm text-white outline-none"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-white/10 rounded">
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {filteredFunctions.map(fn => (
              <div key={fn.name} className="flex items-start justify-between p-2 hover:bg-white/5 rounded-lg group transition-colors">
                <div>
                  <div className="text-green-400 font-mono text-sm font-bold">{fn.name}</div>
                  <div className="text-white/60 text-xs mt-0.5">{fn.desc}</div>
                </div>
                <button
                  onClick={() => handleInsert(fn.syntax)}
                  className="opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 py-1.5 rounded flex items-center gap-1 transition-all shrink-0 ml-2"
                >
                  <Plus className="w-3 h-3" /> 插入
                </button>
              </div>
            ))}
            {filteredFunctions.length === 0 && (
              <div className="text-center text-white/40 text-xs py-8">找不到相關函數</div>
            )}
          </div>
        </div>
      )}

      <div className="p-4 overflow-auto max-h-[400px] text-sm custom-scrollbar">
        <Editor
          textareaId={`editor-${editorId}`}
          value={code}
          onValueChange={handleValueChange}
          highlight={highlightCode}
          padding={10}
          disabled={readOnly}
          style={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: 14,
            backgroundColor: 'transparent',
            minHeight: '100px',
            outline: 'none',
          }}
          textareaClassName="focus:outline-none"
        />
      </div>
    </div>
  );
};
