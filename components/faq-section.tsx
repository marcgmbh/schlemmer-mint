function FAQSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl mb-4">FAQ</h2>
      <div className="space-y-2">
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">
            What is the &quot;Bauhaus Signet&quot; NFT Collection?
          </summary>
          <p className="mt-2">
            The &quot;Bauhaus Signet&quot; NFT Collection is a collection of
            1,888 unique digital artworks created by Oskar Schlemmer in 1923.
            The collection is authenticated by the Oskar Schlemmer Theatre
            Archives and showcases generative renditions of his iconic designs,
            celebrating the intersection of art and technology.
          </p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">
            When will the NFTs be available for minting? Is there a roadmap?
          </summary>
          <p className="mt-2">
            The NFTs will be available for minting on September 4, 2024.
            <br />
            There is no roadmap. Utility? This is art.
          </p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">
            How many NFTs can I mint?
          </summary>
          <p className="mt-2">
            Public Mint has a limit of 10. WL mints are max 1. These limits are
            to ensure fair distribution among collectors.
          </p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">
            What are the pricing tiers for the NFTs?
          </summary>
          <p className="mt-2">0.0888 ETH for public.</p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">
            How can I purchase an NFT from this collection?
          </summary>
          <p className="mt-2">
            You can purchase an NFT directly through our minting page on the
            launch date. Ensure your wallet is connected and has sufficient ETH
            for the transaction.
          </p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">
            What type of wallet do I need to mint an NFT?
          </summary>
          <p className="mt-2">
            You will need a cryptocurrency wallet that supports Ethereum, such
            as MetaMask, Rainbow, Trust Wallet, or Coinbase Wallet.
          </p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">
            Will the NFTs be stored on the blockchain?
          </summary>
          <p className="mt-2">
            Yes, all NFTs in the &quot;Bauhaus Signet&quot; collection are fully
            onchain and stored on the Ethereum blockchain, ensuring their
            permanence and ownership.
          </p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">What is an onchain NFT?</summary>
          <p className="mt-2">
            Key characteristics of onchain NFTs are:
            <br />
            - Assets and metadata are stored on the blockchain, not on external
            servers or IPFS
            <br />
            - Smart contracts that generate the NFTs are also stored on-chain
            <br />
            - All data is accessible as long as the blockchain is operational
            <br />- Eliminates reliance on external systems or third parties
          </p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">Wen Reveal?</summary>
          <p className="mt-2">
            The Smart Contract has a commit-reveal scheme (similar to Checks VV)
            whereby the reveal happens after the next person mints, or after ~32
            blocks on Ethereum. Be patient, reload metadata. Enjoy the art -
            don’t worry, it will persist forever.
          </p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">
            What rights do I have when I purchase an NFT?
          </summary>
          <p className="mt-2">
            Purchasing an NFT grants you a non-exclusive, personal use license
            for the digital artwork. All intellectual property rights remain
            with the trademark holders.
          </p>
        </details>
        <details className="p-4 rounded-lg">
          <summary className="cursor-pointer">Legal Note</summary>
          <p className="mt-2">
            The Bauhaus emblem is in the public domain, but the trademark rights
            are owned by C. Raman Schlemmer. Each NFT provides a non-exclusive,
            personal use license for the digital artwork, with all intellectual
            property rights retained by the trademark holders.
          </p>
        </details>
      </div>
    </section>
  );
}

export default FAQSection;
