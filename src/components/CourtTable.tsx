'use client';
import React from 'react';

interface Court {
	id: string | number;
	name: string;
	location: string;
	type: string;
	capacity: number;
	pricePerHour: number;
	available: boolean;
}

interface CourtTableProps {
	courts: Court[];
	onView: (court: Court) => void;
	onDelete: (courtId: string | number) => void;
}

export default function CourtTable({ courts, onView, onDelete }: CourtTableProps) {
	return (
		<table className="w-full border mt-6">
			<thead className="bg-gray-100">
				<tr>
					<th className="p-2">Court Name</th>
					<th>Location</th>
					<th>Type</th>
					<th>Capacity</th>
					<th>Price/Hour</th>
					<th>Status</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{courts.length > 0 ? (
					courts.map((court) => (
						<tr key={court.id} className="border-b">
							<td className="p-2">{court.name}</td>
							<td>{court.location}</td>
							<td>{court.type}</td>
							<td>{court.capacity} people</td>
							<td>${court.pricePerHour}</td>
							<td>
								<span
									className={`px-2 py-1 rounded text-white ${
										court.available ? 'bg-green-500' : 'bg-gray-500'
									}`}
								>
									{court.available ? 'Available' : 'Unavailable'}
								</span>
							</td>
							<td>
								<button
									className="text-blue-600 underline mr-2"
									onClick={() => onView(court)}
								>
									View
								</button>
								<button
									className="text-red-600 underline"
									onClick={() => onDelete(court.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan={7} className="text-center py-4 text-gray-500">
							No courts found.
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}
