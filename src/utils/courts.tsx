import { AxiosResponse } from 'axios';

export const getCourt = async (courtId: string) => {
    const res = await fetch(`http://localhost:3000/api/courts/${courtId}`, {
      cache: 'no-store',
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch court data');
    }
  
    return res.json();
}