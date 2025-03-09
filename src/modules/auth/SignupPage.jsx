// SignupPage.jsx
import React, { useState } from "react";

import { CustomCard } from "../../components/CustomCard";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";

const SignupPage = ({setCurrentPage}) => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // State for signup status/message
  const [signupStatus, setSignupStatus] = useState({
    type: "",
    message: "",
    show: false,
  });

  // State for loading status
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Validate password confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);

        // For demo purposes, check for existing email
        if (formData.email === "demo@example.com") {
          setSignupStatus({
            type: "error",
            message: "Email is already registered",
            show: true,
          });
        } else {
          setSignupStatus({
            type: "success",
            message: "Account created successfully! Redirecting to login...",
            show: true,
          });

          // Simulate redirect after successful signup
          setTimeout(() => {
            // Redirect code would go here
            console.log("Redirecting to login page...");
          }, 2000);
        }
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <CustomCard>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            <CustomInput
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <CustomInput
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <CustomInput
              label="Password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <CustomInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <CustomButton
              variant="primary"
              size="lg"
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full"
            >
              Create Account
            </CustomButton>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                onClick={()=>{setCurrentPage("login")}}
                className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Sign in
              </a>
            </p>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};

export default SignupPage;
