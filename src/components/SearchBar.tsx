'use client';
import React from 'react';

export default function SearchBar({ onFilter }: { onFilter: () => void }) {
	return (
		<div className="flex items-center mb-6 gap-3">
			<select className="border p-2 rounded-md">
				<option>All Courts</option>
				<option>By Name</option>
				<option>By Location</option>
			</select>
			<input
				type="text"
				className="border p-2 rounded-md flex-1"
				placeholder="Search..."
			/>
			<button className="bg-emerald-500 text-white px-4 py-2 rounded-md">
				Search
			</button>
			<button
				onClick={onFilter}
				className="bg-blue-500 text-white px-4 py-2 rounded-md"
			>
				Filter
			</button>
		</div>
	);
}
