import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Home } from 'lucide-react';
import GameEngine from '../game/GameEngine';

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [birds, setBirds] = useState(3);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete'>('menu');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gameEngine = new GameEngine(canvas, {
      onScoreUpdate: setScore,
      onBirdsUpdate: setBirds,
      onGameStateChange: setGameState,
      onLevelChange: setLevel
    });

    gameEngineRef.current = gameEngine;

    return () => {
      gameEngine.destroy();
    };
  }, []);

  const startGame = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.start();
      setIsPlaying(true);
      setGameState('playing');
    }
  };

  const pauseGame = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.pause();
      setIsPlaying(false);
      setGameState('paused');
    }
  };

  const resumeGame = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.resume();
      setIsPlaying(true);
      setGameState('playing');
    }
  };

  const resetGame = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.reset();
      setIsPlaying(false);
      setScore(0);
      setBirds(3);
      setLevel(1);
      setGameState('menu');
    }
  };

  const nextLevel = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.nextLevel();
      setGameState('playing');
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        className="absolute inset-0 w-full h-full object-contain bg-gradient-to-b from-sky-300 to-green-400"
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top HUD */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-4">
            <span className="font-bold">Score: {score}</span>
            <span className="font-bold">Level: {level}</span>
            <span className="font-bold">Birds: {birds}</span>
          </div>
          
          <div className="flex gap-2">
            {gameState === 'playing' && (
              <button
                onClick={pauseGame}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full transition-colors"
              >
                <Pause className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={resetGame}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Instructions */}
        {gameState === 'playing' && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg pointer-events-auto">
            <p className="text-sm">Click and drag to aim • Release to shoot • Destroy all pigs to win!</p>
          </div>
        )}

        {/* Menu Screen */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-md mx-4">
              <h1 className="text-4xl font-bold text-red-600 mb-2">Angry Birds</h1>
              <p className="text-gray-600 mb-6">Destroy all the pigs using your birds!</p>
              <button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <Play className="w-6 h-6" />
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* Pause Screen */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Paused</h2>
              <div className="flex gap-4">
                <button
                  onClick={resumeGame}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Resume
                </button>
                <button
                  onClick={resetGame}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Level Complete Screen */}
        {gameState === 'levelComplete' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
              <h2 className="text-3xl font-bold text-green-600 mb-2">Level Complete!</h2>
              <p className="text-gray-600 mb-4">Score: {score}</p>
              <div className="flex gap-4">
                <button
                  onClick={nextLevel}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Next Level
                </button>
                <button
                  onClick={resetGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Main Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
              <h2 className="text-3xl font-bold text-red-600 mb-2">Game Over!</h2>
              <p className="text-gray-600 mb-4">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-6 h-6" />
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;