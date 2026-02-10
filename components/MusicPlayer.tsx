import React, { useState, useEffect, useRef } from 'react';

// Add types for the YouTube IFrame API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Fetty Wap - Again (Official Video)
  const YOUTUBE_VIDEO_ID = "Z-48F_N-Azo";

  useEffect(() => {
    // 1. Load the YouTube IFrame API code asynchronously.
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // 2. Define the global callback that the API calls when ready.
    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    // 3. Handle case where script is already loaded (e.g. fast navigation)
    if (window.YT && window.YT.Player) {
      createPlayer();
    }

    function createPlayer() {
      if (playerRef.current) return; // Prevent double initialization

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'disablekb': 1,
          'fs': 0,
          'loop': 1,
          'playlist': YOUTUBE_VIDEO_ID, // Required for loop to work on single video
          'modestbranding': 1,
          'playsinline': 1,
          'rel': 0,
        },
        events: {
          'onReady': () => setIsPlayerReady(true),
          'onStateChange': (event: any) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2
            if (event.data === 1) setIsPlaying(true);
            if (event.data === 2) setIsPlaying(false);
          }
        }
      });
    }
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !isPlayerReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Hidden container for the YouTube player */}
      {/* We use specific styles to hide it instead of display:none to ensure API works */}
      <div id="youtube-player" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}></div>
      
      <button
        onClick={togglePlay}
        disabled={!isPlayerReady}
        className={`
          flex items-center justify-center w-12 h-12 rounded-full shadow-lg border-2 transition-all duration-300 transform hover:scale-105
          ${isPlaying 
            ? 'bg-red-500 border-red-300 text-white animate-[spin_4s_linear_infinite]' 
            : 'bg-white/80 backdrop-blur border-pink-300 text-pink-500'
          }
          ${!isPlayerReady ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
        `}
        title={isPlaying ? "Zatrzymaj muzykę" : "Odtwórz muzykę"}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;