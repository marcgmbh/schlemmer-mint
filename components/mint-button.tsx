"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import contractABI from "./BauhausSignet.json";
import allowlist from "./allowlist.json";

const contractAddress = "0xFA683dDa59f7d43a4EFff6C177590370D69E6d30";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Allowlist {
  [key: string]: string[] | string;
  merkleTreeRoot: string;
}

export function MintButton() {
  const [isMinting, setIsMinting] = useState(false);
  const [mintCount, setMintCount] = useState(1);
  const [status, setStatus] = useState("Mint");
  const [publicMintCount, setPublicMintCount] = useState(0);
  const [isFreeMintEligible, setIsFreeMintEligible] = useState(false);
  const [isMintingFree, setIsMintingFree] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [mintSuccess, setMintSuccess] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [freeMintCount, setFreeMintCount] = useState(0);

  const checkWalletConnection = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          setWalletAddress(accounts[0]);
          fetchMintCounts(accounts[0]);
          checkFreeMintEligibility(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  }, []);

  useEffect(() => {
    checkWalletConnection();
  }, [checkWalletConnection]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsWalletConnected(true);
        setWalletAddress(accounts[0]);
        fetchMintCounts(accounts[0]);
        checkFreeMintEligibility(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
    }
  };

  const fetchMintCounts = async (address: string) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const publicCount = await contract.getMintCountPublic(address);
      setPublicMintCount(publicCount.toNumber());

      const freeCount = await contract.getMintCountFree(address);
      setFreeMintCount(freeCount.toNumber());
    }
  };

  const checkFreeMintEligibility = (address: string) => {
    setIsFreeMintEligible(address.toLowerCase() in allowlist);
  };

  const mint = async (isFree = false) => {
    setIsMinting(true);
    setStatus(isFree ? "Minting Free..." : "Minting...");
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let tx;
        if (isFree) {
          const tokens = (allowlist as Allowlist)[
            walletAddress.toLowerCase()
          ] as string[];
          if (!tokens || tokens.length === 0)
            throw new Error("Not eligible for free mint");
          tx = await contract.mintFree(tokens[0]); // Assuming you need the first token
        } else {
          const value = ethers.utils.parseEther(
            (0.0888 * mintCount).toString()
          );
          const gasLimit = 600000 * mintCount;
          tx = await contract.mintPublic(mintCount, { value, gasLimit });
        }

        console.log("Transaction sent:", tx.hash);
        setTxHash(tx.hash);
        setStatus("Minting...");
        await tx.wait();
        setStatus("Success!");
        setMintSuccess(true);
        await fetchMintCounts(walletAddress);
        if (isFree) setIsFreeMintEligible(false);
      } else {
        throw new Error("Ethereum object not found");
      }
    } catch (error: any) {
      console.error("Error minting NFT:", error);
      handleMintError(error);
    } finally {
      setIsMinting(false);
      setIsMintingFree(false);
    }
  };

  const handleMintError = (error: any) => {
    if (error.code === "INSUFFICIENT_FUNDS") {
      setStatus("Insufficient funds");
    } else if (error.code === 4001) {
      setStatus("Transaction rejected");
    } else if (error.message.includes("execution reverted")) {
      const errorMessage = error.error?.message || "Contract error";
      setStatus(errorMessage);
    } else {
      setStatus("Minting failed. Check console for details.");
    }
  };

  const resetMintState = () => {
    setMintSuccess(false);
    setTxHash("");
    setStatus("Mint");
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      {!isWalletConnected ? (
        <Button
          variant="default"
          className="w-full h-20 text-lg"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      ) : (
        <>
          {mintSuccess ? (
            <div className="space-y-4">
              <div className="text-center text-lg font-semibold">
                Thank you for minting!
              </div>
              <div className="space-x-2 text-center">
                <a
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFDF12] hover:underline"
                >
                  View on Etherscan
                </a>
                <span>|</span>
                <a
                  href={`https://opensea.io/assets/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFDF12] hover:underline"
                >
                  View on OpenSea
                </a>
                <span>|</span>
                <p
                  className="text-[#FFDF12] hover:underline"
                  onClick={resetMintState}
                >
                  Mint Again
                </p>
              </div>
            </div>
          ) : (
            <>
              {isFreeMintEligible && freeMintCount === 0 ? (
                <Button
                  variant="secondary"
                  className="w-full h-20 text-lg"
                  onClick={() => mint(true)}
                  disabled={isMinting || isMintingFree}
                >
                  {isMintingFree ? "Minting..." : "Mint Free NFT"}
                </Button>
              ) : (
                <>
                  <Button
                    variant="default"
                    className="w-full h-20 text-lg"
                    onClick={() => mint(false)}
                    disabled={isMinting || publicMintCount >= 10}
                  >
                    {publicMintCount >= 10 ? "Limit Reached" : status}
                  </Button>
                  {publicMintCount >= 10 && (
                    <div className="text-red-500 text-sm">
                      Sorry, only 10 NFTs per wallet
                    </div>
                  )}
                  <Slider
                    min={1}
                    max={10 - publicMintCount}
                    step={1}
                    value={[mintCount]}
                    onValueChange={(value) => setMintCount(value[0])}
                    className="w-full"
                    disabled={publicMintCount >= 10}
                  />
                  <div className="text-center">
                    {mintCount} {mintCount > 1 ? "" : ""}
                  </div>
                  <div className="text-sm text-gray-500">
                    You minted: {publicMintCount} / 10
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
