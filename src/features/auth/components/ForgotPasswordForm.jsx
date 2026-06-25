import { Mail, ArrowLeft } from "lucide-react";

import AuthCard from "../../shared/components/AuthCard";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import { Link } from "react-router-dom";

const ForgotPasswordForm = ({
  email,
  setEmail,
  onSubmit,
  loading
}) => {






  return (
    <AuthCard>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
          <Mail size={28} className="text-indigo-500" />
        </div>
      </div>

      <div className="text-center mb-7">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Forgot your password?
        </h1>

        <p className="text-gray-500 text-sm">
          No worries. Enter your email address and we'll send you a reset link.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />

        <Button  type="submit "
        disabled={loading}>
{loading
      ? "Sending..."
      : "Send Reset Link"}



        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={14} />
          Back To Login
        </Link>
      </div>
    </AuthCard>
  );
};

export default ForgotPasswordForm;