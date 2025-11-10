import React from 'react';

interface CourtModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function CourtModal({ title, children, onClose }: CourtModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px] relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        {children}
      </div>
    </div>
  );
}
