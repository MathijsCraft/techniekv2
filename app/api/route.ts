import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
// import { authOptions } from './auth/[...nextauth]/route';
import { authOptions } from './auth/[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(authOptions);

  console.log({ session });

  return NextResponse.json({ authenticated: !!session, session });
}
