import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Breadcrumbs } from "../Common/Breadcrumb";
import Table from "../Common/Table";
import { CustomButton } from "../CustomButton";
import API, { action } from "../../Api";
import CustomSelect from "../CustomSelect";
import { TimingSelector } from "../TimingSelector";

const CreateTasks = ({ isOpen, onClose, onSubmit, options, isData }) => {
  const validationSchema = Yup.object({
    task_name: Yup.string().required("Task name is required"),
    description: Yup.string(),
    // duration: Yup.number()
    //   .positive("Duration must be positive")
    //   .required("Duration is required"),
    // dependencies: Yup.array(),
  });

  const initialValues = {
    task_name: "",
    description: "",
    duration: 1,
    dependencies: [],
    timing: "1 hours before",
    type: 1,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  useEffect(() => {
    formik.setFieldValue("task_name", isData?.name);
    formik.setFieldValue("description", isData?.description);
    formik.setFieldValue("duration", isData?.duration);
    formik.setFieldValue("dependencies", isData?.dependencies);
    formik.setFieldValue("timing", isData?.timing);
    formik.setFieldValue("type", isData?.status == "public" ? 1 : 2);
  }, [isData]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={() => {
            onClose();
            formik.resetForm();
            formik.setFieldValue("dependencies", []);
          }}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-center p-2">
          <div className="w-16 h-1 bg-gray-300 rounded"></div>
        </div>

        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-lg font-semibold">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="task_name"
                className="block text-sm font-medium text-gray-700"
              >
                Task Name
              </label>
              <input
                type="text"
                id="task_name"
                name="task_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.task_name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.task_name && formik.errors.task_name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.task_name}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration (hours)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.duration}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.duration && formik.errors.duration ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.duration}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="dependencies"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dependencies
              </label>
              <CustomSelect
                options={options}
                name="dependencies"
                placeholder="Select dependencies"
                value={formik.values.dependencies}
                onChange={(selectedValue) =>
                  formik.setFieldValue("dependencies", selectedValue)
                }
              />
              {formik.touched.dependencies && formik.errors.dependencies ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.dependencies}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="timing"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Timing
              </label>
              <TimingSelector
                value={formik.values.timing}
                onChange={(newTiming) =>
                  formik.setFieldValue("timing", newTiming)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Type
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={1}
                    checked={formik.values.type === 1}
                    onChange={() => formik.setFieldValue("type", 1)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Global Task</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={2}
                    checked={formik.values.type === 2}
                    onChange={() => formik.setFieldValue("type", 2)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Private Task</span>
                </label>
              </div>
              {formik.touched.type && formik.errors.type ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.type}
                </div>
              ) : null}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  formik.resetForm();
                }}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTasks;
