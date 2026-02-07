import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Gift, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MakeupQuiz } from "../components/ui/makeupquiz";

const OFFER_LINK = "https://trkfy.org/aff_c?offer_id=163&aff_id=164586";

export default function Home() {
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minute timer

  // Timer logic
  useEffect(() => {
    if (quizFinished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [quizFinished, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background flex flex-col items-center text-white">
      <main className="flex-1 w-full max-w-lg px-4 py-8 pb-32 flex flex-col items-center relative z-10">
        
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            /* --- PHASE 1: THE QUIZ --- */
            <motion.div 
              key="quiz-phase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center space-y-8"
            >
              <div className="text-center space-y-4">
                <span className="text-4xl font-bold tracking-[0.2em] text-white drop-shadow-2xl" style={{ fontFamily: 'serif' }}>
                  SEPHORA
                </span>
                <p className="text-primary font-bold tracking-widest text-sm">VALENTINE'S REWARDS 2026</p>
              </div>
              <MakeupQuiz onComplete={() => setQuizFinished(true)} />
            </motion.div>
          ) : (
            /* --- PHASE 2: YOUR LANDING PAGE (UNLOCKED) --- */
            <motion.div 
              key="landing-phase"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full flex flex-col items-center space-y-6"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 text-sm font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4" /> STATUS: ELIGIBLE ✅
                </div>
                <h1 className="text-3xl font-bold leading-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                  Your <span className="text-primary">$750 Gift Card</span> Is Reserved!
                </h1>
                <div className="flex items-center justify-center gap-2 text-primary font-mono font-bold text-lg">
                  <Clock className="w-5 h-5" /> EXPIRES IN: {formatTime(timeLeft)}
                </div>
              </div>

              <Card className="glass-card p-6 border-white/10 bg-black/40 w-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Final Instructions</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Click 'Claim Now' below", sub: "Secure your reservation" },
                    { title: "Verify your email address", sub: "Required for delivery" },
                    { title: "Complete the required deals", sub: "Takes 10-15 minutes" }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</div>
                      <div>
                        <p className="font-bold text-white leading-tight">{step.title}</p>
                        <p className="text-sm text-gray-400 mt-0.5">{step.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="w-full pt-4">
                <a href={OFFER_LINK} target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg"
                    className="w-full h-20 text-2xl font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(255,107,157,0.5)] border border-white/10"
                  >
                    CLAIM NOW <ArrowRight className="ml-2 w-8 h-8" />
                  </Button>
                </a>
                <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">Limited Spots Available Today</p>
              </div>

              <Card className="glass-card p-6 border-white/5 bg-black/40 w-full">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-white/10">
                    <AccordionTrigger className="text-sm">How do I get the card?</AccordionTrigger>
                    <AccordionContent className="text-gray-400 text-xs">
                      After entering your email on the next page, you will be presented with sponsored deals. Once you complete the required number, your card is sent via email.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full py-8 text-center text-[10px] text-gray-600 mb-10">
        <p>GLAMBAD.COM &copy; 2026 | Not affiliated with Sephora Inc. or TikTok.</p>
      </footer>
      export default function Home() {
  // ... your existing code ...

  return (
    <div className="...">
       <main>
         {/* ... your quiz and landing page logic ... */}
       </main>

       {/* ADD THIS LINE HERE */}
       <ClaimNotification />

       <footer className="...">...</footer>
    </div>
  );
}
    </div>
  );
}
