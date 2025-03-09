import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export const Index = ({ setIsAuth }) => {
  const [currentPage, setCurrentPage] = useState("login");
  return (
    <div>
      {currentPage == "login" ? (
        <LoginPage setIsAuth={setIsAuth} setCurrentPage={setCurrentPage} />
      ) : (
        <SignupPage setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};
