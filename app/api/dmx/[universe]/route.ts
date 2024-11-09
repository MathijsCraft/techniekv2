// app/api/dmx/[universe]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { universe: string } }
) {
  try {
    const universe = Number(params.universe);
    if (isNaN(universe)) {
      return NextResponse.json(
        { error: 'Invalid universe parameter' },
        { status: 400 }
      );
    }

    const inventories = await prisma.lightingInventory.findMany({
      where: { universe },
      include: {
        label: true,
      },
    });

    return NextResponse.json(inventories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory data' },
      { status: 500 }
    );
  }
}
