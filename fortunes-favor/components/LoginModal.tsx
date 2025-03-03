"use client";
import React, { ReactNode, useState } from "react";
import LoginForm from "./blocks/LoginForm";

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") === null,
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  const handLeLogin = () => {
    setIsAuthenticated(true);
    setIsOpen(false);
  };
  if (!isAuthenticated)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Login</button>
        {isOpen && (
          <LoginForm
            setIsOpen={setIsOpen}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
      </>
    );
  else return <button onClick={handleLogout}>Logout</button>;
};

export default LoginModal;
