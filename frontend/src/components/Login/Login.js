import React, { useEffect } from "react";
import AuthContainer from "../AuthContainer/AuthContainer";
import LoginContent from "./LoginContent";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) navigate("/breweries");
  }, []);
  return (
    <>
      <Header onPage="login" />
      <AuthContainer>
        <LoginContent />
      </AuthContainer>
    </>
  );
}
