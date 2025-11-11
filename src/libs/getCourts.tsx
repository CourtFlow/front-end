import { CourtJson } from "../../interfaces";
const baseCandidates = [
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_API_BASE_URL,
].filter(Boolean) as string[];

const unique = <T,>(arr: T[]) => Array.from(new Set(arr));

const makeUrl = (base: string) => `${base.replace(/\/$/, "")}/courts`;

const endpoints = unique([
  "/api/courts",
  ...baseCandidates.map(makeUrl),
  "http://localhost:5000/api/v1/courts",
  "http://localhost:3003/api/courts",
]);

export default async function getCourts(): Promise<CourtJson> {
  let lastError: unknown = null;

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} from ${url}`);
        continue;
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        lastError = new Error(`Non-JSON response from ${url}`);
        continue;
      }

      const json: CourtJson = await res.json();
      return json;
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  return { success: false, data: [] as any } as CourtJson;
}
