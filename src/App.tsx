import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  Gamepad2,
  Trophy,
  Twitter,
  UserPlus,
  Wallet,
} from "lucide-react";

type Step = "loading" | "raid";

type LeaderboardEntry = {
  wallet: string;
  points: number;
  twitterHandle?: string;
};

const sectionTitleClass = "text-[0.88rem] md:text-[1rem] uppercase tracking-[0.035em] leading-none";
const taskActionClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#1a1713] bg-[#a23a2f] px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.05em] text-[#fff2d8] shadow-[0_3px_0_#1a1713] transition hover:-translate-y-0.5 hover:brightness-105";
const inputClass =
  "w-full rounded-[0.95rem] border-[3px] border-[#1a1713] bg-[#fff9eb] px-4 py-2.5 text-[0.86rem] outline-none transition placeholder:text-[#5c5142]/60 focus:border-[#a23a2f] focus:ring-2 focus:ring-[#a23a2f]/25";
const sectionCardClass = "rounded-[1.15rem] border-[3px] border-[#1a1713] bg-[#f8f0dc] p-4 shadow-[0_5px_0_#1a1713]";
const questFormSectionClass =
  "rounded-[1.15rem] border-[3px] border-[#1a1713] bg-[#f4ecd8] px-4 py-3 shadow-[0_5px_0_#1a1713]";
const cloudLayers = [
  {
    src: "/megahop-adventure/assets/Botanic Panic/lv_2-1_clouds_5_cream_clouds.png",
    className: "top-[2%] h-[120px] w-[150%] max-w-none",
    from: -140,
    to: 90,
    duration: 38,
    opacity: 0.8,
  },
  {
    src: "/megahop-adventure/assets/Botanic Panic/lv_2-1_clouds_6_cream_clouds.png",
    className: "top-[7%] h-[145px] w-[155%] max-w-none",
    from: 110,
    to: -120,
    duration: 46,
    opacity: 0.68,
  },
  {
    src: "/megahop-adventure/assets/Botanic Panic/lv_2-1_clouds_7_yellow_cloud.png",
    className: "top-[13%] h-[110px] w-[135%] max-w-none",
    from: -60,
    to: 150,
    duration: 42,
    opacity: 0.52,
  },
  {
    src: "/megahop-adventure/assets/Botanic Panic/lv_2-1_clouds_5_cream_clouds.png",
    className: "bottom-[18%] h-[105px] w-[135%] max-w-none",
    from: -120,
    to: 95,
    duration: 40,
    opacity: 0.5,
  },
  {
    src: "/megahop-adventure/assets/Botanic Panic/lv_2-1_clouds_6_cream_clouds.png",
    className: "bottom-[9%] h-[125px] w-[145%] max-w-none",
    from: 80,
    to: -110,
    duration: 52,
    opacity: 0.42,
  },
  {
    src: "/megahop-adventure/assets/Botanic Panic/lv_2-1_clouds_7_yellow_cloud.png",
    className: "bottom-[4%] h-[95px] w-[118%] max-w-none",
    from: -70,
    to: 125,
    duration: 44,
    opacity: 0.34,
  },
];
const butterflySprites = [
  [
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly A/sprite_018.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly A/sprite_019.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly A/sprite_020.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly A/sprite_021.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly A/sprite_022.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly A/sprite_023.png",
  ],
  [
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly B/sprite_100.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly B/sprite_101.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly B/sprite_102.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly B/sprite_103.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly B/sprite_104.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly B/sprite_105.png",
  ],
  [
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly C/sprite_198.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly C/sprite_199.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly C/sprite_200.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly C/sprite_201.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly C/sprite_202.png",
    "/megahop-adventure/assets/Butterfly Sprites/Butterfly C/sprite_203.png",
  ],
];
const butterflyLayers = [
  { frames: butterflySprites[0], className: "left-[18%] top-[26%] w-[24px] md:w-[32px]", x: 28, y: 14, duration: 5.2, rotate: -8, fps: 8 },
  { frames: butterflySprites[1], className: "left-[71%] top-[32%] w-[22px] md:w-[30px]", x: -24, y: 16, duration: 4.8, rotate: 10, fps: 9 },
  { frames: butterflySprites[2], className: "left-[61%] bottom-[24%] w-[20px] md:w-[28px]", x: 22, y: -16, duration: 5.6, rotate: -12, fps: 8 },
  { frames: butterflySprites[0], className: "left-[33%] bottom-[18%] w-[18px] md:w-[24px]", x: -18, y: 12, duration: 4.4, rotate: 9, fps: 10 },
];

function FloatingClouds() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {cloudLayers.map((cloud) => (
        <motion.img
          key={cloud.src}
          src={cloud.src}
          alt=""
          aria-hidden="true"
          initial={{ x: cloud.from }}
          animate={{ x: cloud.to }}
          transition={{ duration: cloud.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className={`absolute left-[-20%] object-contain ${cloud.className}`}
          style={{
            opacity: cloud.opacity,
            filter: "brightness(1.08) contrast(1.08) drop-shadow(0 10px 24px rgba(255,248,235,0.42))",
          }}
        />
      ))}
      <div className="absolute inset-x-0 top-0 h-[26%] bg-gradient-to-b from-[#f4ebd3]/26 via-[#f4ebd3]/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#f4ebd3]/18 via-[#f4ebd3]/8 to-transparent" />
    </div>
  );
}

function FloatingButterflies() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      {butterflyLayers.map((butterfly, index) => (
        <AnimatedButterfly key={`${index}-${butterfly.className}`} {...butterfly} />
      ))}
    </div>
  );
}

function AnimatedButterfly({
  frames,
  className,
  x,
  y,
  duration,
  rotate,
  fps,
}: {
  frames: string[];
  className: string;
  x: number;
  y: number;
  duration: number;
  rotate: number;
  fps: number;
}) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % frames.length);
    }, 1000 / fps);

    return () => window.clearInterval(interval);
  }, [frames, fps]);

  return (
    <motion.img
      src={frames[frameIndex]}
      alt=""
      aria-hidden="true"
      animate={{
        x: [0, x, 0],
        y: [0, y, 0],
        rotate: [rotate, rotate * -0.4, rotate],
        scale: [1, 1.06, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute object-contain ${className}`}
      style={{ filter: "drop-shadow(0 6px 10px rgba(26,23,19,0.16))" }}
    />
  );
}

export default function App() {
  const [step, setStep] = useState<Step>("loading");
  const [followed, setFollowed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [quoteLink, setQuoteLink] = useState("");
  const [raidLink, setRaidLink] = useState("");
  const [wallet, setWallet] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referrer, setReferrer] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [copied, setCopied] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");

  const GOOGLE_SHEETS_URL =
    "https://script.google.com/macros/s/AKfycbyl7Kii-KTiO13L4NdhbuX_AW2SS_wROpLXjeQGlD4A9YUpbIxF5f8ciNVA5UFnQBM8lA/exec";
  const MEGAHOP_ADVENTURE_URL = "/megahop-adventure/index.html";
  const referralUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}?ref=${wallet}`
      : "";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref && /^0x[a-fA-F0-9]{40}$/.test(ref)) {
      setReferrer(ref);
    }

    fetch(GOOGLE_SHEETS_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLeaderboard(data);
        }
      })
      .catch((err) => console.error("Failed to fetch leaderboard:", err));
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const twitterRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.*\/status\/\d+/;
    const evmRegex = /^0x[a-fA-F0-9]{40}$/;
    const megaRegex = /^[a-zA-Z0-9-]+\.mega$/;

    if (!followed) newErrors.followed = "Complete this task first.";
    if (!liked) newErrors.liked = "Complete this task first.";
    if (!twitterHandle) newErrors.twitterHandle = "Enter your X handle.";

    if (!quoteLink || !twitterRegex.test(quoteLink)) {
      newErrors.quoteLink = quoteLink ? "This quote tweet link is invalid." : "Paste your quote tweet link.";
    }

    if (!raidLink || !twitterRegex.test(raidLink)) {
      newErrors.raidLink = raidLink ? "This quest tweet link is invalid." : "Paste your quest tweet link.";
    }

    if (!wallet) {
      newErrors.wallet = "Enter an EVM address or .mega domain.";
    } else if (!evmRegex.test(wallet) && !megaRegex.test(wallet)) {
      newErrors.wallet = "This address format is invalid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      setSubmitError("Fix the highlighted fields first.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let finalWallet = wallet;

      if (wallet.toLowerCase().endsWith(".mega")) {
        setSubmitError("Resolving .mega domain...");
        try {
          const resolveRes = await fetch(`https://api.dotmega.domains/resolve?name=${wallet.toLowerCase()}`);
          const resolveData = await resolveRes.json();

          if (
            resolveData &&
            resolveData.address &&
            resolveData.address !== "0x0000000000000000000000000000000000000000"
          ) {
            finalWallet = resolveData.address;
            setSubmitError(null);
          } else {
            setSubmitError("Could not resolve .mega domain.");
            setIsSubmitting(false);
            return;
          }
        } catch (err) {
          console.error("Resolution error:", err);
          setSubmitError("Failed to reach the .mega domains API.");
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        followed,
        liked,
        twitterHandle,
        quoteLink,
        raidLink,
        wallet: finalWallet.toLowerCase().trim(),
        referrer: referrer.toLowerCase().trim(),
      };

      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Submission failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldError = (message?: string) =>
    message ? (
      <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-wide text-[#8b231d]">
        <AlertCircle size={14} />
        {message}
      </p>
    ) : null;

  const renderFieldSuccess = (message: string, active: boolean) =>
    active ? (
      <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-wide text-[#35583a]">
        <CheckCircle2 size={14} />
        {message}
      </p>
    ) : null;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#f4ebd3_0%,#ece2c7_35%,#dacba8_100%)] text-[#1a1713] selection:bg-[#a23a2f] selection:text-[#fff2d8]">
      <div className="pointer-events-none fixed inset-0 opacity-20 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <AnimatePresence mode="wait">
        {step === "loading" ? (
          <motion.main
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto grid min-h-screen w-[min(1840px,98vw)] grid-cols-1 gap-4 px-3 py-6 lg:grid-cols-[minmax(0,5fr)_360px]"
          >
            <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden rounded-[1rem] border-[4px] border-[#1a1713] bg-[#ddd0ad] shadow-[0_8px_0_#1a1713]">
              <img
                src="/megahop-adventure/assets/Overworld/main_island.png"
                alt="Megahop Adventure world map"
                className="absolute inset-0 h-full w-full object-contain object-center opacity-45"
              />
              <FloatingClouds />
              <FloatingButterflies />
              <div className="absolute left-4 top-4 rounded-lg border-2 border-[#f7e8c5]/40 bg-[#11100d]/35 px-4 py-2 text-sm uppercase tracking-wide text-[#f6edd6] shadow-[0_2px_0_rgba(0,0,0,0.35)]">
                <div className="flex gap-4">
                  <span>Quest Pass 3,333</span>
                  <span>Whitelist Open</span>
                </div>
              </div>
              <div className="absolute right-4 top-4 z-[5] flex justify-end">
                <a
                  href="https://x.com/MegahopNFT"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Megahop X page"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#181410] bg-[#f8f0dc]/92 text-[#1a1713] shadow-[0_4px_0_#181410] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-[#fff8ec]"
                >
                  <Twitter size={16} />
                </a>
              </div>

              <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-10 text-center">
                <div className="w-full max-w-3xl rounded-[1.75rem] border-[3px] border-[#5f594a] bg-[#ece2c7]/90 px-6 py-6 shadow-[0_5px_0_rgba(26,23,19,0.4)] backdrop-blur-sm md:px-10">
                  <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:gap-6">
                    <motion.img
                      src="/megahop-adventure/assets/Overworld/head_megahop.png"
                      alt="Megahop character head"
                      animate={{ y: [0, -4, 0], rotate: [-1.5, 1.5, -1.5] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      className="h-auto w-[74px] shrink-0 drop-shadow-[0_8px_12px_rgba(26,23,19,0.28)] md:w-[94px]"
                    />
                    <div>
                      <h1 className="text-[2.35rem] uppercase leading-[0.92] md:text-[4.75rem]">Megahop Adventure</h1>
                    </div>
                  </div>
                </div>

                <div className="flex w-full max-w-[1080px] flex-wrap items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                    onClick={() => setStep("raid")}
                    className="inline-flex min-h-[72px] w-full max-w-[340px] flex-1 basis-[300px] items-center justify-center gap-3 rounded-[0.9rem] border-[3px] border-[#181410] bg-[#a23a2f] px-5 py-4 text-[0.9rem] uppercase tracking-[0.04em] text-[#fff2d8] shadow-[0_5px_0_#181410] transition hover:brightness-105 md:text-[0.98rem]"
                  >
                    Enter the Quest
                  </motion.button>

                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                    href={MEGAHOP_ADVENTURE_URL}
                    className="inline-flex min-h-[72px] w-full max-w-[340px] flex-1 basis-[300px] items-center justify-center gap-3 rounded-[0.9rem] border-[3px] border-[#181410] bg-[#f8f0dc] px-5 py-4 text-[0.9rem] uppercase tracking-[0.03em] text-[#1a1713] shadow-[0_5px_0_#181410] transition hover:bg-[#fff8ec] md:text-[0.98rem]"
                  >
                    <Gamepad2 size={18} />
                    <span className="whitespace-nowrap">Play Megahop Adventure</span>
                  </motion.a>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                    onClick={() => setShowLeaderboard(true)}
                    className="inline-flex min-h-[72px] w-full max-w-[340px] flex-1 basis-[300px] items-center justify-center gap-3 rounded-[0.9rem] border-[3px] border-[#181410] bg-[#d7c9a6] px-5 py-4 text-[0.9rem] uppercase tracking-[0.04em] text-[#1a1713] shadow-[0_5px_0_#181410] transition hover:bg-[#e3d7b6] md:text-[0.98rem]"
                  >
                    <Trophy size={18} />
                    <span className="whitespace-nowrap">View Leaderboard</span>
                  </motion.button>
                </div>
              </div>
            </section>

            <aside className="flex max-h-[calc(100vh-20px)] flex-col gap-5 overflow-auto rounded-[1rem] border-[3px] border-[#1a1713] bg-[#efe6cf] p-4 shadow-[0_6px_0_#1a1713] lg:p-[1.05rem]">
              <a
                href={MEGAHOP_ADVENTURE_URL}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-[#181410] bg-[linear-gradient(180deg,#b44636_0%,#8f2f24_100%)] px-4 text-[0.92rem] uppercase tracking-[0.06em] text-[#fff2d8] shadow-[0_4px_0_#181410] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                <Gamepad2 size={16} />
                Launch Game
              </a>

              <div className="rounded-[1rem] border-2 border-[#1a1713] bg-[#f8f0dc]/75 px-4 py-4 shadow-[0_4px_0_#1a1713]">
                <h2 className="text-[1.18rem] uppercase leading-[0.95] tracking-[0.04em]">Megahop Quest Board</h2>
                <div className="mt-3 border-t border-dashed border-[#1a1713] pt-3">
                  <p className="max-w-[31ch] text-[0.76rem] leading-[1.28] text-[#4e4438]">
                    Enter the campaign hub, submit your quest tasks, and jump straight into the game world.
                  </p>
                </div>
              </div>

              <div className={`${sectionCardClass} p-[0.95rem]`}>
                <h3 className="mb-1 text-[1.42rem] uppercase leading-[0.94]">Campaign Paths</h3>
                <div className="mt-3 border-t border-dashed border-[#1a1713] pt-3">
                  <p className="text-[0.76rem] leading-[1.24] text-[#4e4438]">Choose one route, or use both.</p>
                </div>
                <div className="mt-3 space-y-2.5 text-[0.8rem]">
                  <div className="rounded-lg border-2 border-[#1a1713] bg-[#fff8eb] px-3 py-2.5 shadow-[0_2px_0_rgba(26,23,19,0.14)]">
                    <p className="text-[0.72rem] uppercase leading-none tracking-[0.05em]">Start the Quest</p>
                    <p className="mt-1.5 leading-[1.22] text-[#5c5142]">Complete socials, submit proof, and unlock whitelist access.</p>
                  </div>
                  <div className="rounded-lg border-2 border-[#1a1713] bg-[#fff8eb] px-3 py-2.5 shadow-[0_2px_0_rgba(26,23,19,0.14)]">
                    <p className="text-[0.72rem] uppercase leading-none tracking-[0.05em]">Play the Game</p>
                    <p className="mt-1.5 leading-[1.22] text-[#5c5142]">Open the Megahop Adventure map and jump in immediately.</p>
                  </div>
                </div>
              </div>

              <div className={`${sectionCardClass} p-[0.95rem]`}>
                <h3 className="mb-1 text-[1.42rem] uppercase leading-[0.94]">Leaderboard</h3>
                <p className="text-[0.76rem] leading-[1.24] text-[#4e4438]">Top questers from the current campaign.</p>
                <div className="mt-3 border-t border-dashed border-[#1a1713] pt-3">
                  {leaderboard.length > 0 ? (
                    <ol className="space-y-2.5">
                      {leaderboard.slice(0, 4).map((item, index) => (
                        <li
                          key={`${item.wallet}-${index}`}
                          className="flex items-center justify-between gap-2 rounded-lg border border-[#1a1713]/15 bg-[#fff8eb] px-2.5 py-2 text-[0.74rem]"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1713] text-[0.68rem] text-[#f8f0dc]">
                              {index + 1}
                            </span>
                            <span className="truncate text-[#2f281f]">
                              {item.twitterHandle
                                ? item.twitterHandle.startsWith("@")
                                  ? item.twitterHandle
                                  : `@${item.twitterHandle}`
                                : `${item.wallet.slice(0, 6)}...${item.wallet.slice(-4)}`}
                            </span>
                          </span>
                          <span className="shrink-0 rounded-full bg-[#a23a2f]/10 px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.06em] text-[#8b231d]">
                            {item.points}
                          </span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-[0.8rem] leading-[1.24] text-[#5c5142]">No entries yet. Be the first to start the quest.</p>
                  )}
                </div>
              </div>
            </aside>
          </motion.main>
        ) : (
          <motion.main
            key="raid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto grid min-h-screen w-[min(1840px,98vw)] grid-cols-1 gap-4 px-3 py-6 lg:grid-cols-[minmax(0,5fr)_360px]"
          >
            <section className="relative overflow-hidden rounded-[1rem] border-[4px] border-[#1a1713] bg-[#ddd0ad] shadow-[0_8px_0_#1a1713]">
              <img
                src="/megahop-adventure/assets/Overworld/main_island.png"
                alt="Megahop map backdrop"
                className="absolute inset-0 h-full w-full object-contain object-center opacity-18"
              />
              <FloatingClouds />
              <FloatingButterflies />
              <div className="relative z-10 mx-auto flex min-h-full max-w-5xl flex-col px-4 py-5 md:px-8 md:py-6">
                <div className="mb-4 rounded-[1.2rem] border-[3px] border-[#5f594a] bg-[#ece2c7]/95 px-5 py-4 shadow-[0_5px_0_rgba(26,23,19,0.4)]">
                  <div className="grid gap-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-5">
                    <div className="flex items-center justify-center md:justify-start">
                      <motion.img
                        src="/megahop-adventure/assets/Overworld/head_megahop.png"
                        alt="Megahop character head"
                        animate={{ y: [0, -4, 0], rotate: [-1.5, 1.5, -1.5] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        className="h-auto w-[56px] shrink-0 drop-shadow-[0_8px_12px_rgba(26,23,19,0.28)] md:w-[72px]"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#6f6252]">Quest Submission</p>
                      <h1 className="mt-1 text-[1.95rem] uppercase leading-[0.92] md:text-[3.35rem]">Begin Your Quest</h1>
                      <p className="mt-1.5 max-w-[42rem] text-[0.76rem] leading-[1.24] text-[#4e4438] md:text-[0.84rem]">
                        Submit your social proof with the same Megahop Adventure visual language used by the game page.
                      </p>
                    </div>
                    <button
                      onClick={() => setStep("loading")}
                      className="inline-flex items-center justify-center gap-2 justify-self-center rounded-lg border-2 border-[#181410] bg-[#f8f0dc] px-3.5 py-2 text-[0.78rem] uppercase tracking-[0.05em] shadow-[0_3px_0_#181410] transition hover:-translate-y-0.5 md:justify-self-end"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-[1.35rem] border-[4px] border-[#1a1713] bg-[#efe6cf]/96 p-4 shadow-[0_8px_0_#1a1713] md:p-5">
                  <section className={questFormSectionClass}>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className={sectionTitleClass}>Follow @MegahopNFT</h3>
                            <p className="mt-1 text-[0.76rem] leading-[1.2] text-[#5c5142]">Use the official X intent link.</p>
                          </div>
                        </div>
                        <a
                          href="https://x.com/intent/follow?screen_name=MegahopNFT"
                          target="_blank"
                          rel="noreferrer"
                          className={`${taskActionClass} self-start md:self-center`}
                        >
                          <Twitter size={14} />
                          Follow
                          <ExternalLink size={12} />
                        </a>
                      </div>
                      <div className="border-t border-dashed border-[#1a1713] pt-2.5">
                        <label className="flex items-center gap-2.5 text-[0.74rem] uppercase tracking-[0.04em]">
                          <input
                            type="checkbox"
                            checked={followed}
                            onChange={(e) => setFollowed(e.target.checked)}
                            className="h-4.5 w-4.5 appearance-none rounded-[4px] border-2 border-[#1a1713] bg-[#fff9eb] checked:bg-[#a23a2f]"
                          />
                          I have followed the account
                        </label>
                      </div>
                    </div>
                    {renderFieldError(errors.followed)}
                  </section>

                  <section className={questFormSectionClass}>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className={sectionTitleClass}>Like & Retweet</h3>
                            <p className="mt-1 text-[0.76rem] leading-[1.2] text-[#5c5142]">Boost the current campaign post.</p>
                          </div>
                        </div>
                        <a
                          href="https://x.com/MegahopNFT"
                          target="_blank"
                          rel="noreferrer"
                          className={`${taskActionClass} self-start md:self-center`}
                        >
                          <Twitter size={14} />
                          Quest Post
                          <ExternalLink size={12} />
                        </a>
                      </div>
                      <div className="border-t border-dashed border-[#1a1713] pt-2.5">
                        <label className="flex items-center gap-2.5 text-[0.74rem] uppercase tracking-[0.04em]">
                          <input
                            type="checkbox"
                            checked={liked}
                            onChange={(e) => setLiked(e.target.checked)}
                            className="h-4.5 w-4.5 appearance-none rounded-[4px] border-2 border-[#1a1713] bg-[#fff9eb] checked:bg-[#a23a2f]"
                          />
                          I have liked and retweeted
                        </label>
                      </div>
                    </div>
                    {renderFieldError(errors.liked)}
                  </section>

                  <section className={questFormSectionClass}>
                    <div className="mb-2">
                      <h3 className={sectionTitleClass}>Your X Handle</h3>
                    </div>
                    <input
                      type="text"
                      placeholder="@username"
                      value={twitterHandle}
                      onChange={(e) => setTwitterHandle(e.target.value)}
                      className={inputClass}
                    />
                    {renderFieldError(errors.twitterHandle)}
                  </section>

                  <section className={questFormSectionClass}>
                    <div className="mb-2">
                      <h3 className={sectionTitleClass}>Quote Tweet Link</h3>
                    </div>
                    <input
                      type="text"
                      placeholder="Paste your quote tweet link"
                      value={quoteLink}
                      onChange={(e) => setQuoteLink(e.target.value)}
                      className={inputClass}
                    />
                    {renderFieldError(errors.quoteLink)}
                    {renderFieldSuccess("Quote tweet verified.", Boolean(quoteLink && !errors.quoteLink))}
                  </section>

                  <section className={questFormSectionClass}>
                    <div className="mb-2">
                      <h3 className={sectionTitleClass}>Raid Tweet Link</h3>
                    </div>
                    <input
                      type="text"
                      placeholder="Paste your raid tweet link"
                      value={raidLink}
                      onChange={(e) => setRaidLink(e.target.value)}
                      className={inputClass}
                    />
                    {renderFieldError(errors.raidLink)}
                    {renderFieldSuccess("Quest link verified.", Boolean(raidLink && !errors.raidLink))}
                  </section>

                  <section className={questFormSectionClass}>
                    <div className="mb-2">
                      <h3 className={sectionTitleClass}>Wallet Address</h3>
                    </div>
                    <div className="relative">
                      <Wallet className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5c5142]" size={16} />
                      <input
                        type="text"
                        placeholder="0x... or yourname.mega"
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                    {renderFieldError(errors.wallet)}
                    {renderFieldSuccess("Wallet accepted.", Boolean(wallet && !errors.wallet))}
                  </section>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                    className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-[0.9rem] border-[3px] border-[#181410] bg-[#a23a2f] px-5 text-[0.88rem] uppercase tracking-[0.05em] text-[#fff2d8] shadow-[0_5px_0_#181410] transition hover:brightness-105 ${isSubmitting ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    {isSubmitting ? "Starting Quest..." : "Start Quest"}
                  </motion.button>

                  {submitError ? (
                    <p className="text-center text-[0.82rem] uppercase tracking-[0.05em] text-[#8b231d]">{submitError}</p>
                  ) : null}
                </form>
              </div>
            </section>

            <aside className="flex max-h-[calc(100vh-20px)] flex-col gap-5 overflow-auto rounded-[1rem] border-[3px] border-[#1a1713] bg-[#efe6cf] p-4 shadow-[0_6px_0_#1a1713] lg:p-[1.05rem]">
              <button
                onClick={() => setStep("loading")}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-[#181410] bg-[linear-gradient(180deg,#b44636_0%,#8f2f24_100%)] px-4 text-[0.92rem] uppercase tracking-[0.06em] text-[#fff2d8] shadow-[0_4px_0_#181410] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                <ArrowLeft size={16} />
                Back to Home
              </button>

              <div className="rounded-[1rem] border-2 border-[#1a1713] bg-[#f8f0dc]/75 px-4 py-4 shadow-[0_4px_0_#1a1713]">
                <h2 className="text-[1.26rem] uppercase leading-[0.95] tracking-[0.04em]">Megahop Quest</h2>
                <div className="mt-3 border-t border-dashed border-[#1a1713] pt-3">
                  <p className="max-w-[31ch] text-[0.76rem] leading-[1.28] text-[#4e4438]">
                    Fill every section, submit your proof, then share your referral link to climb the standings.
                  </p>
                </div>
              </div>

              <div className={`${sectionCardClass} p-[0.95rem]`}>
                <h3 className="mb-1 text-[1.42rem] uppercase leading-[0.94]">Checklist</h3>
                <div className="mt-3 border-t border-dashed border-[#1a1713] pt-3">
                  <ul className="space-y-2 text-[0.8rem] leading-[1.24] text-[#4e4438]">
                    <li>1. Follow the official X account</li>
                    <li>2. Like and retweet the quest post</li>
                    <li>3. Submit your quote and quest links</li>
                    <li>4. Add a valid wallet or .mega domain</li>
                  </ul>
                </div>
              </div>

              <div className={`${sectionCardClass} p-[0.95rem]`}>
                <h3 className="mb-1 text-[1.42rem] uppercase leading-[0.94]">Leaderboard</h3>
                <div className="mt-3 border-t border-dashed border-[#1a1713] pt-3">
                  <p className="text-[0.76rem] leading-[1.24] text-[#4e4438]">
                    Open the full ranking modal from the home screen.
                  </p>
                </div>
                <div className="mt-3 space-y-2.5">
                  {leaderboard.length > 0 ? (
                    leaderboard.slice(0, 3).map((item, index) => (
                      <div
                        key={`${item.wallet}-raid-${index}`}
                        className="flex items-center justify-between gap-2 rounded-lg border border-[#1a1713]/15 bg-[#fff8eb] px-2.5 py-2 text-[0.74rem]"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1713] text-[0.68rem] text-[#f8f0dc]">
                            {index + 1}
                          </span>
                          <span className="truncate text-[#2f281f]">
                            {item.twitterHandle
                              ? item.twitterHandle.startsWith("@")
                                ? item.twitterHandle
                                : `@${item.twitterHandle}`
                              : `${item.wallet.slice(0, 6)}...${item.wallet.slice(-4)}`}
                          </span>
                        </span>
                        <span className="shrink-0 rounded-full bg-[#a23a2f]/10 px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.06em] text-[#8b231d]">
                          {item.points}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[0.8rem] leading-[1.24] text-[#5c5142]">No quest scores yet.</p>
                  )}
                </div>
              </div>
            </aside>
          </motion.main>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(20,17,13,0.72)] p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              className="w-full max-w-xl rounded-[1.75rem] border-[4px] border-[#1a1713] bg-[#efe6cf] p-6 shadow-[0_10px_0_#1a1713] md:p-8"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-[#6f6252]">Submission Complete</p>
              <h2 className="mt-3 text-4xl uppercase leading-none md:text-5xl">Welcome to the Quest</h2>
              <p className="mt-4 text-sm leading-snug text-[#4e4438] md:text-base">
                Your entry has been sent. Use your referral link below to invite more players.
              </p>

              <div className="mt-6 rounded-[1.25rem] border-[3px] border-[#1a1713] bg-[#f8f0dc] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#6f6252]">Referral Link</p>
                <div className="mt-3 flex gap-2">
                  <input readOnly value={referralUrl} className={`${inputClass} flex-1`} />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(referralUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-xl border-[3px] border-[#181410] bg-[#a23a2f] text-[#fff2d8] shadow-[0_4px_0_#181410] transition hover:brightness-105"
                  >
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border-[3px] border-[#181410] bg-[#a23a2f] px-5 text-sm uppercase tracking-wide text-[#fff2d8] shadow-[0_4px_0_#181410]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep("loading");
                  }}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border-[3px] border-[#181410] bg-[#f8f0dc] px-5 text-sm uppercase tracking-wide shadow-[0_4px_0_#181410]"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showLeaderboard ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-[rgba(20,17,13,0.8)] p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              className="custom-scrollbar flex max-h-[90vh] w-full max-w-2xl flex-col overflow-auto rounded-[1.8rem] border-[4px] border-[#1a1713] bg-[#efe6cf] p-5 shadow-[0_10px_0_#1a1713] md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#1a1713] bg-[#f8f0dc]">
                    <Trophy size={22} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#6f6252]">Campaign Ranking</p>
                    <h2 className="text-3xl uppercase leading-none md:text-4xl">Quest Elite</h2>
                  </div>
                </div>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-[3px] border-[#181410] bg-[#a23a2f] text-[#fff2d8] shadow-[0_4px_0_#181410]"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {leaderboard.length > 0 ? (
                  leaderboard.map((item, index) => (
                    <motion.div
                      key={`${item.wallet}-${index}`}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="flex items-center justify-between gap-4 rounded-[1rem] border-[3px] border-[#1a1713] bg-[#f8f0dc] p-4 shadow-[0_4px_0_#1a1713]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1a1713] text-[#f8f0dc]">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-base uppercase">
                            {item.twitterHandle
                              ? item.twitterHandle.startsWith("@")
                                ? item.twitterHandle
                                : `@${item.twitterHandle}`
                              : `${item.wallet.slice(0, 6)}...${item.wallet.slice(-4)}`}
                          </p>
                          <p className="text-xs text-[#5c5142]">{item.wallet.slice(0, 6)}...{item.wallet.slice(-4)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl leading-none text-[#8b231d]">{item.points}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#6f6252]">Points</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-[1rem] border-[3px] border-dashed border-[#1a1713] bg-[#f8f0dc] px-6 py-12 text-center">
                    <UserPlus size={52} className="mb-4" />
                    <p className="text-xl uppercase">No legends yet</p>
                    <p className="mt-2 text-sm text-[#5c5142]">Submit the first successful quest entry.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 9px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(26, 23, 19, 0.08);
              border-radius: 999px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #8f2f24;
              border-radius: 999px;
            }
          `,
        }}
      />
    </div>
  );
}
