'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

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

interface CourtQueueCardProps {
  courtQueue: CourtQueue;
}

export default function CourtQueueCard({ courtQueue }: CourtQueueCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/court/${courtQueue.courtId}`);
  };

  return (
    <div
      className="col-md-6 mb-4 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="card shadow-sm hover:shadow-lg transition">
        <div className="card-header bg-warning text-white">
          <h5 className="mb-0">🏟️ {courtQueue.courtName}</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6 text-center border-right">
              <div className="text-2xl font-bold text-warning">{courtQueue.queueLength}</div>
              <small className="text-muted">People in Queue</small>
            </div>
            <div className="col-6 text-center">
              <div className="text-2xl font-bold text-warning">{courtQueue.averageWaitTime}</div>
              <small className="text-muted">Est. Wait (min)</small>
            </div>
          </div>
          <hr />
          <h6>Queue List:</h6>
          {courtQueue.users && courtQueue.users.length > 0 ? (
            <ol className="mb-0">
              {courtQueue.users.map((user, idx) => (
                <li key={idx}>
                  <strong>{user.userName}</strong>
                  {user.teamId && (
                    <span className="badge bg-info text-white ms-2">Team</span>
                  )}
                  <span className="text-muted float-end">{user.joinedAt}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-muted text-center mb-0">No one in queue</p>
          )}
        </div>
      </div>
    </div>
  );
}
