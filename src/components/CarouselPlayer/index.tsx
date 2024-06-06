import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

interface PlaylistItem {
  _key: string;
  title: string;
  url: string;
}

interface Props {
  playlist: PlaylistItem[];
}

const CarouselPlayer: React.FC<Props> = ({ playlist = [] }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) {
        nextVideo();
      }
    }, 10000); // Altere o intervalo conforme necessário

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden w-full h-80 md:h-96 xl:h-[488px]">
        <div className="flex  h-80 md:h-96 xl:h-[488px]" style={{ transform: `translateX(-${currentVideo * 100}%)`, transition: 'transform 0.5s ease' }}>
          {playlist.map((video) => (
            <div key={video._key} className="w-full object-cover  flex-shrink-0  h-80 md:h-96 xl:h-[488px]">
              <ReactPlayer
                url={video.url}
                className="w-full object-cover h-80  md:h-96 xl:h-[488px]"
                width="100%"
                height="100%"
                onPlay={handlePlay}
                onPause={handlePause}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        {playlist.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(index)}
            className={`w-4 h-4 rounded-full ${
              index === currentVideo ? 'bg-gray-50 w-8 transform transition-all duration-500' : 'bg-gray-400 opacity-50'
            } focus:outline-none`}
          ></button>
        ))}
      </div>
      <button
        onClick={prevVideo}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 px-3 py-1 rounded-md text-white text-sm focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 opacity-75">
          <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        onClick={nextVideo}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 px-3 py-1 rounded-md text-white text-sm focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 opacity-75">
          <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default CarouselPlayer;
