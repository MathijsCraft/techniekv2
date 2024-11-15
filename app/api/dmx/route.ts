// app/api/dmx/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const inventories = await prisma.lightingInventory.findMany({
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
