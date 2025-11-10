'use client';

import React, { useState, useEffect } from 'react';
import CourtTable from '@/components/CourtTable';
import SearchBar from '@/components/SearchBar';
import CourtFormModal from '@/components/modals/CourtFormModal';
import CourtFilterModal from '@/components/modals/CourtFilterModal';
import CourtDeleteModal from '@/components/modals/CourtDeleteModal';
import CourtModal from '@/components/modals/CourtModal';

export default function CourtsPage() {
	const [courts, setCourts] = useState<any[]>([]);
	const [selectedCourt, setSelectedCourt] = useState<any>(null);
	const [deleteCourtId, setDeleteCourtId] = useState<string | null>(null);
	const [filterOpen, setFilterOpen] = useState(false);
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		// Fetch court list from API
		fetch('/api/courts')
			.then((res) => res.json())
			.then((data) => setCourts(data))
			.catch(console.error);
	}, []);

	return (
		<div className="container mx-auto py-10">
			<div className="text-center mb-8">
				<div className="text-6xl mb-2">🏟️</div>
				<h2 className="text-3xl font-bold">Court Management</h2>
				<p className="text-gray-600">CRUD example with Next.js and gRPC</p>
			</div>

			<SearchBar onFilter={() => setFilterOpen(true)} />

			<CourtTable
				courts={courts}
				onView={(court) => setSelectedCourt(court)}
				onDelete={(id) => setDeleteCourtId(String(id))}
			/>

			<div className="text-right mt-4">
				<button
					className="bg-green-500 text-white px-4 py-2 rounded-md"
					onClick={() => setFormOpen(true)}
				>
					Add New Court
				</button>
			</div>

			{/* Modals */}
            {formOpen && (
            <CourtFormModal
                onClose={() => setFormOpen(false)}
                onSubmit={(newCourt) => {
                setCourts([...courts, newCourt]); // add new court to state
                setFormOpen(false);
                }}
            />
            )}
            {/* {filterOpen && <CourtFilterModal onClose={() => setFilterOpen(false)} />}
            {selectedCourt && (
            <CourtModal court={selectedCourt} onClose={() => setSelectedCourt(null)} />
            )}
            {deleteCourtId && (
            <CourtDeleteModal
                courtId={deleteCourtId}
                onClose={() => setDeleteCourtId(null)}
            />
            )} */}
		</div>
	);
}
