import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GudiyaaLoveSite() {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [isEvening, setIsEvening] = useState(false);
  const [fallingStar, setFallingStar] = useState(false);
  const [showSpecialCard, setShowSpecialCard] = useState(false);

  const cards = [
    "You are my tiny baby, my little girl 💕. Every day waking up to your Morningssssweetyyy is the sweetest morning I can have.",
    "I love your sundrrrrr voice, your cutuuuu laugh. Onlyyyy you can make my heart melt everyday ✨.",
    "3 years together and still counting… I want to spend forever with you 💍💕💕💕❤️.",
    "You are meraa chotuu sa bacchaa and no matter how old we get you will always remain my chotuuubaby 💖.",
    "I love you so much, Gudiyaa ❤️ You are my everything, forever & always ❤️."
  ];

  const longMessage = `
My pyariii Gudiyaa 💕 

From the moment we met I somehow knew in my heart that youuu are the one and since that day I have not loved anyone more than you 🥺. I want to spend every single day making you feel loved and special because you deserve it and you desrveeee so much moreee, Jaan. You are my heart. No words can truly capture how much I adore you. Every day theee love grows innn my dill. I just lovee youuu soo soo much. You are my family, my comfort, my wife. We will live our whole life together just each other’s. I’ll make my girl's each and every dream come true. We will wakeee up together and wee will ninii togetherrr. Ap Meri Sanju ho aur ap mere he rahogi. I’ll never let your cutest smileee fade. You make me smile, you make meee happy, just ME & YOU 💟💟❤. With lotsss of loveee meriii jaannn, yourrrr babyyyy, Aruuuuuuu 💗💗💗🤭
`;

  const floatingEmojis = [
    { symbol: "❤️", color: "text-rose-400", size: 25 },
    { symbol: "🧿", color: "text-blue-500", size: 30 }
  ];

  // Determine night and evening phases
  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      setIsNight(hour >= 18 || hour < 5);
      setIsEvening(hour >= 15 && hour < 18);
    };
    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Falling star
  useEffect(() => {
    if (!isNight) return;
    const interval = setInterval(() => {
      setFallingStar(true);
      setTimeout(() => setFallingStar(false), 1500);
    }, 10000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, [isNight]);

  const stars = [...Array(30)].map((_, i) => ({
    top: Math.random() * 33,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3
  }));

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start font-poppins overflow-hidden"
         style={{background: 'linear-gradient(to bottom, #FF8C42 0%, #FFC3A0 33%, #FFC3A0 100%)'}}>

      {/* Top 1/3 Sunset */}
      {isEvening && (
        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-500 via-red-500 to-transparent"></div>
          {/* Sun */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-yellow-400 rounded-full shadow-[0_0_40px_10px_rgba(255,200,0,0.4)]"
            animate={{ top: ["10%", "80%"] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          />
          {/* Clouds */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/70 rounded-full blur-xl"
              style={{
                width: `${80 + i * 20}px`,
                height: `${40 + i * 10}px`,
                top: `${10 + i * 12}%`,
              }}
              initial={{ x: i % 2 === 0 ? "-20%" : "120%" }}
              animate={{ x: i % 2 === 0 ? "120%" : "-20%" }}
              transition={{ duration: 35 + i * 10, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      )}

      {/* Night */}
      {isNight && (
        <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0b0b3b] via-[#1c1c55] to-transparent"></div>
          {/* Moon */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-200 rounded-full shadow-[0_0_30px_8px_rgba(255,255,204,0.3)]">
            <div className="w-12 h-12 rounded-full bg-[#0b0b3b] absolute top-0 left-2"></div>
          </div>
          {/* Stars */}
          {stars.map((star, idx) => (
            <motion.div
              key={idx}
              className="absolute bg-white rounded-full"
              style={{ width: star.size, height: star.size, top: `${star.top}%`, left: `${star.left}%` }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: star.delay }}
            />
          ))}
          {/* Falling Star */}
          <AnimatePresence>
            {fallingStar && (
              <motion.div
                className="absolute bg-white w-1 h-1 rounded-full shadow-lg"
                initial={{ top: "5%", left: "0%" }}
                animate={{ top: "25%", left: "100%", scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Floating Emojis */}
      {[...Array(25)].map((_, i) => {
        const emoji = i % 2 === 0 ? floatingEmojis[0] : floatingEmojis[1];
        return (
          <motion.div
            key={i}
            className={`${emoji.color} absolute`}
            style={{
              top: `${33 + Math.random() * 67}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${emoji.size + Math.random() * 15}px`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -50], scale: [0.6, 1.2, 0.6] }}
            transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: i * 0.3 }}
          >
            {emoji.symbol}
          </motion.div>
        );
      })}

      {/* Title */}
      <motion.div className="text-center mt-40 mb-8 z-10 relative" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700 drop-shadow-md">
          💌 For My Gudiyaa 💌
        </h1>
        <p className="text-lg md:text-xl text-rose-600 mt-3">
          3 years together... and many more to come ❤️
        </p>
      </motion.div>

      {/* Open Letter */}
      <motion.button
        onClick={() => setOpen(true)}
        className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-5 rounded-2xl shadow-lg flex items-center gap-3 text-xl font-semibold z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="w-6 h-6" /> Open Your Letter
      </motion.button>

      {/* Envelope & Scroll modals */}
      {/* ... (same as before, unchanged) */}

      {/* Special Pookie Emoji at bottom center */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50">
        <p className="text-2xl text-rose-500 font-bold mb-2">Click me jaan 🎀</p>
        <motion.div
          className="text-[100px] cursor-pointer select-none"
          style={{ color: "#FF6B6B" }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSpecialCard(true)}
        >
          🫶
        </motion.div>

        <AnimatePresence>
          {showSpecialCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <button
                  onClick={() => setShowSpecialCard(false)}
                  className="absolute top-4 right-4 text-rose-500 hover:text-rose-700"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center text-rose-600 text-lg font-semibold">
                  💌 You make me say AWWW!! I loveyouuuuu soo much my pookiedookie🎀❤💌
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
