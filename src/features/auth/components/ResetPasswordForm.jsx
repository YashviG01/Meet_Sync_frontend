import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams } from
"react-router-dom";
import AuthCard from "../../shared/components/AuthCard";
import PasswordInput from "../../shared/components/PasswordInput";
import Button from "../../shared/components/Button";
  import { useNavigate } from "react-router-dom";
import useResetPassword from "../hooks/useResetPassword"
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import PasswordRules from "./PasswordRules";
import { Link } from "react-router-dom";

const ResetPasswordForm = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
const navigate = useNavigate();
const {
    updatePassword,
    loading,
  }=useResetPassword();

  const { token } =
  useParams();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
  e
) => {
  e.preventDefault();
console.log("new pwd forming")
  if (
    form.password !==
    form.confirmPassword
  ) {
    return;
  }

  const result =
    await updatePassword(
      token,
      form.password
    );

  if (result.success) {
    navigate("/login");
  }
};

  return (
    <AuthCard>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          Secure Your Account
        </h1>

        <p className="text-gray-500 text-sm">
          Create a strong password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <PasswordInput
            label="New Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <PasswordStrengthMeter
            password={form.password}
          />
        </div>

        <div>
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {form.confirmPassword &&
            form.password !==
              form.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match
              </p>
            )}
        </div>

        <PasswordRules
          password={form.password}
        />

     <Button  type="submit "
        disabled={loading}>
{loading
      ? "resetting..."
      : "Create New Password"}



        </Button>




      </form>

      <div className="text-center mt-5">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500"
        >
          <ArrowLeft size={14} />
          Back To Login
        </Link>
      </div>
    </AuthCard>
  );
};

export default ResetPasswordForm;