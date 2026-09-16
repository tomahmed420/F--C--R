import { NextResponse } from 'next/server';

// The app currently keeps the demo privacy-friendly: the image is only used client-side
// for the generated comedy card. This endpoint is a ready seam for optional storage later.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body.image !== 'string') return NextResponse.json({ error:'Invalid image payload' }, { status:400 });
    if (!body.consent) return NextResponse.json({ error:'Explicit upload consent is required' }, { status:400 });
    const approxBytes = Math.floor(body.image.length * 0.75);
    if (approxBytes > 8 * 1024 * 1024) return NextResponse.json({ error:'Image too large' }, { status:413 });
    return NextResponse.json({ ok:true, message:'Upload accepted for configured storage.', storageConfigured:false });
  } catch {
    return NextResponse.json({ error:'Invalid request' }, { status:400 });
  }
}
