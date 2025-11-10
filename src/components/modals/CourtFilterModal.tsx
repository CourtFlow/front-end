import React, { useState } from 'react';
import CourtModal from './CourtModal';

interface CourtFilterModalProps {
  onClose: () => void;
  onFilter: (criteria: { city: string; type: string }) => void;
}

export default function CourtFilterModal({ onClose, onFilter }: CourtFilterModalProps) {
  const [city, setCity] = useState('');
  const [type, setType] = useState('');

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ city, type });
  };

  return (
    <CourtModal title="Filter Courts" onClose={onClose}>
      <form onSubmit={handleFilter} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="">All</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </form>
    </CourtModal>
  );
}
