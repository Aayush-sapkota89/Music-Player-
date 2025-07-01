import React, { useRef } from 'react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl = ({ volume, isMuted, onVolumeChange }: VolumeControlProps) => {
  const volumeRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!volumeRef.current) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    
    onVolumeChange(percentage);
  };

  const displayVolume = isMuted ? 0 : volume;

  return (
    <div
      ref={volumeRef}
      className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer group"
      onClick={handleClick}
    >
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative transition-all duration-150"
        style={{ width: `${displayVolume * 100}%` }}
      >
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  );
};

export default VolumeControl;