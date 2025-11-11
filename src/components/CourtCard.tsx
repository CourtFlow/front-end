'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface CourtCardProps {
    name: string;
    id: string;
    location: string;
    type: string
    capacity: number;
    pricePerHour: number;
    available: boolean;
}

export default function CourtCard({ name, id, location, type, capacity, available, pricePerHour }: CourtCardProps) {

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="border rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition cursor-pointer"
    >
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 mb-1"><strong>ID:</strong> {id}</p>
      <p className="text-gray-600 mb-1"><strong>Location:</strong> {location}</p>
      <p className="text-gray-600 mb-1"><strong>Type:</strong> {type}</p>
      <p className="text-gray-600 mb-1"><strong>Capacity:</strong> {capacity} people</p>
      <p className="text-gray-600 mb-1"><strong>Price/hour:</strong> ${pricePerHour}</p>
      <p className="text-gray-600 mb-4">
        <strong>Status:</strong>{' '}
        <span
          className={`px-2 py-1 rounded text-white ${
            available ? 'bg-green-500' : 'bg-gray-500'
          }`}
        >
          {available ? 'Available' : 'Unavailable'}
        </span>
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={(e) => { stopPropagation(e); }}
          className="text-red-600 font-medium hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
