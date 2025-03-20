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
// Using a placeholder default address to prevent build errors
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x8f99d2f45EB3b2f3319144aa8dF9E7cbA566a261';

// Bauhaus Signet contract address
export const BAUHAUS_CONTRACT_ADDRESS = contractAddress as `0x${string}`;

// Create public client
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

export const BAUHAUS_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mintPublic",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "publicSaleActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export async function getTotalSupply(): Promise<number> {
  try {
    const supply = await publicClient.readContract({
      address: BAUHAUS_CONTRACT_ADDRESS,
      abi: BAUHAUS_ABI,
      functionName: 'totalSupply',
    });
    return Number(supply);
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
      const tokenId = await publicClient.readContract({
        address: BAUHAUS_CONTRACT_ADDRESS,
        abi: BAUHAUS_ABI,
        functionName: 'tokenOfOwnerByIndex',
        args: [BAUHAUS_CONTRACT_ADDRESS, BigInt(i)],
      });
      tokenIds.push(Number(tokenId));
    }
    
    return tokenIds;
  } catch (error) {
    console.error('Error getting token IDs:', error);
    throw error;
  }
}

export async function getTokenMetadata(tokenId: number): Promise<any> {
  try {
    const tokenURI = await publicClient.readContract({
      address: BAUHAUS_CONTRACT_ADDRESS,
      abi: BAUHAUS_ABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    });
    
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