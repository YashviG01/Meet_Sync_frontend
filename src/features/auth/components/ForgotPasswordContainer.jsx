import { useState } from "react";
import useForgotPassword
from "../hooks/useForgotPassword";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";

const ForgotPasswordContainer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
const {
  sendResetLink,
  loading,
} = useForgotPassword();
 const handleSubmit = async (
  e
) => {
  e.preventDefault();
console.log("send reset link clicked");
  const result =
    await sendResetLink(email);

  if (result.success) {
    setSubmitted(true);
  }
};

  if (submitted) {
    return (
      <ForgotPasswordSuccess
        email={email}
        onTryAgain={() => setSubmitted(false)}
      />
    );
  }

  return (
    <ForgotPasswordForm
      email={email}
      setEmail={setEmail}
      onSubmit={handleSubmit}
 loading={loading}


    />
  );
};

export default ForgotPasswordContainer;