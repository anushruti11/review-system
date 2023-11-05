import React, { useEffect } from "react";
import "./Home.css";
import HomeContent from "./HomeContent";
import AuthContainer from "../AuthContainer/AuthContainer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) navigate("/breweries");
  }, []);
  return (
    <AuthContainer>
      <HomeContent />
    </AuthContainer>
  );
}
