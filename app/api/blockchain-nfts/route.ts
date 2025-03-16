import { NextResponse } from 'next/server';
import { getTokenIds, getTokenMetadata } from '@/utils/blockchain';

export async function GET() {
  try {
    const tokenIds = await getTokenIds(12); // Limit to 12 tokens
    
    const metadataPromises = tokenIds.map(id => getTokenMetadata(id)
      .then(metadata => ({
        id,
        metadata,
      }))
      .catch(error => {
        console.error(`Error fetching metadata for token ${id}:`, error);
        return { id, metadata: null, error: true };
      })
    );
    
    const results = await Promise.all(metadataPromises);
    const tokens = results.filter(result => !result.error);
    
    return NextResponse.json({ tokens });
  } catch (error) {
    console.error('Error fetching blockchain NFTs:', error);
    return NextResponse.json({ error: 'Failed to fetch blockchain data' }, { status: 500 });
  }
} 