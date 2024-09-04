import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full py-8 text-center text-sm">
      <p>
        © 2024 C. Raman Schlemmer ® All Rights Reserved.{" "}
        <Link href="https://www.schlemmer.org/imprint" className="underline">
          Imprint
        </Link>
        .
      </p>
    </footer>
  );
}

export default Footer;
