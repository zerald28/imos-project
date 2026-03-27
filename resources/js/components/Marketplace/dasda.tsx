import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

type Props = {
  open: boolean;
  onClose: () => void;
  swine: any[];
  listingId: number;
};

export default function SwineSelectModal({ open, onClose, swine, listingId }: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.post(`/marketplace/seller/${listingId}/add-swine`, {
      swine_ids: selected
    }, {
      preserveScroll: true,
      onSuccess: () => onClose()
    });
  };

  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-3">Select swine to add to listing</h3>

          <form onSubmit={submit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-auto">
              {swine.map(s => (
                <label key={s.id} className="border rounded p-2 flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggle(s.id)} />
                  <img src={s.thumbnail ?? '/images/no-image.png'} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <div className="font-medium">{s.name ?? `#${s.id}`}</div>
                    <div className="text-sm text-gray-500">Tag: {s.tag_number}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={selected.length === 0}>Add {selected.length} swine</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
