import { createPublicClient, http } from 'viem';
import { mainnet } from 'wagmi/chains';

// ABI for ERC-721 NFT contract (minimal version for token queries)
const MINIMAL_ERC721_ABI = [
  'function balanceOf(address owner) external view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)',
  'function tokenURI(uint256 tokenId) external view returns (string)',
  'function totalSupply() external view returns (uint256)',
  'function tokenByIndex(uint256 index) external view returns (uint256)'
];

// Get contract address from environment variable or use a default
// Using the actual contract address provided
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x2fb65031a2269de88ca6109cfce61b3cc58b7012';

// Bauhaus Signet contract address
export const BAUHAUS_CONTRACT_ADDRESS = contractAddress as `0x${string}`;

// Create a public client for interacting with the blockchain
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

// Bauhaus ABI with the functions we need
export const BAUHAUS_ABI = [
  // Read functions
  'function balanceOf(address owner) external view returns (uint256)',
  'function publicSaleActive() external view returns (bool)',
  'function tokenURI(uint256 tokenId) external view returns (string)',
  'function totalSupply() external view returns (uint256)',
  
  // Write functions
  'function mintPublic(uint256 quantity) external payable',
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