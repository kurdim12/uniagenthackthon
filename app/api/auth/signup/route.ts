import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/db';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, plan } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hash(password, 12);

    // Generate verification token
    const verificationToken = randomBytes(32).toString('hex');

    // Determine plan and trial
    const userPlan = plan === 'pro' ? 'PRO' : plan === 'enterprise' ? 'ENTERPRISE' : 'FREE';
    const trialEndsAt = userPlan !== 'FREE' 
      ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      : undefined;

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        verificationToken,
        plan: userPlan,
        subscriptionStatus: userPlan === 'FREE' ? 'INACTIVE' : 'TRIALING',
        trialEndsAt,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken, name);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please check your email to verify.',
      userId: user.id,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
