import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Clock, Gift, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const OFFER_LINK = "https://trkfy.org/aff_c?offer_id=163&aff_id=164586";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background flex flex-col items-center">
      
      

      <main className="flex-1 w-full max-w-lg px-4 py-8 pb-32 flex flex-col items-center relative z-10">
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full flex flex-col items-center space-y-8"
        >
          <motion.div variants={item} className="flex flex-col items-center text-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#FF6B9D]/30 blur-xl rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center justify-center py-4">
                <span className="text-4xl font-bold tracking-[0.2em] text-white drop-shadow-2xl" style={{ fontFamily: 'serif' }}>
                  SEPHORA
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              Complete the Steps below to Claim your <br />
              <span className="text-primary glow-text">$750 Sephora Gift Card</span>
            </h1>
          </motion.div>

          <motion.div variants={item} className="w-full">
            <Card className="glass-card p-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold font-display">Quick Start Guide</h2>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Complete 2-3 required deals", sub: "Earn up to $750" },
                  { title: "Provide a valid email address", sub: "For instant notification" },
                  { title: "Ensure you are 18 years or older", sub: "Required" }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                    <div>
                      <p className="font-bold text-white leading-tight">{step.title}</p>
                      <p className="text-sm text-gray-400 mt-0.5">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="w-full">
            <Card className="glass-card p-6 border-white/5 bg-black/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary/50 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-white/70" />
                </div>
                <h2 className="text-lg font-bold font-display text-white/90">Common Questions</h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-white/10">
                  <AccordionTrigger className="hover:text-primary transition-colors text-left">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      How long do the deals take?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pl-7">
                    Quick 10-20 minute completion time per deal
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-white/10">
                  <AccordionTrigger className="hover:text-primary transition-colors text-left">
                    <div className="flex items-center gap-3">
                      <Gift className="w-4 h-4 text-gray-500" />
                      What are deals?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pl-7">
                    Simple tasks like app downloads, surveys, or trial
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </motion.div>

        </motion.div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-black via-black/95 to-transparent z-50 flex justify-center">
        <div className="w-full max-w-lg">
          <a href={OFFER_LINK} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg"
              className="w-full h-16 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(255,107,157,0.5)] hover:shadow-[0_0_40px_rgba(255,107,157,0.7)] hover:-translate-y-1 transition-all duration-300 border border-white/10"
            >
              Start Now <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </a>
        </div>
      </div>

      <footer className="w-full py-8 text-center text-sm text-gray-600 relative z-10 mb-20">
        <p>GLAMBAD.COM &copy; 2026</p>
      </footer>
    </div>
  );
}
