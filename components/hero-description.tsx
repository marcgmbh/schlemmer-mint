import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

function HeroDescription() {
  return (
    <motion.div 
      className="max-w-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="py-2 border-l border-white/10 pl-6">
        <motion.p 
          className="text-xl leading-relaxed font-light tracking-wide text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          The <span className="text-primary">Bauhaus Signet</span> NFT, originally created in 1923 by Oskar
          Schlemmer, is an authorized collaboration with The Oskar Schlemmer Theatre
          Archives that brings a seminal work of 20th-century design into the
          blockchain era.
          <BauhausDialog />
        </motion.p>
      </div>
    </motion.div>
  );
}

function BauhausDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-6 flex items-center cursor-pointer group"
        >
          <span className="text-primary/80 group-hover:text-primary transition-colors duration-300 text-lg">
            Why put the Bauhaus Signet onchain?
          </span>
          <motion.div 
            className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
          >
            →
          </motion.div>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="bg-black/95 border border-white/20 max-w-3xl">
        <DialogHeader className="flex flex-col">
          <DialogTitle className="text-3xl mb-6 font-light text-primary tracking-wide">
            Bauhaus and Blockchain: Parallel Revolutions
          </DialogTitle>
          
          <div className="w-12 h-px bg-primary/30 mb-6"></div>
          
          <ScrollArea className="h-[500px] w-full rounded-md pr-6">
            <DialogDescription className="text-lg pr-6 leading-relaxed font-light text-white/80">
              <div className="space-y-6">
                <p>
                  The Bauhaus school and Blockchain technology, though separated by
                  a century, share striking parallels in their revolutionary impact.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                  <div className="bg-white/5 p-6 border-l border-primary">
                    <h3 className="text-white text-xl mb-3">Structural Disruption</h3>
                    <p className="text-white/70">
                      Both fundamentally restructured their respective fields: Bauhaus
                      dismantled barriers between art, craft, and industry, while
                      Blockchain redefines data management and value exchange.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-6 border-l border-white/20">
                    <h3 className="text-white text-xl mb-3">Decentralized Philosophy</h3>
                    <p className="text-white/70">
                      They embody decentralization, challenging established
                      authorities—Bauhaus confronted academic art institutions,
                      while Blockchain resists centralized control.
                    </p>
                  </div>
                </div>
                
                <p>
                  Innovation through technology integration is central to both: Bauhaus merged art with
                  industrial techniques, as Blockchain fuses cryptography with
                  distributed systems.
                </p>
                
                <p>
                  Both movements reimagine identity and representation. The Bauhaus Signet, a minimalist human profile,
                  finds its digital counterpart in Blockchain&apos;s NFTs and
                  digital identities.
                </p>
                
                <div className="my-8 p-6 border-l border-primary/50">
                  <p className="text-white italic">
                    &ldquo;Bauhaus and Blockchain share a commitment to progressive education and interdisciplinary
                    approaches. Bauhaus revolutionized design education, while
                    Blockchain encourages continuous learning across technology and
                    finance.&rdquo;
                  </p>
                </div>
                
                <p>
                  Both strive for longevity—Bauhaus through enduring
                  design principles, Blockchain through censorship-resistant,
                  &ldquo;forever&rdquo; onchain data.
                </p>
                
                <p className="text-primary font-light text-xl mt-12">
                  In essence, Bauhaus and Blockchain represent transformative forces
                  that reshape how we perceive, create, and interact with the world
                  around us.
                </p>
              </div>
            </DialogDescription>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default HeroDescription;
