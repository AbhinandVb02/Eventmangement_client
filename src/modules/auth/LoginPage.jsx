// LoginPage.jsx
import React, { useState } from "react";
import { CustomCard } from "../../components/CustomCard";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import API, { action } from "../../Api";
import * as Yup from "yup";

const LoginPage = ({ setIsAuth, setCurrentPage }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
    .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const result = await action(API.LOGIN, {
          email: values.email,
          password: values.password,
        });

        if (result.message === "Login successful") {
          localStorage.setItem("isAuth", "true");
          setIsAuth(true);
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", result.userId);

          navigate("/home");
          window.location.reload();
        } else {
          // Handle login failure
          toast.error(result.response.message);
        }
      } catch (error) {
        // Network or unexpected errors
        toast.error(error.response.data.response.message);
        console.error("Login error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <form onSubmit={formik.handleSubmit}>
          <CustomCard>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-600 mt-2">
                Please sign in to your account
              </p>
            </div>

            <CustomInput
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={errors.email}
              required
            />

            <CustomInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={errors.password}
              required
            />

            <CustomButton
              //   variant="primary"
              size="lg"
              // onClick={handleSubmit}
              type="submit"
              className="w-full mt-4"
            >
              Sign In
            </CustomButton>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  onClick={() => {
                    setCurrentPage("signup");
                  }}
                  className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Sign up
                </a>
              </p>
            </div>
          </CustomCard>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Demo account: demo@example.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
