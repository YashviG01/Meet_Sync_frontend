import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

import AuthCard from "../../shared/components/AuthCard";

const ForgotPasswordSuccess = ({
  email,
  onTryAgain,
}) => {
  return (
    <AuthCard>
      <div className="text-center py-4">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle
              size={30}
              className="text-green-500"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Check your email
        </h2>

        <p className="text-gray-500 text-sm">
          We've sent a password reset link to
        </p>

        <p className="text-indigo-600 font-medium mt-2">
          {email}
        </p>

        <p className="text-gray-400 text-xs mt-6">
          Didn't receive the email?
          <button
            onClick={onTryAgain}
            className="ml-1 text-indigo-600 hover:underline"
          >
            Try Again
          </button>
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 mt-6 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={14} />
          Back To Login
        </Link>
      </div>
    </AuthCard>
  );
};

export default ForgotPasswordSuccess;