// app/api/dmx/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Use your Prisma client

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const universe = searchParams.get('universe');

    const inventories = await prisma.lightingInventory.findMany({
      where: {
        ...(universe && { universe: Number(universe) }), // Filter by universe if provided
      },
      include: {
        label: true, // Include related LightingCatalog data
      },
    });

    return NextResponse.json(inventories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
