// /app/api/inventory/light-inventory/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Fetch all lighting inventory items
export async function GET() {
  try {
    const inventoryItems = await prisma.lightingInventory.findMany({
      include: {
        label: true, // Include related LightingCatalog if needed
      },
    });
    return NextResponse.json(inventoryItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory items' },
      { status: 500 }
    );
  }
}

// Create a new lighting inventory item
export async function POST(request: Request) {
  const { tag, number, locatie, status, dmx, universe } = await request.json();

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
    return NextResponse.json(
      { error: 'Failed to create inventory item' },
      { status: 500 }
    );
  }
}

// Update an existing lighting inventory item
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Get the ID from query parameters
  const { tag, number, locatie, status, dmx, universe } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const updatedInventoryItem = await prisma.lightingInventory.update({
      where: { id }, // Use ID directly
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
    return NextResponse.json(
      { error: 'Failed to update inventory item' },
      { status: 500 }
    );
  }
}

// Delete a lighting inventory item
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url); // Get the URL parameters
  const id = searchParams.get('id'); // Extract the id from query parameters

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // Attempt to delete the item by ID
    await prisma.lightingInventory.delete({
      where: {
        id: id, // Assuming `id` is the unique identifier for your database record
      },
    });
    return new Response(null, { status: 204 }); // Send a 204 No Content response
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to delete inventory item' },
      { status: 500 }
    );
  }
}
