import React, { useEffect, useRef } from "react";

const VideoInput = ({ contentPath ,style}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play(); // Play when in view
        } else {
          videoRef.current?.pause(); // Pause when out of view
        }
      },
      {
        threshold: 0.5, // Play when at least 50% of the video is in view
      }
    );

    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={`${contentPath}#t=0.1`}
      controls
      className="w-[100%] object-cover block rounded-xl "
      muted
      style={{
        ...style
      }}
    />
  );
};

export default VideoInput;
