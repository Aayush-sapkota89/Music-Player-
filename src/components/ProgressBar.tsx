import React, { useRef } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    onSeek(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={progressRef}
      className="w-full h-2 bg-gray-600 rounded-full cursor-pointer group"
      onClick={handleClick}
    >
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative transition-all duration-150"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  );
};

export default ProgressBar;