import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSession, setSessionCookie } from '@/lib/session';
import { sendWelcomeEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(
      new URL('/auth/login?error=invalid-token', request.url)
    );
  }

  try {
    // Find user with this verification token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        emailVerified: false,
      },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL('/auth/login?error=invalid-token', request.url)
      );
    }

    // Mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name, user.plan);

    // Create session and log user in
    const sessionToken = await createSession(user.id);
    await setSessionCookie(sessionToken);

    // Redirect to dashboard
    return NextResponse.redirect(
      new URL('/dashboard?verified=true', request.url)
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.redirect(
      new URL('/auth/login?error=verification-failed', request.url)
    );
  }
}
