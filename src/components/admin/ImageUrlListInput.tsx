import React from 'react';
import { Plus, X, ImageOff } from 'lucide-react';

interface ImageUrlListInputProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export const ImageUrlListInput: React.FC<ImageUrlListInputProps> = ({ images, onChange }) => {
  const updateAt = (idx: number, value: string) => {
    const next = [...images];
    next[idx] = value;
    onChange(next);
  };

  const removeAt = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const addRow = () => onChange([...images, '']);

  return (
    <div className="space-y-3">
      {images.map((url, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0 flex items-center justify-center">
            {url ? (
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <ImageOff className="w-5 h-5 text-stone-300" />
            )}
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => updateAt(idx, e.target.value)}
            placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
            className="flex-1 px-3 py-2.5 rounded-xl border border-stone-200 text-sm font-inter outline-none focus:border-brass-400"
          />
          <button
            type="button"
            onClick={() => removeAt(idx)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-xs font-outfit font-medium text-brass-600 hover:text-brass-700 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" /> Add Cloudinary Image URL
      </button>
      <p className="text-[11px] text-stone-400 font-inter">
        Upload your photo to Cloudinary first, then paste the resulting image URL here. The first image is used as
        the product thumbnail everywhere on the site.
      </p>
    </div>
  );
};
