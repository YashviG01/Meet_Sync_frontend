import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CalendarDays,
  Clock3,
  Copy,
  Check,
  Link,
  Home,
  Plus,
} from "lucide-react";

const ScheduleSuccess = ({
  meeting,
  copyMeetingLink,
  copyMeetingId,
  goToDashboard,
  scheduleAnother,
}) => {
    console.log(meeting.meeting)
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!copiedId) return;

    const timer = setTimeout(() => {
      setCopiedId(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [copiedId]);

  useEffect(() => {
    if (!copiedLink) return;

    const timer = setTimeout(() => {
      setCopiedLink(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [copiedLink]);

  const meetingId =
    meeting?.joinLink
      ?.replace(/\/$/, "")
      ?.split("/")
      ?.pop() || "";

  const handleCopyId = async () => {
    await copyMeetingId();
    setCopiedId(true);
  };

  const handleCopyLink = async () => {
    await copyMeetingLink();
    setCopiedLink(true);
  };

//   const formattedDate = meeting?.startTime
//     ? new Date(meeting.startTime).toLocaleDateString(
//         "en-IN",
//         {
//           weekday: "long",
//           day: "numeric",
//           month: "long",
//           year: "numeric",
//         }
//       )
//     : "";

//   const formattedStart = meeting?.startTime
//     ? new Date(meeting.startTime).toLocaleTimeString(
//         "en-IN",
//         {
//           hour: "numeric",
//           minute: "2-digit",
//         }
//       )
//     : "";

//   const formattedEnd = meeting?.endTime
//     ? new Date(meeting.endTime).toLocaleTimeString(
//         "en-IN",
//         {
//           hour: "numeric",
//           minute: "2-digit",
//         }
//       )
//     : "";

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      initial={{
        opacity: 0,
        scale: 0.92,
        y: 25,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 230,
        damping: 18,
      }}
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-10 py-9">

        <motion.div
          initial={{
            scale: 0,
            rotate: -180,
          }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 15,
          }}
          className="w-fit mx-auto"
        >
          <CheckCircle2
            size={72}
            className="drop-shadow-lg"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mt-5"
        >
          Meeting Scheduled!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ delay: 0.35 }}
          className="text-center mt-3 text-indigo-100"
        >
          Your meeting is ready.
          Share the meeting ID or invite link
          with your participants.
        </motion.p>
      </div>

      {/* Body */}

      <div className="p-8 space-y-7">

        {/* Meeting Summary */}

        {/* <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

          <h3 className="text-lg font-semibold text-gray-800 mb-5">
            Meeting Summary
          </h3>

          <div className="grid gap-5">

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Title
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {meeting.title}
              </p>
            </div>

            {meeting.description && (
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Description
                </p>

                <p className="text-gray-700 mt-1">
                  {meeting.description}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">

              <div className="flex items-start gap-3">

                <CalendarDays
                  className="text-indigo-500 mt-1"
                  size={20}
                />

                <div>

                  <p className="text-xs uppercase text-gray-500">
                    Date
                  </p>

                  <p className="font-medium mt-1">
                    {formattedDate}
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-3">

                <Clock3
                  className="text-indigo-500 mt-1"
                  size={20}
                />

                <div>

                  <p className="text-xs uppercase text-gray-500">
                    Time
                  </p>

                  <p className="font-medium mt-1">
                    {formattedStart} — {formattedEnd}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div> */}

        
                {/* Meeting ID */}

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-xs uppercase tracking-wide text-indigo-600 font-semibold">
                Meeting ID
              </p>

              <p className="text-2xl font-bold tracking-wider text-gray-900 mt-2 break-all">
                {meetingId}
              </p>

            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyId}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all ${
                copiedId
                  ? "bg-green-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {copiedId ? (
                <>
                  <Check size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy ID
                </>
              )}
            </motion.button>

          </div>

        </div>

        {/* Invite Link */}

        <div className="rounded-2xl border border-gray-200 p-6">

          <div className="flex items-center justify-between gap-5">

            <div className="flex items-start gap-3">

              <Link
                className="text-indigo-600 mt-1"
                size={20}
              />

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Invite Link
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  Share this meeting link with participants.
                </p>

              </div>

            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all ${
                copiedLink
                  ? "bg-green-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {copiedLink ? (
                <>
                  <Check size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Link
                </>
              )}
            </motion.button>

          </div>

        </div>

        {/* Footer Buttons */}

        <div className="grid grid-cols-2 gap-4 pt-2">

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={scheduleAnother}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white py-3 font-semibold hover:bg-indigo-700 transition"
          >
            <Plus size={18} />
            Schedule Another
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={goToDashboard}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            <Home size={18} />
            Dashboard
          </motion.button>

        </div>

      </div>

    </motion.div>
  );
};

export default ScheduleSuccess;