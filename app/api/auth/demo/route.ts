import { NextResponse } from 'next/server';
import { ensureDemoUser } from '@/lib/auth';
import { createSession, setSessionCookie } from '@/lib/session';

export async function POST() {
  try {
    const user = await ensureDemoUser();
    const token = await createSession(user.id);
    await setSessionCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create demo session' },
      { status: 500 }
    );
  }
}
