import Image from "next/image";

function HeroImage() {
  return (
    <div className="p-24">
      <Image
        src="/bauhaus.svg.png"
        alt="Bauhaus Signet"
        width={280}
        height={280}
        className="mb-6 mx-auto"
      />
    </div>
  );
}

export default HeroImage;
