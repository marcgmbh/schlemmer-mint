import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

function HeroDescription() {
  return (
    <p className="text-lg mb-8 max-w-3xl text-left">
      The &ldquo;Bauhaus Signet&rdquo; NFT, originally created in 1923 by Oskar
      Schlemmer, is an authorized collaboration with The Oskar Schlemmer Theatre
      Archives that brings a seminal work of 20th-century design into the
      blockchain era. The iconic Bauhaus signet will persist on Ethereum
      forever, as fully onchain generative SVG renditions.
      <BauhausDialog />
    </p>
  );
}

function BauhausDialog() {
  return (
    <Dialog>
      <DialogTrigger className="block text-left  w-full mt-4 text-[#FFDF12]">
        Why put the Bauhaus Signet onchain?
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl mb-2">
            Bauhaus and Blockchain: Parallel Revolutions in Design and
            Technology
          </DialogTitle>
          <ScrollArea className="h-[400px] w-full rounded-md">
            <DialogDescription className="text-base pr-4">
              The Bauhaus school and Blockchain technology, though separated by
              a century, share striking parallels in their revolutionary impact.
              Both fundamentally restructured their respective fields: Bauhaus
              dismantled barriers between art, craft, and industry, while
              Blockchain redefines data management and value exchange. They
              embody decentralization, challenging established
              authorities&mdash;Bauhaus confronted academic art institutions,
              while Blockchain resists centralized control. Innovation through
              technology integration is central to both: Bauhaus merged art with
              industrial techniques, as Blockchain fuses cryptography with
              distributed systems. The ethos of building and creation is
              embedded in their very names&mdash;&ldquo;Bauhaus&rdquo; meaning
              &ldquo;building house,&rdquo; echoed in the crypto world&rsquo;s
              &ldquo;BUIDL&rdquo; culture. Both movements reimagine identity and
              representation. The Bauhaus Signet, a minimalist human profile,
              finds its digital counterpart in Blockchain&rsquo;s NFTs and
              digital identities. Community collaboration is crucial: Bauhaus
              fostered artist collectives, mirroring Blockchain&rsquo;s
              open-source development and DAOs. Bauhaus and Blockchain share a
              commitment to progressive education and interdisciplinary
              approaches. Bauhaus revolutionized design education, while
              Blockchain encourages continuous learning across technology and
              finance. Both strive for longevity&mdash;Bauhaus through enduring
              design principles, Blockchain through censorship-resistant,
              &ldquo;forever&rdquo; onchain data. Symbolically, the Bauhaus
              logo&rsquo;s 101st anniversary aligns with Blockchain&rsquo;s
              binary foundation. Both have global reach: Bauhaus influenced
              worldwide design, as Blockchain aims for borderless adoption. They
              promote transparency, establish new paradigms of trust and value,
              and employ modular, scalable design principles. Ultimately, both
              Bauhaus and Blockchain empower individuals, democratizing their
              respective fields. They embody an experimental mindset, constantly
              pushing boundaries and redefining the role of intermediaries. In
              essence, Bauhaus and Blockchain represent transformative forces
              that reshape how we perceive, create, and interact with the world
              around us.
            </DialogDescription>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default HeroDescription;
