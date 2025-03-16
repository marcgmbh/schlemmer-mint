import { ethers } from 'ethers';

// ABI for ERC-721 NFT contract (minimal version for token queries)
const MINIMAL_ERC721_ABI = [
  'function balanceOf(address owner) external view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)',
  'function tokenURI(uint256 tokenId) external view returns (string)',
  'function totalSupply() external view returns (uint256)',
  'function tokenByIndex(uint256 index) external view returns (uint256)'
];

// Bauhaus Signet contract address
const CONTRACT_ADDRESS = '0x2fb65031a2269de88ca6109cfce61b3cc58b7012';

// Create provider (use Infura, Alchemy, or another provider)
const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ETH_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/your-api-key'
);

// Create contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, MINIMAL_ERC721_ABI, provider);

export async function getTotalSupply(): Promise<number> {
  try {
    const supply = await contract.totalSupply();
    return supply.toNumber();
  } catch (error) {
    console.error('Error getting total supply:', error);
    throw error;
  }
}

export async function getTokenIds(limit: number = 20): Promise<number[]> {
  try {
    const supply = await getTotalSupply();
    const count = Math.min(supply, limit);
    
    const tokenIds: number[] = [];
    for (let i = 0; i < count; i++) {
      const tokenId = await contract.tokenByIndex(i);
      tokenIds.push(tokenId.toNumber());
    }
    
    return tokenIds;
  } catch (error) {
    console.error('Error getting token IDs:', error);
    throw error;
  }
}

export async function getTokenMetadata(tokenId: number): Promise<any> {
  try {
    const tokenURI = await contract.tokenURI(tokenId);
    
    // If tokenURI is IPFS
    if (tokenURI.startsWith('ipfs://')) {
      const ipfsHash = tokenURI.replace('ipfs://', '');
      const url = `https://ipfs.io/ipfs/${ipfsHash}`;
      const response = await fetch(url);
      return await response.json();
    }
    
    // If tokenURI is HTTP
    if (tokenURI.startsWith('http')) {
      const response = await fetch(tokenURI);
      return await response.json();
    }
    
    // If tokenURI is base64 encoded
    if (tokenURI.startsWith('data:application/json;base64,')) {
      const base64Data = tokenURI.replace('data:application/json;base64,', '');
      const jsonString = atob(base64Data);
      return JSON.parse(jsonString);
    }
    
    throw new Error('Unsupported token URI format');
  } catch (error) {
    console.error(`Error getting metadata for token ${tokenId}:`, error);
    throw error;
  }
} 