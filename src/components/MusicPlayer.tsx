import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, MoreHorizontal, Music } from 'lucide-react';
import Playlist from './Playlist';
import NowPlaying from './NowPlaying';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';
import { Track } from '../types/music';

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [showPlaylist, setShowPlaylist] = useState(true);

  const sampleTracks: Track[] = [
    {
      id: '1',
      title: 'Midnight Dreams',
      artist: 'Luna Eclipse',
      album: 'Nocturnal Vibes',
      duration: 245,
      coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      audioUrl: '', // In a real app, this would be actual audio files
      isLiked: true
    },
    {
      id: '2',
      title: 'Electric Pulse',
      artist: 'Neon Nights',
      album: 'Synthwave Collection',
      duration: 198,
      coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
      audioUrl: '',
      isLiked: false
    },
    {
      id: '3',
      title: 'Ocean Waves',
      artist: 'Serene Sounds',
      album: 'Nature\'s Symphony',
      duration: 312,
      coverUrl: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      audioUrl: '',
      isLiked: true
    },
    {
      id: '4',
      title: 'Urban Rhythm',
      artist: 'City Beats',
      album: 'Street Sounds',
      duration: 187,
      coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
      audioUrl: '',
      isLiked: false
    },
    {
      id: '5',
      title: 'Cosmic Journey',
      artist: 'Space Odyssey',
      album: 'Interstellar',
      duration: 278,
      coverUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400',
      audioUrl: '',
      isLiked: true
    },
    {
      id: '6',
      title: 'Golden Hour',
      artist: 'Sunset Collective',
      album: 'Warm Memories',
      duration: 223,
      coverUrl: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=400',
      audioUrl: '',
      isLiked: false
    }
  ];

  const [tracks, setTracks] = useState<Track[]>(sampleTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    if (tracks.length > 0 && !currentTrack) {
      setCurrentTrack(tracks[0]);
    }
  }, [tracks, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const newIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
    setCurrentTrackIndex(newIndex);
    setCurrentTrack(tracks[newIndex]);
    setCurrentTime(0);
  };

  const handleNext = () => {
    let newIndex;
    
    if (repeatMode === 'one') {
      newIndex = currentTrackIndex;
    } else if (isShuffled) {
      newIndex = Math.floor(Math.random() * tracks.length);
    } else {
      newIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
    }
    
    setCurrentTrackIndex(newIndex);
    setCurrentTrack(tracks[newIndex]);
    setCurrentTime(0);
  };

  const handleTrackSelect = (track: Track) => {
    const index = tracks.findIndex(t => t.id === track.id);
    setCurrentTrackIndex(index);
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleLike = (trackId: string) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, isLiked: !track.isLiked } : track
    ));
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes: ('none' | 'one' | 'all')[] = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Hidden audio element */}
      <audio ref={audioRef} />
      
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Music className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Harmony
          </h1>
        </div>
        
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Now Playing Section */}
        <div className={`${showPlaylist ? 'w-2/3' : 'w-full'} flex flex-col transition-all duration-300`}>
          <NowPlaying 
            track={currentTrack}
            isPlaying={isPlaying}
            onToggleLike={() => currentTrack && toggleLike(currentTrack.id)}
          />
          
          {/* Controls */}
          <div className="p-8 bg-black/20 backdrop-blur-sm">
            {/* Progress Bar */}
            <div className="mb-6">
              <ProgressBar
                currentTime={currentTime}
                duration={duration || (currentTrack?.duration || 0)}
                onSeek={handleSeek}
              />
              <div className="flex justify-between text-sm text-gray-300 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || (currentTrack?.duration || 0))}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={toggleShuffle}
                className={`p-2 rounded-full transition-colors ${
                  isShuffled ? 'text-purple-400 bg-purple-400/20' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Shuffle className="w-5 h-5" />
              </button>
              
              <button
                onClick={handlePrevious}
                className="p-3 text-gray-300 hover:text-white transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              
              <button
                onClick={handleNext}
                className="p-3 text-gray-300 hover:text-white transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
              
              <button
                onClick={toggleRepeat}
                className={`p-2 rounded-full transition-colors ${
                  repeatMode !== 'none' ? 'text-purple-400 bg-purple-400/20' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Repeat className="w-5 h-5" />
                {repeatMode === 'one' && (
                  <span className="absolute -mt-6 -mr-2 text-xs bg-purple-500 rounded-full w-4 h-4 flex items-center justify-center">1</span>
                )}
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <VolumeControl
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={setVolume}
              />
            </div>
          </div>
        </div>

        {/* Playlist */}
        {showPlaylist && (
          <div className="w-1/3 border-l border-white/10">
            <Playlist
              tracks={tracks}
              currentTrack={currentTrack}
              onTrackSelect={handleTrackSelect}
              onToggleLike={toggleLike}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;