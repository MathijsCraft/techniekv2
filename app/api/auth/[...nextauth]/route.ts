import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextRequest, NextResponse } from 'next/server';

// API route handler
export async function GET(req: NextRequest) {
  return NextAuth(authOptions)(req, NextResponse);
}

export async function POST(req: NextRequest) {
  return NextAuth(authOptions)(req, NextResponse);
}
