import React from 'react';
import CourtModal from './CourtModal';

interface CourtDeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
  courtName: string;
}

export default function CourtDeleteModal({ onClose, onDelete, courtName }: CourtDeleteModalProps) {
  return (
    <CourtModal title="Delete Court" onClose={onClose}>
      <p className="text-gray-700 mb-6">
        Are you sure you want to delete <strong>{courtName}</strong>? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </CourtModal>
  );
}
