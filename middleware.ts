import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

const protectedPaths = ['/dashboard', '/api/exams', '/api/ai/analyze'];
const authPaths = ['/api/auth/login', '/api/auth/demo', '/api/auth/logout'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow auth endpoints
  if (authPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if path is protected
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));
  
  if (!isProtected) {
    return NextResponse.next();
  }

  // Verify session
  try {
    const token = request.cookies.get('session')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = await verifySession(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/exams/:path*',
    '/api/ai/:path*',
  ],
};
