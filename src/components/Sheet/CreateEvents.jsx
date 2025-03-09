import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Breadcrumbs } from "../Common/Breadcrumb";
import Table from "../Common/Table";
import { CustomButton } from "../CustomButton";
import API, { action } from "../../Api";

// Drawer Sheet Form Component
const CreateEvents = ({ isOpen, onClose, onSubmit }) => {
  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    // date: Yup.date().required('Start date is required'),
  });

  // Initial form values
  const initialValues = {
    name: "",
    description: "",
    date: "",
  };

  // Handle ESC key press to close modal
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
      {/* Drawer sheet overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer sheet */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Handle/Drag indicator */}
        <div className="flex justify-center p-2">
          <div className="w-16 h-1 bg-gray-300 rounded"></div>
        </div>

        {/* Form header */}
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

        {/* Form content */}
        <div className="p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              onSubmit(values);
              resetForm();
              onClose();
            }}
          >
            {({ isSubmitting, dirty, isValid, values, setFieldValue,resetForm }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows="4"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <Field name="date">
                    {({ field, form }) => (
                      <input
                        {...field}
                        type="date"
                        id="date"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          form.setFieldValue("date", e.target.value)
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      resetForm();
                    }}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !dirty || !isValid}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Task
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
export default CreateEvents;
