import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

function HlsPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = url;
      }
    }
  }, [url]);

  return <video ref={videoRef} controls muted autoPlay playsInline />;
}

export default HlsPlayer;
