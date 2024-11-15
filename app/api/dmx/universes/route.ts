// app/api/dmx/universes/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all unique universes
    const universes = await prisma.lightingInventory.findMany({
      select: {
        universe: true,
      },
      distinct: ['universe'],
    });

    const uniqueUniverses = universes.map((item) => item.universe);

    return NextResponse.json(uniqueUniverses);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch universes' },
      { status: 500 }
    );
  }
}
