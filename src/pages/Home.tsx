import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, ExternalLink, Loader2, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const OFFER_LINK = "https://trkfy.org/aff_c?offer_id=163&aff_id=164586";

// --- LIVE NOTIFICATION COMPONENT ---
const ClaimNotification = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: "", amount: "$750" });
  const names = ["Sarah M.", "Jessica R.", "Emily W.", "Ashley T.", "Megan K.", "Taylor S.", "Brianna L."];

  useEffect(() => {
    const showRandom = () => {
      setData({ name: names[Math.floor(Math.random() * names.length)], amount: "$750" });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };
    const initialDelay = setTimeout(showRandom, 5000);
    const interval = setInterval(showRandom, 15000);
    return () => { clearTimeout(initialDelay); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 20 }} exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-24 left-0 z-[100] flex items-center gap-3 bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl"
        >
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">🎁</div>
          <div className="flex flex-col">
            <p className="text-white text-xs font-bold">{data.name} just claimed</p>
            <p className="text-pink-500 text-sm font-black">{data.amount} Sephora Card</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [view, setView] = useState<'VOTE' | 'VERIFYING'>('VOTE');
  const [isTikTok, setIsTikTok] = useState(false);

  useEffect(() => {
    if (navigator.userAgent.includes("TikTok")) {
      setIsTikTok(true);
    }

    if (view === 'VERIFYING') {
      const timer = setTimeout(() => {
        handleRedirect();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleRedirect = () => {
    if (navigator.userAgent.includes("Android")) {
      const cleanUrl = OFFER_LINK.replace(/^https?:\/\//, '');
      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    } else {
      window.location.href = OFFER_LINK;
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black text-white flex flex-col items-center overflow-x-hidden">
      
      {/* TikTok Browser Alert */}
      {isTikTok && (
        <div className="w-full bg-pink-600 px-4 py-2.5 flex items-center justify-between text-[11px] font-bold sticky top-0 z-[150] shadow-lg">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3 h-3" />
            <span>FOR AUTO-FILL: Tap <span className="bg-black/30 px-1 rounded">...</span> and "Open in Browser"</span>
          </div>
          <button onClick={() => setIsTikTok(false)} className="text-white/50 text-lg">×</button>
        </div>
      )}

      <main className="flex-1 w-full max-w-lg px-4 py-8 flex flex-col items-center relative z-10">
        <AnimatePresence mode="wait">
          {view === 'VOTE' ? (
            <motion.div key="vote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-8">
              <div className="text-center space-y-4">
                <span className="text-4xl font-bold tracking-[0.2em]" style={{ fontFamily: 'serif' }}>SEPHORA</span>
                <p className="text-pink-500 font-bold tracking-widest text-sm uppercase">Valentine's Rewards</p>
              </div>

              <Card className="p-8 bg-white/5 border-white/10 w-full backdrop-blur-md rounded-3xl text-center space-y-6">
                <h1 className="text-2xl font-bold leading-tight">
                  Is a $20 mascara getting ridiculous? 💸
                </h1>
                <p className="text-gray-300 text-sm">
                  Cast your vote to see if <span className="text-white font-bold underline">YOU</span> are eligible for a <span className="text-pink-500 font-black text-lg">$750 Sephora Reward</span>.
                </p>
                
                <div className="space-y-4 pt-4">
                  <button 
                    onClick={() => setView('VERIFYING')}
                    className="w-full h-20 text-2xl font-bold rounded-2xl bg-pink-600 hover:bg-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.4)] border border-white/10 flex items-center justify-center gap-3"
                  >
                    YES - IT'S CRAZY <ArrowRight />
                  </button>
                  <button 
                    onClick={() => setView('VERIFYING')}
                    className="w-full py-3 text-gray-500 text-xs uppercase tracking-widest font-bold"
                  >
                    No - I love the luxury
                  </button>
                </div>
              </Card>

              <Accordion type="single" collapsible className="w-full border-t border-white/10">
                <AccordionItem value="faq" className="border-none">
                  <AccordionTrigger className="text-xs text-gray-500 py-4">How does this work?</AccordionTrigger>
                  <AccordionContent className="text-[10px] text-gray-500 leading-relaxed">
                    We partner with brand sponsors who provide these rewards in exchange for feedback. Once you complete the required brand tasks on the next page, your reward is issued.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ) : (
            <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full py-20 flex flex-col items-center space-y-8 text-center">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-pink-500 animate-spin" />
                <div className="absolute inset-0 blur-2xl bg-pink-500/20 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                  Secure Connection Established
                </div>
                <h2 className="text-2xl font-bold pt-4">Verifying Eligibility...</h2>
                <p className="text-gray-400 text-sm">Matching your device with available $750 slots</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ClaimNotification />

      <footer className="p-12 text-gray-700 text-[10px] text-center w-full">
        <a href="https://glambad.com" className="block mb-6 text-pink-500/50 hover:text-pink-500 underline underline-offset-4">
          Stuck in TikTok? Open in Safari
        </a>
        <p className="mb-2 uppercase tracking-tighter font-bold">GLAMBAD.COM © 2026</p>
        <p className="max-w-xs mx-auto leading-relaxed">
          This offer is not affiliated with or endorsed by Sephora Inc. or TikTok. Participation is required to receive reward. 
          Limited slots available for the $750 program.
        </p>
      </footer>
    </div>
  );
}
