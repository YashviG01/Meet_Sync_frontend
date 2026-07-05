import {
  CalendarDays,
  Clock3,
  FileText,
  Type,
} from "lucide-react";

const ScheduleMeetingForm = ({
  register,
  handleSubmit,
  errors,
  loading,
  onSubmit,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">

      {/* Header */}

      <div className="border-b border-gray-100 px-8 py-6">

        <h1 className="text-3xl font-bold text-gray-900">
          Schedule a Meeting
        </h1>

        <p className="text-gray-500 mt-2">
          Plan meetings ahead of time and share the meeting link with your participants.
        </p>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-7"
      >

        {/* -------------------- Title -------------------- */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

            <Type size={18} className="text-indigo-500" />

            Meeting Title

          </label>

          <input
            type="text"
            placeholder="Weekly Team Sync"

            {...register("title", {
              required: "Meeting title is required",
            })}

            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-2">
              {errors.title.message}
            </p>
          )}

        </div>

        {/* ---------------- Description ---------------- */}

        <div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

            <FileText
              size={18}
              className="text-indigo-500"
            />

            Description

          </label>

          <textarea

            rows={5}

            placeholder="Agenda or meeting notes..."

            {...register("description")}

            className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"

          />

        </div>

        {/* ---------------- Date Time ---------------- */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* Start */}

          <div>

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

              <CalendarDays
                size={18}
                className="text-indigo-500"
              />

              Start Time

            </label>

            <input

              type="datetime-local"

              {...register("startTime", {
                required: "Start time is required",
              })}

              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"

            />

            {errors.startTime && (
              <p className="text-red-500 text-sm mt-2">
                {errors.startTime.message}
              </p>
            )}

          </div>

          {/* End */}

          <div>

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

              <Clock3
                size={18}
                className="text-indigo-500"
              />

              End Time

            </label>

            <input

              type="datetime-local"

              {...register("endTime", {
                required: "End time is required",
              })}

              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"

            />

            {errors.endTime && (
              <p className="text-red-500 text-sm mt-2">
                {errors.endTime.message}
              </p>
            )}

          </div>

        </div>

        {/* ---------------- Button ---------------- */}

        <div className="pt-2">

          <button

            disabled={loading}

            className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all text-white py-3 rounded-lg font-semibold disabled:opacity-60"

          >

            {loading
              ? "Scheduling..."
              : "Schedule Meeting"}

          </button>

        </div>

      </form>

    </div>
  );
};

export default ScheduleMeetingForm;