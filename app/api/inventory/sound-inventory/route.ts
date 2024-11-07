// /app/api/inventory/sound-inventory/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Fetch all sound inventory items
export async function GET() {
  try {
    const inventoryItems = await prisma.soundInventory.findMany({
      include: {
        label: true, // Include related SoundCatalog if needed
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

// Create a new sound inventory item
export async function POST(request: Request) {
  const { tag, number, locatie, status, patch, stereo } = await request.json(); // Updated to match SoundInventory fields

  try {
    const newInventoryItem = await prisma.soundInventory.create({
      data: {
        tag,
        number,
        locatie,
        status,
        patch,
        stereo, // Boolean field indicating if the sound is stereo
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

// Update an existing sound inventory item
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Get the ID from query parameters
  const { tag, number, locatie, status, patch, stereo } = await request.json(); // Updated to match SoundInventory fields

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const updatedInventoryItem = await prisma.soundInventory.update({
      where: { id }, // Use ID directly
      data: {
        tag,
        number,
        locatie,
        status,
        patch,
        stereo, // Boolean field indicating if the sound is stereo
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

// Delete a sound inventory item
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url); // Get the URL parameters
  const id = searchParams.get('id'); // Extract the id from query parameters

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // Attempt to delete the item by ID
    await prisma.soundInventory.delete({
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
