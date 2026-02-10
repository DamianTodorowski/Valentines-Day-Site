import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const year = new Date().getFullYear();
      // Month is 0-indexed in JS Date (0 = Jan, 1 = Feb)
      const valentineDate = new Date(year, 1, 14); 
      const now = new Date();

      let targetDate = valentineDate;
      // If Valentine's day has passed this year, count down to next year
      if (now > valentineDate) {
        targetDate = new Date(year + 1, 1, 14);
      }

      const difference = +targetDate - +now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-3 w-16 md:w-20 h-16 md:h-20 flex items-center justify-center border-2 border-pink-200">
        <span className="text-2xl md:text-3xl font-bold text-red-500 font-mono">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs md:text-sm text-pink-700 mt-1 font-semibold uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="mt-8 flex flex-col items-center animate-fade-in">
      <h3 className="text-pink-600 font-cursive text-2xl mb-4">Czas do Walentynek</h3>
      <div className="flex justify-center flex-wrap">
        <TimeUnit value={timeLeft.days} label="Dni" />
        <TimeUnit value={timeLeft.hours} label="Godz" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Sek" />
      </div>
    </div>
  );
};

export default CountdownTimer;