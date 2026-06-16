import React, { useState } from 'react';

export default function PromptArchitect() {
  const [form, setForm] = useState({ role: '', task: '', constraints: '', format: 'Bullet Points' });
  const [result, setResult] = useState('');

  const generatePrompt = () => {
    const prompt = `Act as a ${form.role || '[Role]'}. Your primary objective is to ${form.task || '[Task]'}. 
Constraints: ${form.constraints || 'None provided'}. 
Output Format: ${form.format}.`;
    setResult(prompt);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Role</label>
          <input 
            className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 ring-blue-500 outline-none transition-all"
            placeholder="e.g. Senior Cloud Architect" 
            onChange={(e) => setForm({...form, role: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Output Format</label>
          <select 
            className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none"
            onChange={(e) => setForm({...form, format: e.target.value})}
          >
            <option>Bullet Points</option>
            <option>Technical Report</option>
            <option>Step-by-Step Guide</option>
            <option>JSON</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">Task / Objective</label>
        <textarea 
          className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 h-24 outline-none"
          placeholder="Describe exactly what the AI should do..." 
          onChange={(e) => setForm({...form, task: e.target.value})}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">Constraints</label>
        <textarea 
          className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 h-24 outline-none"
          placeholder="e.g. No jargon, limit to 300 words, use ISO standards..." 
          onChange={(e) => setForm({...form, constraints: e.target.value})}
        />
      </div>
      <button 
        onClick={generatePrompt}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
      >
        Generate System Prompt →
      </button>
      {result && (
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-sm relative group animate-in fade-in slide-in-from-top-2">
          <p className="whitespace-pre-wrap">{result}</p>
          <button 
            onClick={() => {navigator.clipboard.writeText(result); alert('Copied!')}}
            className="absolute top-2 right-2 text-xs bg-slate-700 px-2 py-1 rounded hover:bg-slate-600 transition-colors"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
