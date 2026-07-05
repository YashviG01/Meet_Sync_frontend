import { AnimatePresence, motion } from "framer-motion";

import ScheduleMeetingForm from "./ScheduleMeetingForm";
import ScheduleSuccess from "./ScheduleSuccess";

const ScheduleMeetingLayout = ({
  success,
  meeting,

  register,
  handleSubmit,
  errors,
  loading,
  onSubmit,

  copyMeetingLink,
  copyMeetingId,

  goToDashboard,
  scheduleAnother,
}) => {
  return (
    <div className="relative min-h-screen bg-gray-50 py-14 px-4 flex items-center justify-center overflow-hidden">

      {/* ---------------- Form ---------------- */}

      <motion.div
        animate={{
          scale: success ? 0.98 : 1,
          filter: success ? "blur(5px)" : "blur(0px)",
        }}
        transition={{
          duration: 0.25,
        }}
        className="w-full max-w-3xl"
      >
        <ScheduleMeetingForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          loading={loading}
          onSubmit={onSubmit}
        />
      </motion.div>

      {/* -------------- Success Modal -------------- */}

      <AnimatePresence>

        {success && (

          <motion.div

            className="fixed inset-0 z-50 flex items-center justify-center"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

          >

            {/* Backdrop */}

            <motion.div

              className="absolute inset-0 bg-black/35 backdrop-blur-sm"

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              exit={{ opacity: 0 }}

            />

            {/* Modal */}

            <motion.div

              initial={{
                opacity: 0,
                y: 40,
                scale: 0.9,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: 30,
                scale: 0.95,
              }}

              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}

              className="relative z-10 w-full max-w-xl px-4"

            >

              <ScheduleSuccess

                meeting={meeting}

                copyMeetingLink={copyMeetingLink}

                copyMeetingId={copyMeetingId}

                goToDashboard={goToDashboard}

                scheduleAnother={scheduleAnother}

              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default ScheduleMeetingLayout;