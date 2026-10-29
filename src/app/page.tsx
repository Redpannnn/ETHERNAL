"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MapPin,
  Clock,
  Calendar,
  Music,
  VolumeX,
  ChevronUp,
  Sparkles,
  Instagram,
  Download,
  ArrowLeft,
} from "lucide-react";

/* ⚙️ CONFIG: URL tujuan tombol "Back to Template" */
const TEMPLATE_URL = "https://template.memoraa-invitation.my.id/";

/* ─── fade-in utility ─── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── floating particles ─── */
/* Deterministic pseudo-random generator: keeps SSR and client markup
   identical (avoids hydration mismatch) while preserving the random look. */
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function FloatingParticles() {
  const rand = seededRandom(42);
  const particles = Array.from({ length: 20 }, () => ({
    size: rand() * 6 + 2,
    left: rand() * 100,
    top: rand() * 100,
    drift: rand() * 20 - 10,
    duration: rand() * 4 + 4,
    delay: rand() * 3,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-300/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.drift, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────── BACK TO TEMPLATE ─────────────────── */
function BackToTemplateButton() {
  return (
    <a
      href={TEMPLATE_URL}
      aria-label="Kembali ke daftar template"
      className="fixed left-1/2 top-4 z-50 flex h-9 -translate-x-1/2 items-center gap-1.5 rounded-full border border-stone-200 bg-white/90 px-4 text-xs font-medium tracking-wide text-stone-600 shadow-md backdrop-blur-sm transition-all hover:border-amber-300 hover:bg-white hover:text-amber-700 md:top-5"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back to Template
    </a>
  );
}

/* ─── section divider ─── */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <div className="h-px w-16 bg-amber-400/40" />
      <Heart className="h-4 w-4 text-amber-500/60" fill="currentColor" />
      <div className="h-px w-16 bg-amber-400/40" />
    </div>
  );
}

/* ─────────────────── COVER / OPENING ─────────────────── */
function CoverSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-stone-100 px-6 text-center">
      {/* top floral */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-48 w-full -translate-x-1/2 overflow-hidden opacity-30">
        <img
          src="/wedding/floral-corner.png"
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </div>

      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <p className="tracking-[0.35em] text-xs font-light uppercase text-stone-500 md:text-sm">
          The Wedding Of
        </p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif text-5xl font-bold leading-tight tracking-tight text-stone-800 md:text-7xl"
        >
          {weddingData.couple.groom.nickname}
        </motion.h1>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-serif text-3xl text-amber-600 md:text-4xl"
        >
          &amp;
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-5xl font-bold leading-tight tracking-tight text-stone-800 md:text-7xl"
        >
          {weddingData.couple.bride.nickname}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button
            onClick={onOpen}
            className="group mt-10 h-12 rounded-full border-2 border-amber-600 bg-amber-600/10 px-10 text-sm font-medium tracking-wider text-amber-800 backdrop-blur-sm transition-all hover:bg-amber-600 hover:text-white"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Buka Undangan
          </Button>
        </motion.div>
      </div>

      {/* bottom floral */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-48 w-full -translate-x-1/2 rotate-180 overflow-hidden opacity-30">
        <img
          src="/wedding/floral-corner.png"
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </div>
    </section>
  );
}

/* ─────────────────── QURAN VERSE ─────────────────── */
function VerseSection() {
  return (
    <section className="relative bg-stone-100 py-16 px-6">
      <div className="mx-auto max-w-lg text-center">
        <FadeIn>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Bismillahirrahmanirrahim
          </p>
          <Divider />
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mb-2 font-serif text-lg leading-loose text-stone-700 md:text-xl" dir="rtl" lang="ar">
            {weddingData.verse.arabic}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mt-6 text-sm leading-relaxed text-stone-600 md:text-base">
            &ldquo;{weddingData.verse.translation}&rdquo;
          </p>
          <p className="mt-2 text-xs font-medium text-amber-700">
            {weddingData.verse.reference}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────── COUPLE (no photos) ─────────────────── */
function CoupleSection() {
  return (
    <section className="relative overflow-hidden bg-stone-50 py-20 px-6">
      <FadeIn>
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
          Mempelai
        </p>
        <Divider />
      </FadeIn>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
        {/* Groom */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-200 bg-amber-50 font-serif text-2xl font-bold text-amber-700 md:h-24 md:w-24 md:text-3xl">
              {weddingData.couple.groom.nickname.charAt(0)}
            </div>
            <h3 className="mt-5 font-serif text-2xl font-bold text-stone-800 md:text-3xl">
              {weddingData.couple.groom.nickname}
            </h3>
            <p className="mt-1 text-sm font-medium text-stone-600">
              {weddingData.couple.groom.fullName}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              {weddingData.couple.groom.parent}
            </p>
            <a
              href={weddingData.couple.groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800"
            >
              <Instagram className="h-3.5 w-3.5" />
              Instagram
            </a>
          </div>
        </FadeIn>

        {/* Ampersand */}
        <FadeIn delay={0.3}>
          <span className="font-serif text-5xl text-amber-500 md:text-6xl">
            &amp;
          </span>
        </FadeIn>

        {/* Bride */}
        <FadeIn delay={0.4}>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-200 bg-amber-50 font-serif text-2xl font-bold text-amber-700 md:h-24 md:w-24 md:text-3xl">
              {weddingData.couple.bride.nickname.charAt(0)}
            </div>
            <h3 className="mt-5 font-serif text-2xl font-bold text-stone-800 md:text-3xl">
              {weddingData.couple.bride.nickname}
            </h3>
            <p className="mt-1 text-sm font-medium text-stone-600">
              {weddingData.couple.bride.fullName}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              {weddingData.couple.bride.parent}
            </p>
            <a
              href={weddingData.couple.bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800"
            >
              <Instagram className="h-3.5 w-3.5" />
              Instagram
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────── COUNTDOWN ─────────────────── */
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(weddingData.event.date).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(target - now, 0);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="relative bg-stone-900 py-20 px-6 text-center">
      <FloatingParticles />
      <FadeIn>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
          Menghitung Hari
        </p>
      </FadeIn>
      <div className="mx-auto mt-10 flex max-w-md justify-center gap-3 md:gap-5">
        {units.map((u) => (
          <FadeIn key={u.label} delay={0.15 * units.indexOf(u)}>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 font-serif text-2xl font-bold text-amber-100 md:h-20 md:w-20 md:text-3xl">
                {String(u.value).padStart(2, "0")}
              </div>
              <span className="mt-2 text-[10px] font-medium uppercase tracking-widest text-amber-300/80">
                {u.label}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={0.6}>
        <p className="mx-auto mt-10 max-w-sm text-sm leading-relaxed text-stone-400">
          Merupakan kebahagiaan dan kehormatan bagi kami, jika Anda berkenan
          hadir dan memberikan restu kepada kami.
        </p>
        <p className="mt-3 font-serif text-lg font-semibold text-amber-300">
          Rizky &amp; Aisyah
        </p>
      </FadeIn>
    </section>
  );
}

/* ─────────────────── EVENT DETAILS ─────────────────── */
function EventSection() {
  return (
    <section className="relative bg-stone-100 py-20 px-6">
      <FadeIn>
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
          Waktu &amp; Tempat
        </p>
        <Divider />
      </FadeIn>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Akad */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-amber-200/60 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
              <Calendar className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800">
              Akad Nikah
            </h3>
            <div className="mt-4 space-y-2 text-sm text-stone-600">
              <p className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                {weddingData.event.dayName}, {weddingData.event.dateFormatted}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                {weddingData.event.akad.time}
              </p>
              <p className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500" />
                {weddingData.event.akad.venue}
              </p>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              {weddingData.event.akad.address}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(weddingData.event.akad.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-900"
            >
              <MapPin className="h-3.5 w-3.5" />
              Lihat Peta
            </a>
          </div>
        </FadeIn>

        {/* Resepsi */}
        <FadeIn delay={0.4}>
          <div className="rounded-2xl border border-amber-200/60 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
              <Heart className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800">
              Resepsi
            </h3>
            <div className="mt-4 space-y-2 text-sm text-stone-600">
              <p className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                {weddingData.event.dayName}, {weddingData.event.dateFormatted}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                {weddingData.event.reception.time}
              </p>
              <p className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500" />
                {weddingData.event.reception.venue}
              </p>
            </div>
            <p className="mt-2 text-xs text-stone-400">
              {weddingData.event.reception.address}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(weddingData.event.reception.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-900"
            >
              <MapPin className="h-3.5 w-3.5" />
              Lihat Peta
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────── THANK YOU ─────────────────── */
function ThankYouSection() {
  return (
    <section className="relative bg-stone-50 py-24 px-6 text-center">
      <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-full -translate-x-1/2 overflow-hidden opacity-20">
        <img
          src="/wedding/floral-corner.png"
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </div>

      <FadeIn>
        <Heart className="mx-auto h-10 w-10 text-amber-400" fill="currentColor" />
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
          Terima Kasih
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone-600 md:text-lg">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir untuk memberikan doa restu kepada kami.
        </p>
      </FadeIn>
      <FadeIn delay={0.5}>
        <p className="mx-auto mt-3 max-w-md text-sm italic text-stone-500">
          Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.
        </p>
      </FadeIn>
      <FadeIn delay={0.7}>
        <p className="mt-8 font-serif text-xl font-bold text-stone-800 md:text-2xl">
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>
      </FadeIn>

      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-40 w-full -translate-x-1/2 rotate-180 overflow-hidden opacity-20">
        <img
          src="/wedding/floral-corner.png"
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </div>
    </section>
  );
}

/* ─────────────────── FOOTER ─────────────────── */
function FooterSection() {
  return (
    <footer className="relative bg-stone-900 py-12 px-6 text-center">
      <FloatingParticles />
      <FadeIn>
        <p className="font-serif text-lg font-semibold text-amber-300">
          Rizky &amp; Aisyah
        </p>
        <p className="mt-1 text-xs text-stone-500">
          {weddingData.event.dayName}, {weddingData.event.dateFormatted}
        </p>
        <p className="mt-6 text-[10px] text-stone-600">
          Made with ❤️ for Rizky &amp; Aisyah
        </p>
      </FadeIn>
    </footer>
  );
}

/* ─────────────────── MUSIC TOGGLE ─────────────────── */
function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg transition-all hover:bg-amber-700"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? (
        <Music className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </button>
  );
}

/* ─────────────────── DOWNLOAD BUTTON (dev only) ─────────────────── */
const IS_DEV = process.env.NODE_ENV === "development";

function DownloadButton() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/download");
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wedding-invitation.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert("Gagal mendownload file. Coba lagi.");
    } finally {
      setDownloading(false);
    }
  };

  if (!IS_DEV) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={handleDownload}
      disabled={downloading}
      className="fixed bottom-5 left-1/2 z-50 flex h-11 items-center gap-2 rounded-full bg-stone-900 px-5 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition hover:bg-stone-700 disabled:opacity-60"
      aria-label="Download project ZIP"
    >
      <Download className="h-4 w-4" />
      {downloading ? "Mendownload..." : "Download ZIP"}
    </motion.button>
  );
}

/* ─────────────────── SCROLL-TO-TOP ─────────────────── */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-stone-800/80 text-white shadow-lg backdrop-blur-sm transition hover:bg-stone-700"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════ MAIN PAGE ═══════════════════ */
export default function WeddingPage() {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = useCallback(() => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  }, [musicPlaying]);

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-800">
      {/* Audio */}
      <audio ref={audioRef} src="/wedding/music.mp3" loop preload="none" />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="cover"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <CoverSection onOpen={handleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <VerseSection />
            <CoupleSection />
            <CountdownSection />
            <EventSection />
            <ThankYouSection />
            <FooterSection />
          </motion.div>
        )}
      </AnimatePresence>

      <BackToTemplateButton />
      {opened && <MusicToggle playing={musicPlaying} onToggle={toggleMusic} />}
      {opened && <ScrollToTop />}
      <DownloadButton />
    </div>
  );
}
