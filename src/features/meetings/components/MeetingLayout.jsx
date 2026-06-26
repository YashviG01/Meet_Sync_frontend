const MeetingLayout = ({
  header,
  videoGrid,
  controls,
  sidebar,
}) => {
  return (
    <div className="h-screen bg-zinc-950 text-white flex flex-col">

      {/* Header */}
      {header}

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">

        <div className="flex-1 p-5 overflow-y-auto">
          {videoGrid}
        </div>

        {sidebar && (
          <div className="w-80 border-l border-zinc-800 bg-zinc-900">
            {sidebar}
          </div>
        )}
      </div>

      {/* Bottom Controls */}

      <div className="border-t border-zinc-800 bg-zinc-950 px-6 py-4">
        {controls}
      </div>

    </div>
  );
};

export default MeetingLayout;