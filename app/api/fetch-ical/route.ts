import { NextResponse } from 'next/server';

interface CacheData {
  icalData: string;
  timestamp: number; // Timestamp of when the cache was created
}

let cache: CacheData | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const icalUrl = searchParams.get('url');

  if (!icalUrl) {
    return NextResponse.json({ error: 'Missing iCal URL' }, { status: 400 });
  }

  // Check if the cache is still valid (24 hours)
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('Using cached iCal data');

    // Create response with Cache-Control header for cached data
    const response = NextResponse.json({ icalData: cache.icalData });
    response.headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    return response;
  }

  try {
    // Fetch iCal data from the provided URL
    const response = await fetch(icalUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch iCal data');
    }

    const icalData = await response.text();

    // Cache the fetched iCal data with the current timestamp
    cache = {
      icalData,
      timestamp: Date.now(),
    };

    console.log('Fetched new iCal data');

    // Create response with Cache-Control header for newly fetched data
    const jsonResponse = NextResponse.json({ icalData });
    jsonResponse.headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    return jsonResponse;
  } catch (error) {
    console.error('Error fetching iCal data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch iCal data' },
      { status: 500 }
    );
  }
}
