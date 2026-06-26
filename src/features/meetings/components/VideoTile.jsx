import { useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

const VideoTile = ({
  stream,
  name,
  isLocal = false,
  micOn = true,
  videoOn = true,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg">

      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="h-full flex items-center justify-center text-zinc-500">
          No Video
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 py-3">

        <span className="font-medium">
          {name}
        </span>

        <div className="flex gap-2">

          {micOn ? (
            <Mic size={18} />
          ) : (
            <MicOff
              size={18}
              className="text-red-500"
            />
          )}

          {videoOn ? (
            <Video size={18} />
          ) : (
            <VideoOff
              size={18}
              className="text-red-500"
            />
          )}

        </div>

      </div>

    </div>
  );
};

export default VideoTile;