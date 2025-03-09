import React, { useEffect, useState } from "react";
import { Navbar } from "../navigation/Navbar";
import { HomeIndex } from "../dashboard/HomeIndex";
import { Index } from "../auth/Index";
import { Navigate, Route, Routes } from "react-router-dom";
import Task from "../dashboard/Task";
import AllEvents from "../dashboard/AllEvent";

const AuthenticatedLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      {/* <Sidebar /> */}
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
};

export const AppRoute = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("isAuth"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(!!localStorage.getItem("isAuth"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const authRoutes = [
    { path: "/home", component: <HomeIndex /> },
    { path: "/view_Task", component: <Task /> },
    { path: "/view_Event", component: <AllEvents /> },
    // { path: "/profile", component: <Profile /> },
  ];

  return (
    <div>
      <Routes>
        {/* Login Page Route */}
        <Route
          path="/"
          element={isAuth ? <Navigate to="/home" /> : <Index setIsAuth={setIsAuth} />}
        />

        {/* Authenticated Routes with Layout */}
        {authRoutes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={
              isAuth ? (
                <AuthenticatedLayout>{component}</AuthenticatedLayout>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        ))}

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={isAuth ? "/home" : "/"} />} />
      </Routes>
    </div>
  );
};
