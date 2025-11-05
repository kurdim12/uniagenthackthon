import bcrypt from 'bcryptjs';
import { prisma } from './db';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}): Promise<{ id: string; email: string; name: string }> {
  const passwordHash = await hashPassword(data.password);
  
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      name: data.name,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return user;
}

export async function authenticateUser(email: string, password: string): Promise<{
  id: string;
  email: string;
  name: string;
} | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export async function ensureDemoUser(): Promise<{
  id: string;
  email: string;
  name: string;
}> {
  const demoEmail = process.env.DEMO_USER_EMAIL || 'demo@example.com';
  const demoPassword = process.env.DEMO_USER_PASSWORD || 'demo123';

  let user = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (!user) {
    const passwordHash = await hashPassword(demoPassword);
    user = await prisma.user.create({
      data: {
        email: demoEmail,
        passwordHash,
        name: 'Demo User',
        isDemo: true,
      },
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
