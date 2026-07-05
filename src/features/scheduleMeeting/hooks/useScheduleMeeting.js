// features/scheduling/hooks/useScheduleMeeting.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {scheduleMeetingApi} from "../api/scheduleMeetingApi";

const useScheduleMeeting = () => {
  const navigate = useNavigate();

  // -------------------------
  // Success Modal State
  // -------------------------

  const [success, setSuccess] = useState(false);

  const [meeting, setMeeting] = useState(null);

  const [loading, setLoading] = useState(false);

  // -------------------------
  // React Hook Form
  // -------------------------

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
    },
  });

  // -------------------------
  // Submit
  // -------------------------

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response =
        await scheduleMeetingApi(data);

      setMeeting(response);

      setSuccess(true);

      toast.success("Meeting scheduled successfully!");

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
          "Unable to schedule meeting."
      );

    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Copy Meeting Link
  // -------------------------

  const copyMeetingLink = async () => {
    try {

      await navigator.clipboard.writeText(
        meeting.joinLink
      );

      toast.success("Meeting link copied");

    } catch {

      toast.error("Unable to copy link");

    }
  };

  // -------------------------
  // Copy Meeting ID
  // -------------------------

  const copyMeetingId = async () => {
    try {

      const meetingId =
        meeting.joinLink
          .replace(/\/$/, "")
          .split("/")
          .pop();

      await navigator.clipboard.writeText(
        meetingId
      );

      toast.success("Meeting ID copied");

    } catch {

      toast.error("Unable to copy Meeting ID");

    }
  };

  // -------------------------
  // Dashboard
  // -------------------------

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  // -------------------------
  // Schedule Another
  // -------------------------

  const scheduleAnother = () => {
    reset();

    setMeeting(null);

    setSuccess(false);
  };

  return {
    register,
    handleSubmit,
    errors,

    loading,

    success,
    meeting,

    onSubmit,

    copyMeetingLink,
    copyMeetingId,

    goToDashboard,
    scheduleAnother,
  };
};

export default useScheduleMeeting;