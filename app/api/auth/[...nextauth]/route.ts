import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

// API route handler
export async function GET(req: NextRequest) {
  const nextApiRequest = req as unknown as NextApiRequest;
  const nextApiResponse = NextResponse.next() as unknown as NextApiResponse;
  
  // This line will call NextAuth correctly with the appropriate request/response format
  return NextAuth(nextApiRequest, nextApiResponse, authOptions);
}

export async function POST(req: NextRequest) {
  const nextApiRequest = req as unknown as NextApiRequest;
  const nextApiResponse = NextResponse.next() as unknown as NextApiResponse;
  
  // This line will call NextAuth correctly with the appropriate request/response format
  return NextAuth(nextApiRequest, nextApiResponse, authOptions);
}
