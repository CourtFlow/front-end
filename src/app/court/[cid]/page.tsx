import React from 'react';
import getCourt from '@/libs/getCourt';

export default async function CourtDetailPage({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  const result = await getCourt(cid);

  if (!result || !result.data) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <div className="text-6xl mb-2">🏟️</div>
          <h2 className="text-2xl font-semibold">Court not found</h2>
          <p className="text-gray-600">The requested court could not be loaded.</p>
        </div>
      </div>
    );
  }

  const c = result.data as any;

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-8">
        <div className="text-6xl mb-2">🏟️</div>
        <h2 className="text-3xl font-bold">{c.name}</h2>
        <p className="text-gray-600">Court details and status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6 bg-white shadow">
          <h3 className="text-xl font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>ID:</strong> {c.id}</li>
            <li><strong>Location:</strong> {c.location}</li>
            <li><strong>Type:</strong> {c.type}</li>
            <li><strong>Capacity:</strong> {c.capacity}</li>
            <li><strong>Price per hour:</strong> ${c.pricePerHour}</li>
            <li>
              <strong>Status:</strong>{' '}
              <span className={`px-2 py-1 rounded text-white ${c.available ? 'bg-green-500' : 'bg-gray-500'}`}>
                {c.available ? 'Available' : 'Unavailable'}
              </span>
            </li>
          </ul>
        </div>

        <div className="border rounded-xl p-6 bg-white shadow">
          <h3 className="text-xl font-semibold mb-4">Actions</h3>
          <p className="text-gray-600">Queue interactions can be added here.</p>
        </div>
      </div>
    </div>
  );
}
