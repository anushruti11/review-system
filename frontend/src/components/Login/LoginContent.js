import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Input, Button } from "antd";
import axios from "axios";
import "./Login.css";
import config from "../../config";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export default function LoginContent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const [key, value] = [event.target.name, event.target.value];
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const persistLogin = (userData) => {
    localStorage.setItem("username", userData.username);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("userId", userData.userId);
  };

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        `${config.backendEndpoint}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      persistLogin(response.data.user);
      navigate("/breweries");
    } catch (err) {
      enqueueSnackbar("Something went wrong. Check console to find out", {
        variant: "error",
      });
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <SnackbarProvider />
      <h1>Login to Brewery</h1>
      <Input
        size="large"
        placeholder="email"
        prefix={<UserOutlined />}
        name="email"
        onChange={handleChange}
      />
      <br />
      <br />
      <Input.Password
        size="large"
        placeholder="input password"
        prefix={<LockOutlined />}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        name="password"
        onChange={handleChange}
      />
      <Button
        className="btn auth-btn"
        type="primary"
        onClick={() => handleLogin(formData)}
      >
        LOGIN
      </Button>
    </>
  );
}
