import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-excel-formula';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme
import { Copy, Check, ChevronDown } from 'lucide-react';

// Define a plain text grammar for Prism to handle escaping properly
Prism.languages.plain = {};

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

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-xl my-4">
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
        <button 
          onClick={handleCopy}
          className="text-white/50 hover:text-white transition-colors p-1 rounded"
          title="複製代碼"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-auto max-h-[400px] text-sm">
        <Editor
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
