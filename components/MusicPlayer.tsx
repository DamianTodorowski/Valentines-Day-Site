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
  const [hasError, setHasError] = useState(false);

  // Fetty Wap - Again (Official Video)
  const YOUTUBE_VIDEO_ID = "Z-48F_N-Azo";

  useEffect(() => {
    let intervalId: any;

    const initPlayer = () => {
      // Prevent double initialization
      if (playerRef.current) return;
      if (!window.YT || !window.YT.Player) return;

      try {
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
            'origin': window.location.origin, // Critical for embedding security and functionality
          },
          events: {
            'onReady': () => {
              console.log("YouTube Player Ready");
              setIsPlayerReady(true);
            },
            'onStateChange': (event: any) => {
              // YT.PlayerState.PLAYING = 1, PAUSED = 2
              if (event.data === 1) setIsPlaying(true);
              if (event.data === 2) setIsPlaying(false);
            },
            'onError': (e: any) => {
              console.error("YouTube Player Error:", e.data);
              setHasError(true);
            }
          }
        });
      } catch (error) {
        console.error("Error creating YouTube player:", error);
      }
    };

    // 1. Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // 2. Load API if not present
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // 3. Setup callback
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initPlayer();
      };

      // 4. Fallback polling in case callback is missed
      intervalId = setInterval(() => {
        if (window.YT && window.YT.Player && !playerRef.current) {
          initPlayer();
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !isPlayerReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  if (hasError) return null; // Hide if broken

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Hidden container for the YouTube player */}
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
        {!isPlayerReady ? (
          // Loading Spinner
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : isPlaying ? (
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