import React from "react";
import "./AuthContainer.css";

export default function AuthContainer({ children }) {
  return (
    <div className="flex-container">
      <div className="container">{children}</div>
    </div>
  );
}
