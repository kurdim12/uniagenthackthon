import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user has organization and is owner/admin
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId,
        role: { in: ['OWNER', 'ADMIN'] },
      },
      include: {
        organization: true,
      },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'You must be an organization owner or admin to invite members' },
        { status: 403 }
      );
    }

    // Check if user already exists
    let invitedUser = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, create placeholder (they'll complete signup)
    if (!invitedUser) {
      invitedUser = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
          passwordHash: null, // They'll set password during signup
        },
      });
    }

    // Check if already a member
    const existingMembership = await prisma.organizationMember.findFirst({
      where: {
        organizationId: membership.organizationId,
        userId: invitedUser.id,
      },
    });

    if (existingMembership) {
      return NextResponse.json(
        { error: 'User is already a team member' },
        { status: 400 }
      );
    }

    // Add to organization
    await prisma.organizationMember.create({
      data: {
        organizationId: membership.organizationId,
        userId: invitedUser.id,
        role: 'MEMBER',
      },
    });

    // Send invitation email (implement this)
    // await sendInvitationEmail(email, membership.organization.name);

    return NextResponse.json({
      success: true,
      message: 'Invitation sent successfully',
    });
  } catch (error) {
    console.error('Invite error:', error);
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    );
  }
}
