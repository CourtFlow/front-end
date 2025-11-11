'use client';
import React, { useState } from 'react';
import axios from 'axios';

export interface Team {
  id: string | number;
  name: string;
  description: string;
  members: any[];
  createdBy: string;
}

interface TeamManagerProps {
  courtId: string | number;
  initialTeams: Team[];
}

export default function TeamManager({ courtId, initialTeams }: TeamManagerProps) {
  const [teams, setTeams] = useState<Team[]>(initialTeams || []);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDesc, setNewTeamDesc] = useState('');
  const [newTeamCreator, setNewTeamCreator] = useState('');
  const [joinUserId, setJoinUserId] = useState('');
  const [joinUserName, setJoinUserName] = useState('');
  const [teamToDelete, setTeamToDelete] = useState<string | number | null>(null);
  const [teamToJoin, setTeamToJoin] = useState<string | number | null>(null);

  const handleCreateTeam = async () => {
    try {
      const res = await axios.post('/api/teams/create', {
        name: newTeamName,
        description: newTeamDesc,
        createdBy: newTeamCreator,
        courtId, // optional if you want to link the team to this court
      });
      setTeams([...teams, res.data]);
      setNewTeamName('');
      setNewTeamDesc('');
      setNewTeamCreator('');
    } catch (err) {
      console.error(err);
      alert('Failed to create team.');
    }
  };

  const handleDeleteTeam = async (id: string | number) => {
    try {
      await axios.post('/api/teams/delete', { team_id: id });
      setTeams(teams.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete team.');
    }
  };

  const handleJoinTeam = async (id: string | number) => {
    try {
      await axios.post('/api/teams/join', {
        teamId: id,
        userId: joinUserId,
        userName: joinUserName,
      });
      alert('Joined team successfully!');
      setJoinUserId('');
      setJoinUserName('');
      setTeamToJoin(null);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data || 'Failed to join team.');
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Teams for this Court</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="border rounded p-4 shadow-sm">
            <h4 className="font-bold">{team.name}</h4>
            <p className="text-gray-600">{team.description}</p>
            <p className="text-gray-500">Created by: {team.createdBy}</p>
            <p className="text-gray-500">Members: {team.members.length}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => setTeamToJoin(team.id)}
              >
                Join
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteTeam(team.id)}
              >
                Delete
              </button>
            </div>

            {/* Join Form */}
            {teamToJoin === team.id && (
              <div className="mt-2 border-t pt-2">
                <input
                  type="text"
                  placeholder="User ID"
                  value={joinUserId}
                  onChange={(e) => setJoinUserId(e.target.value)}
                  className="border p-1 mr-1"
                />
                <input
                  type="text"
                  placeholder="User Name"
                  value={joinUserName}
                  onChange={(e) => setJoinUserName(e.target.value)}
                  className="border p-1 mr-1"
                />
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleJoinTeam(team.id)}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Team Form */}
      <div className="mt-6 border-t pt-4">
        <h4 className="font-bold mb-2">Create New Team</h4>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Team Name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            className="border p-2 flex-1"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTeamDesc}
            onChange={(e) => setNewTeamDesc(e.target.value)}
            className="border p-2 flex-1"
          />
          <input
            type="text"
            placeholder="Created By"
            value={newTeamCreator}
            onChange={(e) => setNewTeamCreator(e.target.value)}
            className="border p-2 flex-1"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleCreateTeam}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
