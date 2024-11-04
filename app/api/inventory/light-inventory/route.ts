// /app/api/inventory/lighting-inventory/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch all lighting inventory items
  try {
    const inventory = await prisma.lightingInventory.findMany({
      include: {
        label: true, // Include related catalog data
      },
    });
    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { tag, number, locatie, status, dmx, universe } = await request.json();

  // Create a new lighting inventory item
  try {
    const newInventoryItem = await prisma.lightingInventory.create({
      data: {
        tag,
        number,
        locatie,
        status,
        dmx,
        universe,
      },
    });
    return NextResponse.json(newInventoryItem, { status: 201 });
  } catch (error) {
    console.error('Error creating inventory item:', error);
    return NextResponse.json({ error: 'Failed to create inventory item' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, tag, number, locatie, status, dmx, universe } = await request.json();

  // Update an existing lighting inventory item
  try {
    const updatedInventoryItem = await prisma.lightingInventory.update({
      where: { id },
      data: {
        tag,
        number,
        locatie,
        status,
        dmx,
        universe,
      },
    });
    return NextResponse.json(updatedInventoryItem, { status: 200 });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    return NextResponse.json({ error: 'Failed to update inventory item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  // Delete an existing lighting inventory item
  try {
    await prisma.lightingInventory.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Inventory item deleted' }, { status: 204 });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return NextResponse.json({ error: 'Failed to delete inventory item' }, { status: 500 });
  }
}
