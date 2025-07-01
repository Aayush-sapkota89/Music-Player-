import React from 'react';
import { Heart, Play, Pause } from 'lucide-react';
import { Track } from '../types/music';

interface PlaylistProps {
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
  onToggleLike: (trackId: string) => void;
}

const Playlist = ({ tracks, currentTrack, onTrackSelect, onToggleLike }: PlaylistProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold mb-2">Now Playing</h3>
        <p className="text-gray-400 text-sm">{tracks.length} songs</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`group flex items-center gap-4 p-4 hover:bg-white/5 cursor-pointer transition-colors ${
              currentTrack?.id === track.id ? 'bg-white/10' : ''
            }`}
            onClick={() => onTrackSelect(track)}
          >
            {/* Track Number / Play Icon */}
            <div className="w-8 flex items-center justify-center">
              {currentTrack?.id === track.id ? (
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Play className="w-2 h-2 text-white" />
                </div>
              ) : (
                <span className="text-gray-400 text-sm group-hover:hidden">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              )}
              <Play className="w-4 h-4 text-white hidden group-hover:block" />
            </div>

            {/* Album Art */}
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={track.coverUrl}
                alt={`${track.album} cover`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium truncate ${
                currentTrack?.id === track.id ? 'text-purple-400' : 'text-white'
              }`}>
                {track.title}
              </h4>
              <p className="text-gray-400 text-sm truncate">{track.artist}</p>
            </div>

            {/* Duration */}
            <div className="text-gray-400 text-sm">
              {formatDuration(track.duration)}
            </div>

            {/* Like Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(track.id);
              }}
              className={`p-2 rounded-full transition-all ${
                track.isLiked 
                  ? 'text-red-500 hover:bg-red-500/20' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-500/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${track.isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;