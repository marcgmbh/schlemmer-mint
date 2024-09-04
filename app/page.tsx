import { ArrowLeft } from "lucide-react";
import { MintButton } from "@/components/mint-button";
import HeroTitle from "@/components/hero-title";
import HeroImage from "@/components/hero-image";
// import HeroDescription from "@/components/hero-description";
import FAQSection from "@/components/faq-section";

function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <HeroTitle />
      <HeroImage />
      {/* <HeroDescription /> */}
      <MintButton />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ArrowLeft className="w-6 h-6 absolute top-8 left-8 text-gray-300 hover:text-gray-800 cursor-pointer" />

      <main className="flex-grow flex flex-col items-center">
        <HeroSection />

        <div className="w-full max-w-3xl px-4 py-16">
          <FAQSection />

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">About</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  The Oskar Schlemmer Theatre Archives:
                </h3>
                <p className="text-base md:text-lg">
                  Dedicated to preserving and promoting Schlemmer&apos;s legacy,
                  the archives maintain his works and support the study of his
                  contributions to art and design.
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  one33seven:
                </h3>
                <p className="text-base md:text-lg">
                  A crypto-culture collective bridging connoisseurship and
                  emergent technology.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
