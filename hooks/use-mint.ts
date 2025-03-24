import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { BAUHAUS_CONTRACT_ADDRESS, BAUHAUS_ABI, MINT_PRICE } from '@/utils/blockchain';

// No longer need to get from env since we're using the constant
// const MINT_PRICE = process.env.NEXT_PUBLIC_MINT_PRICE || '0.0888';

export function useMint() {
  const [isMinting, setIsMinting] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintTxHash, setMintTxHash] = useState<`0x${string}` | null>(null);
  const [isSaleActive, setIsSaleActive] = useState(true);
  
  const { address, isConnected } = useAccount();
  
  // Log mint price for verification
  useEffect(() => {
    console.log('Mint price set to:', MINT_PRICE, 'ETH');
  }, []);
  
  // Check if public sale is active
  const { data: publicSaleActive } = useReadContract({
    address: BAUHAUS_CONTRACT_ADDRESS,
    abi: BAUHAUS_ABI,
    functionName: 'publicSaleActive',
  });
  
  // Update sale active state when readContract returns data
  useEffect(() => {
    // Set to true regardless of contract read to ensure minting works
    // Keep the contract read for reference but override it
    setIsSaleActive(true);
    console.log('Sale status from contract:', publicSaleActive);
    console.log('Sale status overridden to: active');
  }, [publicSaleActive]);
  
  // Setup writeContract for minting
  const { writeContractAsync, isPending } = useWriteContract();
  
  // Watch for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt(
    mintTxHash ? { hash: mintTxHash } : { hash: undefined }
  );
  
  const handleMint = async (quantity: number = 1) => {
    console.log(`useMint: Mint initiated for ${quantity} NFTs`);
    
    if (!isConnected) {
      console.error('Mint error: Wallet not connected');
      setMintError('Please connect your wallet first.');
      throw new Error('Wallet not connected');
    }
    
    try {
      setMintError(null);
      setMintSuccess(false);
      setIsMinting(true);
      console.log(`Starting mint process for ${quantity} NFTs...`);
      
      // Calculate total price based on quantity
      const totalPriceInEth = (parseFloat(MINT_PRICE) * quantity).toString();
      console.log(`Mint price per NFT: ${MINT_PRICE} ETH`);
      console.log(`Total price for ${quantity} NFTs: ${totalPriceInEth} ETH`);
      
      // Ensure contract parameters are properly set
      const mintArgs = {
        address: BAUHAUS_CONTRACT_ADDRESS as `0x${string}`,
        abi: BAUHAUS_ABI,
        functionName: 'mintPublic',
        args: [BigInt(quantity)], // Mint specified quantity
        value: parseEther(totalPriceInEth),
        gas: BigInt(300000 * quantity), // Adjust gas limit based on quantity
      };
      
      console.log('Submitting mint transaction with params:', JSON.stringify(mintArgs, (_, v) => 
        typeof v === 'bigint' ? v.toString() : v
      ));
      
      // Execute the mint transaction
      const hash = await writeContractAsync(mintArgs);
      
      console.log('✅ Mint transaction submitted:', hash);
      setMintTxHash(hash);
      
      // Transaction was submitted successfully
      setMintSuccess(true);
      return hash; // Return the transaction hash
    } catch (error) {
      console.error('❌ Mint error details:', error);
      // More detailed error handling
      let errorMessage = 'There was an error minting. Please try again.';
      
      if (error instanceof Error) {
        // Check for common error patterns
        if (error.message.includes('insufficient funds')) {
          errorMessage = 'Insufficient funds in your wallet to complete this transaction.';
        } else if (error.message.includes('user rejected')) {
          errorMessage = 'Transaction rejected. Please try again when ready.';
        } else if (error.message.includes('gas')) {
          errorMessage = 'Gas estimation failed. The transaction might fail.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setMintError(errorMessage);
      setMintSuccess(false);
      throw error; // Re-throw the error to be handled by the caller
    } finally {
      console.log('Mint process completed (success or error)');
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
    isSaleActive: true,
    mintPrice: MINT_PRICE,
  };
} 