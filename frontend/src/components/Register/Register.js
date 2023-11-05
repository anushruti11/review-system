import React from "react";
import RegisterContent from "./RegisterContent";
import Header from "../Header/Header";
import AuthContainer from "../AuthContainer/AuthContainer";

export default function Register() {
  return (
    <>
      <Header onPage="register" />
      <AuthContainer>
        <RegisterContent />
      </AuthContainer>
    </>
  );
}
