// /app/api/inventory/light-catalog/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Fetch all lighting catalogs
export async function GET() {
  try {
    const catalogs = await prisma.lightingCatalog.findMany();
    return NextResponse.json(catalogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching catalogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch catalogs' },
      { status: 500 }
    );
  }
}

// Create a new lighting catalog
export async function POST(request: Request) {
  const { tag, brand, type, soort, dmx } = await request.json();

  try {
    const newCatalog = await prisma.lightingCatalog.create({
      data: {
        tag,
        brand,
        type,
        soort,
        dmx,
      },
    });
    return NextResponse.json(newCatalog, { status: 201 });
  } catch (error) {
    console.error('Error creating catalog:', error);
    return NextResponse.json(
      { error: 'Failed to create catalog' },
      { status: 500 }
    );
  }
}

// Update an existing lighting catalog
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id'); // Get the ID from query parameters
  const { tag, brand, type, soort, dmx } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const updatedCatalog = await prisma.lightingCatalog.update({
      where: { id }, // Use ID directly
      data: {
        tag,
        brand,
        type,
        soort,
        dmx,
      },
    });
    return NextResponse.json(updatedCatalog, { status: 200 });
  } catch (error) {
    console.error('Error updating catalog:', error);
    return NextResponse.json(
      { error: 'Failed to update catalog' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url); // Get the URL parameters
  const id = searchParams.get('id'); // Extract the id from query parameters

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // Attempt to delete the item by ID
    await prisma.lightingCatalog.delete({
      where: {
        id: id, // Assuming `id` is the unique identifier for your database record
      },
    });
    return new Response(null, { status: 204 }); // Send a 204 No Content response
  } catch (error) {
    console.error('Error deleting catalog:', error);
    return NextResponse.json(
      { error: 'Failed to delete catalog' },
      { status: 500 }
    );
  }
}
