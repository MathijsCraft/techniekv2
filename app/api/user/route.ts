import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return NextResponse.json({ user });
}
