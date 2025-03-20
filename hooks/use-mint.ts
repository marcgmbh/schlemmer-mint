import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { BAUHAUS_CONTRACT_ADDRESS, BAUHAUS_ABI } from '@/utils/blockchain';

// Get mint price from environment variable or default to 0.1 ETH
const MINT_PRICE = process.env.NEXT_PUBLIC_MINT_PRICE || '0.1';

export function useMint() {
  const [isMinting, setIsMinting] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintTxHash, setMintTxHash] = useState<`0x${string}` | null>(null);
  const [isSaleActive, setIsSaleActive] = useState(false);
  
  const { address, isConnected } = useAccount();
  
  // Check if public sale is active
  const { data: publicSaleActive } = useReadContract({
    address: BAUHAUS_CONTRACT_ADDRESS,
    abi: BAUHAUS_ABI,
    functionName: 'publicSaleActive',
  });
  
  // Update sale active state when readContract returns data
  useEffect(() => {
    if (publicSaleActive !== undefined) {
      setIsSaleActive(!!publicSaleActive);
    }
  }, [publicSaleActive]);
  
  // Setup writeContract for minting
  const { writeContractAsync, isPending } = useWriteContract();
  
  // Watch for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt(
    mintTxHash ? { hash: mintTxHash } : { hash: undefined }
  );
  
  const handleMint = async () => {
    console.log('Mint button clicked!');
    
    if (!isConnected) {
      console.log('Wallet not connected');
      setMintError('Please connect your wallet first.');
      return;
    }
    
    if (!isSaleActive) {
      console.log('Sale not active');
      setMintError('Public sale is not active yet.');
      return;
    }
    
    try {
      setMintError(null);
      setMintSuccess(false);
      setIsMinting(true);
      console.log('Starting mint...');
      
      // Execute the mint transaction
      const hash = await writeContractAsync({
        address: BAUHAUS_CONTRACT_ADDRESS,
        abi: BAUHAUS_ABI,
        functionName: 'mintPublic',
        args: [BigInt(1)], // Mint 1 NFT
        value: parseEther(MINT_PRICE), // Send ETH for minting
      });
      
      console.log('Mint transaction submitted:', hash);
      setMintTxHash(hash);
      
      // Transaction was submitted successfully
      setMintSuccess(true);
    } catch (error) {
      console.error('Mint error:', error);
      const errorMessage = error instanceof Error ? error.message : 'There was an error minting. Please try again.';
      setMintError(errorMessage);
      setMintSuccess(false);
    } finally {
      setIsMinting(false);
    }
  };

  return {
    handleMint,
    isMinting: isMinting || isPending || isConfirming,
    isConfirmed,
    mintError,
    mintSuccess,
    mintTxHash,
    isConnected,
    isSaleActive,
  };
} 