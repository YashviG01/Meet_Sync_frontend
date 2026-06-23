import { useState } from "react";

import Input from "../../shared/components/Input";
import PasswordInput from "../../shared/components/PasswordInput";
import Checkbox from "../../shared/components/Checkbox";
import Button from "../../shared/components/Button";
import AuthCard from "../../shared/components/AuthCard";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [remember, setRemember] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthCard>
      <div className="text-center mb-7">
        <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-sm">
          Log in to your MeetSync account.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="name@company.com"
        />

        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <div className="flex justify-end">
          <Link
            to="/forgotPassword"
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Forgot Password?
          </Link>
        </div>

        <Checkbox
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          label="Remember this device"
        />

        <Button type="submit">
          Sign In To MeetSync
        </Button>
      </div>
    </AuthCard>
  );
};

export default LoginForm;