import { createPublicClient, http } from 'viem';
import { mainnet } from 'wagmi/chains';

// ABI for ERC-721 NFT contract (minimal version for token queries)
const MINIMAL_ERC721_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }]
  },
  {
    name: 'tokenOfOwnerByIndex',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' }, 
      { name: 'index', type: 'uint256' }
    ],
    outputs: [{ name: 'tokenId', type: 'uint256' }]
  },
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: 'uri', type: 'string' }]
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'supply', type: 'uint256' }]
  },
  {
    name: 'tokenByIndex',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'index', type: 'uint256' }],
    outputs: [{ name: 'tokenId', type: 'uint256' }]
  }
];

// Get contract address from environment variable or use a default
// Using the actual contract address provided
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x2fb65031a2269de88ca6109cfce61b3cc58b7012';

// Bauhaus Signet contract address
export const BAUHAUS_CONTRACT_ADDRESS = contractAddress as `0x${string}`;

// Define mint price explicitly
export const MINT_PRICE = '0.0888';

// Create a public client for interacting with the blockchain
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

// Bauhaus ABI with the functions we need
export const BAUHAUS_ABI = [
  // Read functions
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }]
  },
  {
    name: 'publicSaleActive',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'active', type: 'bool' }]
  },
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: 'uri', type: 'string' }]
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'supply', type: 'uint256' }]
  },
  
  // Write functions
  {
    name: 'mintPublic',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'quantity', type: 'uint256' }],
    outputs: []
  }
];

// Function to get total supply
export async function getTotalSupply(): Promise<number> {
  try {
    const totalSupply = await publicClient.readContract({
      address: BAUHAUS_CONTRACT_ADDRESS,
      abi: BAUHAUS_ABI,
      functionName: 'totalSupply',
    });
    
    return Number(totalSupply);
  } catch (error) {
    console.error('Error fetching total supply:', error);
    return 0;
  }
}

// Function to get token IDs for display
export async function getTokenIds(limit: number = 10): Promise<number[]> {
  try {
    const totalSupply = await getTotalSupply();
    const tokenIds: number[] = [];
    
    // Get the most recently minted tokens (up to the limit)
    const start = Math.max(0, totalSupply - limit);
    const end = totalSupply;
    
    for (let i = start; i < end; i++) {
      try {
        const tokenId = await publicClient.readContract({
          address: BAUHAUS_CONTRACT_ADDRESS,
          abi: BAUHAUS_ABI,
          functionName: 'tokenByIndex',
          args: [BigInt(i)],
        });
        
        tokenIds.push(Number(tokenId));
      } catch (error) {
        console.error(`Error fetching token at index ${i}:`, error);
      }
    }
    
    return tokenIds;
  } catch (error) {
    console.error('Error fetching token IDs:', error);
    return [];
  }
}

// Function to get token metadata
export async function getTokenMetadata(tokenId: number): Promise<any> {
  try {
    const tokenURI = await publicClient.readContract({
      address: BAUHAUS_CONTRACT_ADDRESS,
      abi: BAUHAUS_ABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    });
    
    // If the URI is IPFS, convert to HTTP gateway URL
    const formattedURI = (tokenURI as string).replace('ipfs://', 'https://ipfs.io/ipfs/');
    
    // Fetch the metadata from the URI
    const response = await fetch(formattedURI);
    const metadata = await response.json();
    
    return {
      id: tokenId,
      ...metadata,
    };
  } catch (error) {
    console.error(`Error fetching metadata for token ${tokenId}:`, error);
    return { id: tokenId, name: `Bauhaus Signet #${tokenId}`, error: 'Failed to load metadata' };
  }
} 