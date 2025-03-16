import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.OPENSEA_API_KEY || '';
    const response = await fetch(
      'https://api.opensea.io/api/v2/collection/bauhaus-signet/nfts?limit=20',
      {
        headers: {
          'X-API-KEY': apiKey,
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`OpenSea API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
} 