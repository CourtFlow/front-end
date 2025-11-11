import { CourtJson } from "../../interfaces";

export default async function getCourt(courtId: string) {
  const res = await fetch(`http://localhost:3003/api/courts/${courtId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch court data');
  }

  return res.json();
}
