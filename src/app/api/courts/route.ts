export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

async function fetchViaHttpFallback() {
  const bases = [
    process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_API_BASE_URL,
    'http://localhost:3003/api',
    'http://localhost:5000/api/v1',
  ].filter(Boolean) as string[];

  const tried: string[] = [];
  for (const base of bases) {
    const url = `${base!.replace(/\/$/, '')}/courts`;
    tried.push(url);
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) continue;
      const json = await res.json();
      // Normalize shape to { success, data }
      if (json && Array.isArray(json.data)) return json;
      if (json && Array.isArray(json.courts)) return { success: true, data: json.courts };
    } catch (_) {
      // try next
    }
  }
  return { error: `All HTTP fallbacks failed: ${tried.join(', ')}` };
}

export async function GET() {
  // HTTP fallback chain
  const httpResult = await fetchViaHttpFallback();
  if ('data' in httpResult) {
    return NextResponse.json({ success: true, data: (httpResult as any).data });
  }

  return NextResponse.json(
    { success: false, error: (httpResult as any).error || 'Unable to fetch courts' },
    { status: 502 },
  );
}
