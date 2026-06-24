import { useState } from "react";

import Input from "../../shared/components/Input";
import PasswordInput from "../../shared/components/PasswordInput";
import Checkbox from "../../shared/components/Checkbox";
import Button from "../../shared/components/Button";
import AuthCard from "../../shared/components/AuthCard";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [agreed, setAgreed] = useState(false);

  const { signup, loading } = useSignup();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    // confirm: "",
  });
const navigate = useNavigate();

// store the data,updating the state
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!agreed) {
  alert("Accept terms first");
  return;
}
//created obj passed to the hook
  const result = await signup({
    name: form.name,
    email: form.email,
    password: form.password,
  });

  if(result.success){
      navigate("/dashboard");
  }
};
  return (
    <AuthCard>
        {/* heading */}
      <div className="text-center mb-7">
        <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
          Create your account
        </h1>

        <p className="text-gray-500 text-sm">
          Join MeetSync for premium video experiences.
        </p>
      </div>
{/* signup form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
        />

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

        {/* <PasswordInput
          label="Confirm Password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
        /> */}

        <Checkbox
          checked={agreed}
          
          onChange={(e) => setAgreed(e.target.checked)}
          label="I agree to the Terms of Service and Privacy Policy"
        />

        <Button type="submit"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </AuthCard>
  );
};

export default SignupForm;