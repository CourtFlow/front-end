'use client';

import React, { useState, useEffect } from 'react';
import CourtTable from '@/components/CourtTable';
import SearchBar from '@/components/SearchBar';
import CourtFormModal from '@/components/modals/CourtFormModal';
import CourtFilterModal from '@/components/modals/CourtFilterModal';
import CourtDeleteModal from '@/components/modals/CourtDeleteModal';
import CourtModal from '@/components/modals/CourtModal';
import CourtCard from '@/components/CourtCard';
import CourtCatalog from '@/components/CourtCatalog';
import axios from 'axios';
import getCourts from '@/libs/getCourts';

interface Court {
    id: string | number;
    name: string;
    location: string;
    type: string;
    capacity: number;
    pricePerHour: number;
    available: boolean;
  }

export default async function CourtsPage() {
    const courtsJson = getCourts();

	const [courts, setCourts] = useState<any[]>([]);
	const [selectedCourt, setSelectedCourt] = useState<any>(null);
	const [deleteCourtId, setDeleteCourtId] = useState<string | null>(null);
	const [filterOpen, setFilterOpen] = useState(false);
	const [formOpen, setFormOpen] = useState(false);

	return (
		<div className="container mx-auto py-10">
			<div className="text-center mb-8">
				<div className="text-6xl mb-2">🏟️</div>
				<h2 className="text-3xl font-bold">Court Management</h2>
				<p className="text-gray-600">CRUD example with Next.js and gRPC</p>
			</div>

			<SearchBar onFilter={() => setFilterOpen(true)} />

			{/* <CourtTable
				courts={courts}
				onView={(court) => setSelectedCourt(court)}
				onDelete={(id) => setDeleteCourtId(String(id))}
			/> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {(await courtsJson).success ? (
                    <CourtCatalog courts={courtsJson}/>
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                    No courts found.
                    </p>
                )}
            </div>

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
            {filterOpen && <CourtFilterModal 
            onClose={() => setFilterOpen(false)} 
            onFilter={(filters) => {
                // apply filters to courts
                console.log(filters);
                setFilterOpen(false);
              }}/>}
            {selectedCourt && (
                <CourtModal title={selectedCourt.name} onClose={() => setSelectedCourt(null)}>
                    <p>Location: {selectedCourt.location}</p>
                    <p>Type: {selectedCourt.type}</p>
                    <p>Capacity: {selectedCourt.capacity} people</p>
                    <p>Price per Hour: ${selectedCourt.pricePerHour}</p>
                    <p>Status: {selectedCourt.available ? 'Available' : 'Unavailable'}</p>
                </CourtModal>
            )}
            {deleteCourtId && (
            <CourtDeleteModal
                courtName={courts.find(c => c.id === deleteCourtId)?.name || 'Court'}
                onClose={() => setDeleteCourtId(null)}
                onDelete={async () => {
                    try {
                      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/courts/${deleteCourtId}`);
                      
                      // Remove the deleted court from state
                      setCourts(courts.filter(c => c.id !== deleteCourtId));
              
                      // Close the modal
                      setDeleteCourtId(null);
                    } catch (error) {
                      console.error("Failed to delete court:", error);
                      alert("Failed to delete court. Please try again.");
                    }
            }}
          />
            )}
		</div>
	);
}
