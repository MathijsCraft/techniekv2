import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust import path accordingly

// Handle POST requests
export async function POST(req: Request) {
  try {
    const { tag, brand, type, soort, dmx } = await req.json();

    const newLamp = await prisma.lightingCatalog.create({
      data: {
        tag,
        brand,
        type,
        soort,
        dmx,
      },
    });

    return NextResponse.json(newLamp, { status: 200 });
  } catch (error) {
    console.error('Error adding lamp:', error);

    // Check if the error is an instance of Error
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        return NextResponse.json({ error: 'Tag must be unique' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to add lamp: ' + error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to add lamp' }, { status: 500 });
    }
  }
}

// Optional: Handle other HTTP methods
export async function GET(req: Request) {
  // Logic for handling GET requests can be added here if needed
  return NextResponse.json({ message: 'GET method is not implemented.' }, { status: 501 });
}
