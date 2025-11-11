import { CourtJson } from "../../interfaces";

const endpoints = [
  "https://your-backend-1.example.com/api/courts",
  "https://your-backend-2.example.com/api/courts",
  "https://your-backend-3.example.com/api/courts",
];

export default async function getCourts(): Promise<CourtJson> {
  let lastError: unknown = null;

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { next: { revalidate: 60 } }); // optional Next.js caching
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} from ${url}`);
        continue;
      }

      const json: CourtJson = await res.json();
      return json;
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw new Error(`Failed to fetch courts from all endpoints: ${String(lastError)}`);
}
