import React, { useCallback } from "react";
import "./Header.css";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Header = ({ onPage, searchData, setSearchData }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderButtons = useCallback(() => {
    const buttons = [];
    if (onPage !== "breweries") {
      buttons.push(
        <Button
          key="home-btn"
          className="home-btn btn"
          type="link"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      );
    }

    if (onPage === "login") {
      buttons.push(
        <Button
          key="register-btn"
          className="register-btn btn"
          type="primary"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      );
    }

    if (onPage === "register") {
      buttons.push(
        <Button
          key="login-btn"
          className="register-btn btn"
          type="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      );
    }

    if (onPage === "breweries") {
      buttons.push(
        <Button
          key="logout-btn"
          className="register-btn btn"
          type="primary"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      );
    }

    return buttons;
  }, [onPage]);

  return (
    <header>
      <div className="logo">
        <a href="/">Brewery</a>
      </div>
      {onPage === "breweries" ? (
        <SearchBar searchData={searchData} setSearchData={setSearchData} />
      ) : null}
      <div className="nav-buttons">{renderButtons()}</div>
    </header>
  );
};

export default Header;
