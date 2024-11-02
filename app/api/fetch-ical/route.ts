import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing iCal URL' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch iCal data');
    }

    const icalData = await response.text();
    return NextResponse.json({ icalData });
  } catch (error) {
    console.error('Error fetching iCal data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch iCal data' },
      { status: 500 }
    );
  }
}
