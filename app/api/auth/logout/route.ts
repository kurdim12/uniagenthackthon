import { NextResponse } from 'next/server';
import { getSessionToken, clearSessionCookie, deleteSession } from '@/lib/session';

export async function POST() {
  try {
    const token = await getSessionToken();
    
    if (token) {
      await deleteSession(token);
    }
    
    await clearSessionCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
