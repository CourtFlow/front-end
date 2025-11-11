'use client';
import React from 'react';
import CourtQueueCard from '@/components/CourtQueueCard';

interface QueueUser {
  userName: string;
  teamId?: string;
  joinedAt: string;
}

interface CourtQueue {
  courtId: string | number;
  courtName: string;
  queueLength: number;
  averageWaitTime: number;
  users?: QueueUser[];
}

interface QueuePageProps {
  courtQueues: CourtQueue[];
}

export default function QueuePage({ courtQueues }: QueuePageProps) {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <div className="text-5xl mb-2">⏱️</div>
        <h2>Queue Management</h2>
        <p className="lead">Click on a court to see its queue</p>
      </div>
      <div className="row">
        {courtQueues.length > 0 ? (
          courtQueues.map((cq) => (
            <CourtQueueCard key={cq.courtId} courtQueue={cq} />
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              <h5>No queues available</h5>
              <p>Create a court first, then people can join its queue</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
