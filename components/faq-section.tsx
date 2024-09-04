function FAQSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-4">FAQ</h2>
      <div className="space-y-4">
        <details className="p-4 rounded-lg">
          <summary className="font-semibold cursor-pointer">
            What is an NFT?
          </summary>
          <p className="mt-2">
            An NFT (Non-Fungible Token) is a unique digital asset...
          </p>
        </details>
        {/* Add more FAQ items as needed */}
      </div>
    </section>
  );
}

export default FAQSection;
