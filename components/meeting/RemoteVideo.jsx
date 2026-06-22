import { useEffect, useRef } from "react";

const RemoteVideo = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        width: "300px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    />
  );
};

export default RemoteVideo;