"use client";

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
      <div className="text-5xl font-extrabold text-center bg-white text-black p-6 rounded-lg">
        00:00:00:00
      </div>
    );
  }

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="text-5xl font-extrabold text-center font-mono bg-white text-black p-6 rounded-lg">
      {pad(timeLeft.days)}:{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
    </div>
  );
} 