import React from 'react';
import { Heart, MoreHorizontal } from 'lucide-react';
import { Track } from '../types/music';

interface NowPlayingProps {
  track: Track | null;
  isPlaying: boolean;
  onToggleLike: () => void;
}

const NowPlaying = ({ track, isPlaying, onToggleLike }: NowPlayingProps) => {
  if (!track) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-4xl">♪</span>
          </div>
          <p>No track selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      {/* Album Art */}
      <div className="relative mb-8">
        <div className={`w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 ${
          isPlaying ? 'animate-pulse' : ''
        }`}>
          <img
            src={track.coverUrl}
            alt={`${track.album} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Vinyl effect when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-spin-slow"></div>
        )}
      </div>

      {/* Track Info */}
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {track.title}
        </h2>
        <p className="text-xl text-gray-300 mb-1">{track.artist}</p>
        <p className="text-lg text-gray-400 mb-6">{track.album}</p>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onToggleLike}
            className={`p-3 rounded-full transition-all ${
              track.isLiked 
                ? 'text-red-500 bg-red-500/20 hover:bg-red-500/30' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-500/20'
            }`}
          >
            <Heart className={`w-6 h-6 ${track.isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;