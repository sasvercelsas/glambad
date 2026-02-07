import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Gift, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MakeupQuiz } from "@/components/ui/makeupquiz";

const OFFER_LINK = "https://trkfy.org/aff_c?offer_id=163&aff_id=164586";

// --- SUB-COMPONENT: LIVE NOTIFICATION ---
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
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTikTok, setIsTikTok] = useState(false);

  useEffect(() => {
    // Detect TikTok Browser
    if (navigator.userAgent.includes("TikTok")) {
      setIsTikTok(true);
    }

    if (quizFinished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [quizFinished, timeLeft]);

  const handleClaim = () => {
    // Attempt to break out of TikTok sandbox on Android
    if (navigator.userAgent.includes("Android")) {
      const cleanUrl = OFFER_LINK.replace(/^https?:\/\//, '');
      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    } else {
      // Standard for iOS (Requires manual 'Open in Browser' via the top alert)
      window.location.href = OFFER_LINK;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black text-white flex flex-col items-center overflow-x-hidden">
      
      {/* TikTok Browser Alert */}
      {isTikTok && (
        <div className="w-full bg-pink-600 px-4 py-2.5 flex items-center justify-between text-[11px] font-bold sticky top-0 z-[150] shadow-lg">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3 h-3" />
            <span>FOR FAST AUTO-FILL: Tap <span className="bg-black/30 px-1 rounded">...</span> and "Open in Browser"</span>
          </div>
          <button onClick={() => setIsTikTok(false)} className="text-white/50 text-lg">×</button>
        </div>
      )}

      <main className="flex-1 w-full max-w-lg px-4 py-8 flex flex-col items-center relative z-10">
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-8">
              <div className="text-center space-y-4">
                <span className="text-4xl font-bold tracking-[0.2em]" style={{ fontFamily: 'serif' }}>SEPHORA</span>
                <p className="text-pink-500 font-bold tracking-widest text-sm uppercase">Valentine's Rewards</p>
              </div>
              <MakeupQuiz onComplete={() => setQuizFinished(true)} />
            </motion.div>
          ) : (
            <motion.div key="landing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full space-y-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4" /> STATUS: ELIGIBLE ✅
                </div>
                <h1 className="text-3xl font-bold leading-tight">Your <span className="text-pink-500">$750 Card</span> Is Reserved!</h1>
                <div className="flex items-center justify-center gap-2 text-pink-500 font-mono font-bold text-lg">
                  <Clock className="w-5 h-5" /> EXPIRES IN: {formatTime(timeLeft)}
                </div>
              </div>

              <Card className="p-6 bg-white/5 border-white/10 w-full backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Gift className="text-pink-500"/> Instructions</h2>
                <div className="space-y-4 text-sm text-gray-200">
                  <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-pink-500 text-black flex items-center justify-center font-bold text-xs shrink-0">1</div><p>Click 'Claim Now' below</p></div>
                  <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-pink-500 text-black flex items-center justify-center font-bold text-xs shrink-0">2</div><p>Verify your email address</p></div>
                  <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-pink-500 text-black flex items-center justify-center font-bold text-xs shrink-0">3</div><p>Complete required deals to ship</p></div>
                </div>
              </Card>

              <div className="w-full space-y-3">
                <Button 
                  onClick={handleClaim}
                  className="w-full h-20 text-2xl font-bold rounded-2xl bg-pink-600 hover:bg-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.4)] border border-white/10"
                >
                  CLAIM NOW <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest italic">Verification required to prevent bots</p>
              </div>

              <Accordion type="single" collapsible className="w-full border-t border-white/10">
                <AccordionItem value="faq" className="border-none">
                  <AccordionTrigger className="text-xs text-gray-500 py-4">Is this actually free?</AccordionTrigger>
                  <AccordionContent className="text-[10px] text-gray-500 leading-relaxed">
                    Yes. We partner with brand sponsors who provide these rewards in exchange for your feedback and participation in their programs. Once the required steps are verified, your reward is issued.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ClaimNotification />
      
      <footer className="p-12 text-gray-700 text-[10px] text-center w-full">
        <p className="mb-2">GLAMBAD.COM © 2026</p>
        <p>This offer is not affiliated with or endorsed by Sephora Inc. or TikTok. Participation is required to receive reward.</p>
      </footer>
    </div>
  );
}
