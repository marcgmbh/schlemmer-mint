"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import contractABI from "./Bauhaus.json";

const contractAddress = "0x76A661fB20CE0de0B527eA8CfD1074FF11Dc1ECb";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function MintButton() {
  const [isMinting, setIsMinting] = useState(false);
  const [mintCount, setMintCount] = useState(1);
  const [status, setStatus] = useState("Mint");

  const mint = async () => {
    setIsMinting(true);
    setStatus("Minting...");
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // Calculate the value (0.1 ETH per NFT for public sale)
        const value = ethers.utils.parseEther((0.1 * mintCount).toString());

        // Send the transaction
        const tx = await contract.mintPublic(mintCount, { value });

        console.log("Transaction sent:", tx.hash);

        setStatus("Confirming...");
        await tx.wait();
        setStatus("Success!");
      } else {
        setStatus("Please install MetaMask");
      }
    } catch (error: any) {
      console.error("Error minting NFT:", error);

      if (error.code === "INSUFFICIENT_FUNDS") {
        setStatus("Insufficient funds");
      } else if (error.code === 4001) {
        setStatus("Transaction rejected");
      } else if (error.message.includes("execution reverted")) {
        const errorMessage = error.error?.message || "Contract error";
        if (errorMessage.includes("SaleNotActive")) {
          setStatus("Sale not active");
        } else if (errorMessage.includes("MintLimitReached")) {
          setStatus("Mint limit reached");
        } else if (errorMessage.includes("MintEnded")) {
          setStatus("Mint ended");
        } else {
          setStatus(errorMessage);
        }
      } else {
        setStatus("Minting failed. Check console for details.");
      }
    } finally {
      setIsMinting(false);
      setTimeout(() => setStatus("Mint"), 3000);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      <Button
        variant="default"
        className="w-full h-20 text-lg"
        onClick={mint}
        disabled={isMinting}
      >
        {status}
      </Button>
      <Slider
        min={1}
        max={10}
        step={1}
        value={[mintCount]}
        onValueChange={(value) => setMintCount(value[0])}
        className="w-full"
      />
      <div className="text-center">
        {mintCount} {mintCount > 1 ? "NFTs" : "NFT"}
      </div>
    </div>
  );
}
