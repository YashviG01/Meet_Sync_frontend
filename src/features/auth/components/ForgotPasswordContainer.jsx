import { useState } from "react";

import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";

const ForgotPasswordContainer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email) {
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
    />
  );
};

export default ForgotPasswordContainer;