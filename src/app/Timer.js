import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2025-07-04T00:00:00-04:00"); // EDT for July 4th

function getTimeRemaining() {
  const now = new Date();
  const total = TARGET_DATE - now;
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.total <= 0) {
    return (
      <div className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-300 py-8 animate-pulse">
        Happy July 4th, 2025! 🎆
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-blue-900 dark:via-black dark:to-blue-950 border border-blue-200 dark:border-blue-800">
      <div className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-200 mb-2 tracking-tight text-center">
        Countdown to <span className="text-red-600 dark:text-red-400">July 4th, 2025</span>
      </div>
      <div className="flex justify-center gap-4 w-full">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl sm:text-4xl font-mono font-extrabold text-blue-900 dark:text-blue-100 bg-white/80 dark:bg-blue-950/80 rounded-lg px-3 py-1 shadow-sm border border-blue-200 dark:border-blue-800">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs sm:text-sm mt-1 text-blue-700 dark:text-blue-300 font-semibold tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
} 