/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search as SearchIcon, 
  Bot, 
  Key, 
  Trash2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  MessageSquare,
  Send,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MODULES, Module, Lesson } from './constants';

// --- Types ---
type View = 'home' | 'module' | 'card';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

// --- Components ---

const Header = ({ 
  currentView, 
  currentModule, 
  currentLesson, 
  onGoHome, 
  onGoModule, 
  onOpenSearch, 
  onToggleChat 
}: { 
  currentView: View;
  currentModule: number;
  currentLesson: number;
  onGoHome: () => void;
  onGoModule: (mi: number) => void;
  onOpenSearch: () => void;
  onToggleChat: () => void;
}) => {
  const mod = MODULES[currentModule];
  
  const totalModules = MODULES.length;
  const totalLessons = MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalFuncs = new Set(MODULES.flatMap(m => m.funcs)).size;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-dark h-16 px-6 flex items-center border-b border-white/10 shadow-lg">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <span 
          className="text-white font-serif text-lg font-bold cursor-pointer whitespace-nowrap shrink-0 border-r border-white/15 pr-4 mr-4 hidden sm:block"
          onClick={onGoHome}
        >
          Excel<span className="text-amber-brand">課程</span> — 完整教學
        </span>
        
        {currentView === 'home' ? (
          <div className="hidden md:flex items-center gap-6">
            <div className="overflow-hidden">
              <div className="text-white text-sm font-semibold truncate leading-tight">Excel 基礎到進階完整教學課程</div>
              <div className="text-white/55 text-[11px] truncate mt-0.5">從零開始系統化學習，告別死記硬背，職場效率大升級</div>
            </div>
            
            <div className="hidden lg:flex items-center border border-white/20 rounded-lg bg-white/5 ml-4">
              <div className="px-4 py-1.5 text-center border-r border-white/20">
                <div className="text-white font-serif font-bold text-lg leading-none">{totalModules}</div>
                <div className="text-white/60 text-[10px] mt-1">大模組</div>
              </div>
              <div className="px-4 py-1.5 text-center border-r border-white/20">
                <div className="text-white font-serif font-bold text-lg leading-none">{totalLessons}</div>
                <div className="text-white/60 text-[10px] mt-1">單元</div>
              </div>
              <div className="px-4 py-1.5 text-center">
                <div className="text-white font-serif font-bold text-lg leading-none">{totalFuncs}</div>
                <div className="text-white/60 text-[10px] mt-1">核心函數</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white/60 text-sm overflow-hidden">
            <span className="hover:text-white cursor-pointer whitespace-nowrap" onClick={onGoHome}>首頁</span>
            <span className="opacity-40 shrink-0">›</span>
            <span 
              className={`truncate ${currentView === 'module' ? 'text-white font-medium' : 'hover:text-white cursor-pointer'}`}
              onClick={() => onGoModule(currentModule)}
            >
              M{mod.id} {mod.title.split('：')[0]}
            </span>
            {currentView === 'card' && (
              <>
                <span className="opacity-40 shrink-0">›</span>
                <span className="text-white font-medium truncate">
                  {mod.lessons[currentLesson].id} {mod.lessons[currentLesson].title}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 ml-4 shrink-0">
        <button 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-white/90 text-sm font-medium hover:bg-white/20 transition-all"
          onClick={onOpenSearch}
        >
          <SearchIcon className="w-4 h-4" />
          <span className="hidden sm:inline">搜尋</span>
          <span className="hidden lg:inline text-[10px] bg-white/15 px-1.5 py-0.5 rounded ml-1">Ctrl+K</span>
        </button>
        <button 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-white/90 text-sm font-medium hover:bg-white/20 transition-all"
          onClick={onToggleChat}
        >
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">問 AI</span>
        </button>
      </div>
    </nav>
  );
};

const HomeView = ({ onGoModule }: { onGoModule: (mi: number) => void }) => {
  const [filter, setFilter] = useState<number>(-1);
  
  const filteredModules = filter === -1 
    ? MODULES 
    : MODULES.filter(m => m.lvIdx === filter);

  const counts = [0, 1, 2, 3].map(lv => MODULES.filter(m => m.lvIdx === lv).length);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pt-24">
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-bold text-app-muted uppercase tracking-wider mr-2">篩選等級</span>
        <button 
          onClick={() => setFilter(-1)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${filter === -1 ? 'bg-green-dark text-white border-green-dark' : 'bg-white text-app-muted border-app-border hover:border-green-dark hover:text-green-dark'}`}
        >
          全部 <span className="text-[10px] opacity-70 ml-1">({MODULES.length})</span>
        </button>
        {[
          { label: '入門', idx: 0, color: 'lv-0' },
          { label: '基礎', idx: 1, color: 'lv-1' },
          { label: '進階', idx: 2, color: 'lv-2' },
          { label: '高階', idx: 3, color: 'lv-3' },
        ].map(lv => (
          <button 
            key={lv.idx}
            onClick={() => setFilter(lv.idx)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${filter === lv.idx ? `bg-green-dark text-white border-green-dark` : `bg-white text-app-muted border-app-border hover:border-green-dark hover:text-green-dark`}`}
          >
            {lv.label} <span className="text-[10px] opacity-70 ml-1">({counts[lv.idx]})</span>
          </button>
        ))}
      </div>

      <div className="text-xs font-bold text-app-muted uppercase tracking-[1.5px] mb-4">課程模組總覽</div>
      
      <div className="grid gap-4">
        {filteredModules.map((m, idx) => (
          <motion.div 
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onGoModule(MODULES.indexOf(m))}
            className="bg-white border border-app-border rounded-xl p-5 card-shadow cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-xl shrink-0 ${m.chipCls}`}>
                {m.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif font-bold text-base truncate">M{m.id}. {m.title}</div>
                <div className="text-xs text-app-muted mt-0.5">{m.lessons.length} 堂課 · {m.subtitle}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  m.lvIdx === 0 ? 'lv-0' : m.lvIdx === 1 ? 'lv-1' : m.lvIdx === 2 ? 'lv-2' : 'lv-3'
                }`}>
                  {m.level}
                </span>
                <ArrowRight className="w-4 h-4 text-app-muted group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            {m.funcs.length > 0 && (
              <div className="mt-4 pt-3 border-t border-app-border flex flex-wrap gap-1.5">
                {m.funcs.slice(0, 8).map(f => (
                  <span key={f} className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded ${m.chipCls}`}>
                    {f}
                  </span>
                ))}
                {m.funcs.length > 8 && (
                  <span className="text-[10px] text-app-muted ml-1">+{m.funcs.length - 8}個</span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ModuleView = ({ 
  moduleIdx, 
  onGoCard 
}: { 
  moduleIdx: number; 
  onGoCard: (li: number) => void 
}) => {
  const m = MODULES[moduleIdx];
  const [openLesson, setOpenLesson] = useState<number | null>(null);

  return (
    <div className="pt-16">
      <div className="bg-white border-b border-app-border px-10 py-12">
        <div className="max-w-4xl mx-auto flex gap-6 items-start">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${m.chipCls}`}>
            {m.emoji}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-serif font-bold text-app-text mb-2">M{m.id}. {m.title}</h2>
            <p className="text-sm text-app-muted max-w-2xl leading-relaxed">{m.desc}</p>
            <div className="flex gap-2 mt-4">
              <span className="text-xs px-3 py-1 rounded-full bg-app-bg border border-app-border text-app-muted">{m.level}</span>
              <span className="text-xs px-3 py-1 rounded-full bg-app-bg border border-app-border text-app-muted">{m.lessons.length} 堂課</span>
              {m.funcs.length > 0 && (
                <span className="text-xs px-3 py-1 rounded-full bg-app-bg border border-app-border text-app-muted">{m.funcs.length} 個函數</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-3">
        {m.lessons.map((l, li) => (
          <div key={l.id} className="bg-white border border-app-border rounded-xl overflow-hidden shadow-sm">
            <div 
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-app-bg transition-colors"
              onClick={() => setOpenLesson(openLesson === li ? null : li)}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${m.chipCls}`}>
                {l.id}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{l.title}</div>
                {l.funcs.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {l.funcs.map(f => (
                      <span key={f} className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${m.chipCls}`}>
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <motion.div
                animate={{ rotate: openLesson === li ? 180 : 0 }}
                className="text-app-muted"
              >
                <ChevronLeft className="w-4 h-4 rotate-270" />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {openLesson === li && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-app-border bg-app-bg/30"
                >
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-app-border border border-app-border">
                      <div className="bg-white p-4">
                        <h5 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-3">核心重點</h5>
                        <ul className="space-y-1.5">
                          {l.points.map((p, i) => (
                            <li key={i} className="text-xs flex gap-2">
                              <span className="text-amber-brand font-bold shrink-0">·</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4">
                        <h5 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-3">常見陷阱</h5>
                        <ul className="space-y-1.5">
                          {l.traps.map((t, i) => (
                            <li key={i} className="text-xs flex gap-2">
                              <span className="text-amber-brand font-bold shrink-0">·</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-4 col-span-full">
                        <h5 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-3">一句話理解</h5>
                        <p className="text-sm font-medium text-app-text leading-relaxed mb-3">{l.tagline}</p>
                        <div className="bg-green-dark text-green-light font-mono text-sm p-3 rounded-lg whitespace-pre-wrap">
                          {l.syntax}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onGoCard(li)}
                      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-green-dark text-white rounded-lg text-sm font-medium hover:bg-green-mid transition-all"
                    >
                      查看教學卡片 <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const CardView = ({ 
  moduleIdx, 
  lessonIdx, 
  onNav, 
  onBackToModule 
}: { 
  moduleIdx: number; 
  lessonIdx: number; 
  onNav: (dir: number) => void;
  onBackToModule: () => void;
}) => {
  const mod = MODULES[moduleIdx];
  const l = mod.lessons[lessonIdx];
  const total = mod.lessons.length;
  const progress = Math.round(((lessonIdx + 1) / total) * 100);

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      <div className="bg-app-bg border-b border-app-border px-6 py-4 sticky top-16 z-40">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <span className="text-xs text-app-muted whitespace-nowrap shrink-0">
            M{mod.id} · {mod.emoji} {mod.title.split('：')[0]}
          </span>
          <div className="flex-1 h-1 bg-app-border rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-green-dark rounded-full" 
            />
          </div>
          <span className="text-xs text-app-muted whitespace-nowrap shrink-0">{lessonIdx + 1} / {total}</span>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <motion.div 
          key={l.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-app-border rounded-2xl overflow-hidden shadow-xl"
        >
          <div 
            className="p-8 pb-6 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${mod.color} 0%, ${mod.color}cc 100%)` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/80 text-xs font-bold tracking-wider">{l.id}</span>
              <span className="text-white/20 text-xs">|</span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{mod.level}</span>
              <span className="text-xl ml-auto">{mod.emoji}</span>
            </div>
            <h1 className="text-white text-5xl font-serif font-bold tracking-tight mb-2">
              {l.funcs.length > 0 ? l.funcs[0] : l.title.split(' ')[0]}
            </h1>
            <div className="text-white/80 text-base">{l.title}</div>
            
            {/* Decorative circle */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
          </div>

          <div className="p-0">
            <div className="p-6 border-b border-app-border">
              <div className="flex items-center gap-2 text-[10px] font-bold text-app-muted uppercase tracking-wider mb-3">
                <Info className="w-3.5 h-3.5" /> 一句話理解
              </div>
              <div className="bg-amber-light border border-amber-brand/20 p-4 rounded-xl">
                <p className="text-amber-900 font-medium text-base leading-relaxed">{l.tagline}</p>
              </div>
            </div>

            <div className="p-6 border-b border-app-border">
              <div className="flex items-center gap-2 text-[10px] font-bold text-app-muted uppercase tracking-wider mb-3">
                <ArchitectureIcon className="w-3.5 h-3.5" /> 語法
              </div>
              <div className="bg-green-dark text-green-light font-mono text-sm p-4 rounded-xl leading-relaxed">
                {l.syntax.split('\n').map((line, i) => (
                  <div key={i} dangerouslySetInnerHTML={{ 
                    __html: line.replace(/（.+?）/g, s => `<span class="text-amber-200">${s}</span>`) 
                  }} />
                ))}
              </div>
            </div>

            {l.ex && (
              <div className="p-6 border-b border-app-border">
                <div className="flex items-center gap-2 text-[10px] font-bold text-app-muted uppercase tracking-wider mb-3">
                  <ExternalLink className="w-3.5 h-3.5" /> 實戰範例
                </div>
                <p className="text-xs text-app-muted mb-4">{l.ex.desc}</p>
                
                {l.ex.table && (
                  <div className="overflow-x-auto border border-app-border rounded-lg mb-4">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-app-bg">
                          {l.ex.table.cols.map((c, i) => (
                            <th key={i} className="px-3 py-2 text-left font-bold text-app-muted border-r border-app-border last:border-0">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {l.ex.table.rows.map((row, ri) => (
                          <tr key={ri} className="border-t border-app-border hover:bg-app-bg/50">
                            {row.map((cell, ci) => (
                              <td key={ci} className={`px-3 py-2 border-r border-app-border last:border-0 ${
                                ri === l.ex.table!.rows.length - 1 || cell.startsWith('→') 
                                  ? 'bg-amber-light font-bold text-amber-900' 
                                  : 'text-app-text'
                              }`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-green-dark text-green-light font-mono text-xs px-4 py-2 rounded-lg">
                    {l.ex.formula.split('\n')[0]}
                  </div>
                  {l.ex.result && (
                    <>
                      <ArrowRight className="w-4 h-4 text-app-muted" />
                      <div className="bg-green-light text-green-dark font-bold text-sm px-4 py-1.5 rounded-lg">
                        {l.ex.result}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-app-muted uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" /> 核心重點
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                  <h6 className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" /> 關鍵記憶
                  </h6>
                  <ul className="space-y-1.5">
                    {l.keys.map((k, i) => (
                      <li key={i} className="text-xs text-green-900 flex gap-2">
                        <span className="font-bold shrink-0">✓</span> {k}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                  <h6 className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3" /> 常見陷阱
                  </h6>
                  <ul className="space-y-1.5">
                    {l.traps.map((t, i) => (
                      <li key={i} className="text-xs text-red-900 flex gap-2">
                        <span className="font-bold shrink-0">✗</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-app-bg border-t border-app-border p-4 flex justify-between items-center">
            <button 
              disabled={lessonIdx === 0}
              onClick={() => onNav(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-app-border bg-white text-sm font-medium hover:bg-green-dark hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> 上一堂
            </button>
            <button 
              onClick={onBackToModule}
              className="px-4 py-2 rounded-lg border border-app-border bg-white text-sm font-medium hover:bg-green-dark hover:text-white transition-all"
            >
              返回模組
            </button>
            <button 
              disabled={lessonIdx === total - 1}
              onClick={() => onNav(1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-app-border bg-white text-sm font-medium hover:bg-green-dark hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              下一堂 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ArchitectureIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Chat state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // API Key state
  const [apiKey, setApiKey] = useState('');
  const [apiProvider, setApiProvider] = useState<'openai' | 'anthropic'>('openai');

  useEffect(() => {
    const storedProvider = localStorage.getItem('excel_ai_provider') as any || 'openai';
    const storedKey = localStorage.getItem(`excel_ai_key_${storedProvider}`) || '';
    setApiProvider(storedProvider);
    setApiKey(storedKey);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleGoHome = () => {
    setView('home');
    window.scrollTo(0, 0);
  };

  const handleGoModule = (mi: number) => {
    setCurrentModule(mi);
    setView('module');
    window.scrollTo(0, 0);
  };

  const handleGoCard = (li: number) => {
    setCurrentLesson(li);
    setView('card');
    window.scrollTo(0, 0);
  };

  const handleNavCard = (dir: number) => {
    const newLi = currentLesson + dir;
    if (newLi >= 0 && newLi < MODULES[currentModule].lessons.length) {
      setCurrentLesson(newLi);
      window.scrollTo(0, 0);
    }
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = q.toLowerCase();
    const results: any[] = [];
    
    MODULES.forEach((m, mi) => {
      if (m.title.toLowerCase().includes(query) || m.subtitle.toLowerCase().includes(query)) {
        results.push({ type: 'module', mi, li: -1, m });
      }
      m.lessons.forEach((l, li) => {
        if (l.title.toLowerCase().includes(query) || l.tagline.toLowerCase().includes(query) || l.funcs.some(f => f.toLowerCase().includes(query))) {
          results.push({ type: 'lesson', mi, li, l, m });
        }
      });
    });
    
    setSearchResults(results.slice(0, 10));
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    
    const userMsg = chatInput.trim();
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    
    if (!apiKey) {
      setChatHistory(prev => [...prev, { role: 'bot', content: '請先設定 API Key 才能使用 AI 功能。' }]);
      setIsKeyModalOpen(true);
      return;
    }

    setIsChatLoading(true);
    
    try {
      // Mocking AI response for now since we don't have a real backend proxy yet
      // In a real app, this would call the OpenAI/Anthropic API
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          role: 'bot', 
          content: `這是一個關於「${userMsg}」的專業 Excel 回答。在課程中，我們有相關的模組可以幫助你深入學習。` 
        }]);
        setIsChatLoading(false);
      }, 1000);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'bot', content: '抱歉，發生錯誤，請稍後再試。' }]);
      setIsChatLoading(false);
    }
  };

  const handleSaveKey = (key: string) => {
    localStorage.setItem(`excel_ai_key_${apiProvider}`, key);
    localStorage.setItem('excel_ai_provider', apiProvider);
    setApiKey(key);
    setIsKeyModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-app-bg">
      <Header 
        currentView={view}
        currentModule={currentModule}
        currentLesson={currentLesson}
        onGoHome={handleGoHome}
        onGoModule={handleGoModule}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
      />

      <main className="pb-20">
        {view === 'home' && <HomeView onGoModule={handleGoModule} />}
        {view === 'module' && <ModuleView moduleIdx={currentModule} onGoCard={handleGoCard} />}
        {view === 'card' && (
          <CardView 
            moduleIdx={currentModule} 
            lessonIdx={currentLesson} 
            onNav={handleNavCard}
            onBackToModule={() => setView('module')}
          />
        )}
      </main>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-green-dark/60 backdrop-blur-sm flex items-start justify-center pt-24 px-6"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-app-border"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-4 border-b border-app-border">
                <SearchIcon className="w-5 h-5 text-app-muted" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="搜尋函數、課程、關鍵字..." 
                  className="flex-1 bg-transparent border-none outline-none text-base"
                  value={searchQuery}
                  onChange={e => handleSearch(e.target.value)}
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-app-bg rounded">
                  <X className="w-5 h-5 text-app-muted" />
                </button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((res, i) => (
                      <div 
                        key={i}
                        onClick={() => {
                          if (res.type === 'module') handleGoModule(res.mi);
                          else handleGoCard(res.li);
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-app-bg cursor-pointer group"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${res.m.chipCls}`}>
                          {res.m.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold truncate">
                            {res.type === 'module' ? res.m.title : `${res.l.id} ${res.l.title}`}
                          </div>
                          <div className="text-xs text-app-muted truncate">
                            {res.type === 'module' ? res.m.subtitle : `M${res.m.id} ${res.m.title.split('：')[0]}`}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-app-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-app-muted">
                    {searchQuery ? '找不到相關結果' : '輸入關鍵字開始搜尋'}
                  </div>
                )}
              </div>
              <div className="bg-app-bg px-4 py-2 text-[10px] text-app-muted flex gap-4">
                <span>↑↓ 選擇</span><span>Enter 前往</span><span>Esc 關閉</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <div 
        className={`fixed bottom-0 right-6 z-[90] w-full max-w-[380px] bg-white rounded-t-2xl shadow-2xl border border-app-border flex flex-col transition-all duration-300 ease-in-out ${isChatOpen ? 'h-[540px]' : 'h-0 overflow-hidden'}`}
      >
        <div className="bg-green-dark p-4 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-bold">Excel AI 助手</div>
            <div className="text-white/60 text-[10px]">問我任何 Excel 問題</div>
          </div>
          <button onClick={() => setIsKeyModalOpen(true)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
            <Key className="w-4 h-4" />
          </button>
          <button onClick={() => setChatHistory([])} className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {chatHistory.length === 0 && (
            <div className="bg-app-bg border border-app-border p-4 rounded-2xl rounded-tl-none">
              <p className="text-sm leading-relaxed">
                你好！我是 Excel AI 助手 🎓<br />
                請先點右上角 <strong>🔑</strong> 設定 API Key，即可開始問任何 Excel 問題！
              </p>
            </div>
          )}
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${msg.role === 'bot' ? 'bg-green-light text-green-dark' : 'bg-amber-light text-amber-900'}`}>
                {msg.role === 'bot' ? <Bot className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
              </div>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'bot' ? 'bg-app-bg border border-app-border rounded-tl-none' : 'bg-green-dark text-white rounded-tr-none'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-green-light text-green-dark flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-app-bg border border-app-border p-3 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-app-muted rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-app-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-app-muted rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-3 border-t border-app-border flex items-end gap-2 shrink-0">
          <textarea 
            rows={1}
            placeholder="輸入 Excel 問題..."
            className="flex-1 bg-app-bg border border-app-border rounded-xl p-2.5 text-sm outline-none focus:border-green-dark transition-colors resize-none max-h-32"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendChat();
              }
            }}
          />
          <button 
            disabled={!chatInput.trim() || isChatLoading}
            onClick={handleSendChat}
            className="w-10 h-10 bg-green-dark text-white rounded-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-mid transition-all shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat FAB */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-[80] w-14 h-14 bg-green-dark text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <Bot className="w-7 h-7" />
        </button>
      )}

      {/* Key Modal */}
      <AnimatePresence>
        {isKeyModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-green-dark/70 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={() => setIsKeyModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-app-border"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-green-dark p-5 flex items-center gap-3">
                <Key className="w-6 h-6 text-white" />
                <h3 className="text-white font-bold">設定 AI API Key</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-app-muted leading-relaxed mb-6">
                  請輸入您的 API Key，key 只存在您的瀏覽器 localStorage，不會傳送到任何第三方。
                </p>
                
                <div className="flex border border-app-border rounded-lg overflow-hidden mb-6">
                  <button 
                    onClick={() => setApiProvider('openai')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${apiProvider === 'openai' ? 'bg-green-dark text-white' : 'bg-white text-app-muted hover:bg-app-bg'}`}
                  >
                    OpenAI
                  </button>
                  <button 
                    onClick={() => setApiProvider('anthropic')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${apiProvider === 'anthropic' ? 'bg-green-dark text-white' : 'bg-white text-app-muted hover:bg-app-bg'}`}
                  >
                    Anthropic
                  </button>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="text-[10px] font-bold text-app-muted uppercase tracking-wider">
                    {apiProvider === 'openai' ? 'OpenAI API Key' : 'Anthropic API Key'}
                  </label>
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder={apiProvider === 'openai' ? 'sk-...' : 'sk-ant-...'}
                      className="w-full bg-app-bg border border-app-border rounded-lg p-3 text-sm outline-none focus:border-green-dark transition-colors"
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsKeyModalOpen(false)}
                    className="flex-1 py-3 border border-app-border rounded-xl text-sm font-bold text-app-muted hover:bg-app-bg transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => handleSaveKey(apiKey)}
                    className="flex-1 py-3 bg-green-dark text-white rounded-xl text-sm font-bold hover:bg-green-mid transition-colors"
                  >
                    儲存 Key
                  </button>
                </div>

                <div className="mt-6 p-3 bg-app-bg border border-app-border rounded-lg flex gap-3 items-start">
                  <AlertCircle className="w-4 h-4 text-app-muted shrink-0 mt-0.5" />
                  <p className="text-[10px] text-app-muted leading-relaxed">
                    Key 僅存於您的瀏覽器，不上傳伺服器。OpenAI Key 可至 <a href="https://platform.openai.com/api-keys" target="_blank" className="text-green-dark font-bold hover:underline">platform.openai.com</a> 取得。
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

