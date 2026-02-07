import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, ExternalLink, Loader2 } from "lucide-react";

// The 1-question bridge we discussed
const OFFER_LINK = "https://trkfy.org/aff_c?offer_id=163&aff_id=164586";

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [view, setView] = useState<'VOTE' | 'VERIFYING'>('VOTE');
  const [isTikTok, setIsTikTok] = useState(false);

  useEffect(() => {
    // Detect TikTok Browser
    if (navigator.userAgent.includes("TikTok")) {
      setIsTikTok(true);
    }

    if (view === 'VERIFYING') {
      const timer = setTimeout(() => {
        handleRedirect();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleRedirect = () => {
    // Attempt to break out of TikTok sandbox on Android
    if (navigator.userAgent.includes("Android")) {
      const cleanUrl = OFFER_LINK.replace(/^https?:\/\//, '');
      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    } else {
      window.location.href = OFFER_LINK;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center overflow-x-hidden font-sans">
      
      {/* 1. iOS/TikTok Browser Alert (Kept because it helps with auto-fill) */}
      {isTikTok && (
        <div className="w-full bg-[#FF6B9D] px-4 py-3 flex items-center justify-between text-[11px] font-bold sticky top-0 z-[150] shadow-lg text-white">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3 h-3" />
            <span>FOR AUTO-FILL: Tap <span className="bg-black/20 px-1 rounded">...</span> then "Open in Browser"</span>
          </div>
          <button onClick={() => setIsTikTok(false)} className="text-white/70 text-lg">×</button>
        </div>
      )}

      <main className="flex-1 w-full max-w-md px-6 py-12 flex flex-col items-center relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-12">
          <span className="text-3xl font-black tracking-[0.3em] text-white">GLAMBAD</span>
          <div className="h-1 w-12 bg-[#FF6B9D] mx-auto mt-2"></div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'VOTE' ? (
            <motion.div 
              key="vote"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full space-y-8 bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-xl"
            >
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-extrabold leading-tight">
                  Is a $20 mascara getting ridiculous? 💸
                </h1>
                <p className="text-gray-400 text-sm">
                  Cast your vote to see if <span className="text-white font-bold text-base">YOU</span> are eligible for a <span className="text-[#FF6B9D] font-bold">$750 Sephora Reward</span>.
                </p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setView('VERIFYING')}
                  className="w-full py-5 bg-[#FF6B9D] hover:bg-[#ff85af] text-white rounded-2xl font-black text-lg transition-all active:scale-95 shadow-[0_10px_30px_rgba(255,107,157,0.3)]"
                >
                  YES - IT'S CRAZY
                </button>
                <button 
                  onClick={() => setView('VERIFYING')}
                  className="w-full py-4 bg-transparent text-gray-500 rounded-2xl font-medium text-sm border border-white/10 hover:bg-white/5 transition-all"
                >
                  NO - I LOVE LUXURY
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-12 flex flex-col items-center text-center space-y-6"
            >
              <div className="relative">
                <Loader2 className="w-16 h-16 text-[#FF6B9D] animate-spin" />
                <div className="absolute inset-0 blur-xl bg-[#FF6B9D]/30 animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#FF6B9D]">Verifying Profile...</h2>
                <p className="text-gray-400 mt-2 text-sm italic">Checking rewards availability for your device</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-bold">
                 <CheckCircle2 className="w-3 h-3" /> CONNECTION SECURE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Legal */}
      <footer className="p-8 text-gray-600 text-[10px] text-center w-full max-w-xs space-y-4">
        <a href="https://glambad.com" className="block text-gray-500 hover:text-[#FF6B9D] underline underline-offset-4">
          Page not loading? Open in Safari
        </a>
        <p>GLAMBAD.COM © 2026. This offer is not affiliated with or endorsed by Sephora Inc. or TikTok. Participation in brand surveys is required to receive reward.</p>
      </footer>
    </div>
  );
}
