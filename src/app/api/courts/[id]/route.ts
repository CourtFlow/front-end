export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

async function fetchViaHttpFallback(id: string) {
  const bases = [
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_API_BASE_URL,
    'http://localhost:3003/api',
    'http://localhost:5000/api/v1',
  ].filter(Boolean) as string[];

  for (const base of bases) {
    const url = `${base!.replace(/\/$/, '')}/courts/${encodeURIComponent(id)}`;
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) continue;
      const json = await res.json();
      if (json?.data) return json;
      if (json?.id) return { success: true, data: json };
    } catch (_) {
      // try next
    }
  }

  // Fallback: fetch list then pick by id
  for (const base of bases) {
    const listUrl = `${base!.replace(/\/$/, '')}/courts`;
    try {
      const res = await fetch(listUrl, { cache: 'no-store' });
      if (!res.ok) continue;
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) continue;
      const json = await res.json();
      const arr = (Array.isArray(json?.data) ? json.data : (Array.isArray(json?.courts) ? json.courts : [])) as any[];
      const found = arr.find((c) => String(c?.id) === String(id));
      if (found) return { success: true, data: found };
    } catch (_) {
      // try next
    }
  }
  return null;
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  // HTTP fallback chain
  const httpResult = await fetchViaHttpFallback(id);
  if (httpResult) {
    return NextResponse.json(httpResult);
  }

  return NextResponse.json({ success: false, error: 'Court not found' }, { status: 404 });
}
