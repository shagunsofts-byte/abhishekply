import React from 'react';
import { Plus, X } from 'lucide-react';

interface KeyValueListInputProps {
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}

export const KeyValueListInput: React.FC<KeyValueListInputProps> = ({ value, onChange }) => {
  const rows: [string, string][] = Object.entries(value);

  const updateRow = (idx: number, key: string, val: string) => {
    const next: [string, string][] = [...rows];
    next[idx] = [key, val];
    onChange(Object.fromEntries(next) as Record<string, string>);
  };

  const removeRow = (idx: number) => {
    const next = rows.filter((_, i) => i !== idx);
    onChange(Object.fromEntries(next) as Record<string, string>);
  };

  const addRow = () => onChange({ ...value, '': '' });

  return (
    <div className="space-y-2.5">
      {rows.map(([key, val], idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="text"
            value={key}
            onChange={(e) => updateRow(idx, e.target.value, val)}
            placeholder="Grade"
            className="w-1/3 px-3 py-2 rounded-lg border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
          />
          <input
            type="text"
            value={val}
            onChange={(e) => updateRow(idx, key, e.target.value)}
            placeholder="BWP (IS:710)"
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 text-sm font-inter outline-none focus:border-amber-400"
          />
          <button
            type="button"
            onClick={() => removeRow(idx)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-xs font-outfit font-medium text-amber-600 hover:text-amber-700 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" /> Add Specification
      </button>
    </div>
  );
};
