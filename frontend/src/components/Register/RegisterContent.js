import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Input, Button } from "antd";
import "./Register.css";
import config from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export default function RegisterContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const [key, value] = [event.target.name, event.target.value];
    setFormData((formData) => ({ ...formData, [key]: value }));
  };

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post(
        `${config.backendEndpoint}/auth/register`,
        {
          username: formData.username,
          userId: Math.floor(1000000 + Math.random() * 9000000),
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response);
      enqueueSnackbar("Login Successfull", { variant: "success" });
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        enqueueSnackbar("User already Exists", { variant: "warning" });
      } else {
        enqueueSnackbar("Something wrong with backend", { variant: "error" });
      }
    }
  };

  return (
    <>
      <SnackbarProvider />
      <h1>Make an Account</h1>
      <Input
        size="large"
        name="username"
        placeholder="username"
        prefix={<UserOutlined />}
        onChange={handleChange}
      />
      <br />
      <br />
      <Input
        size="large"
        name="email"
        placeholder="email"
        prefix={<MailOutlined />}
        onChange={handleChange}
      />
      <br />
      <br />
      <Input.Password
        size="large"
        name="password"
        placeholder="input password"
        prefix={<LockOutlined />}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        onChange={handleChange}
      />
      <br />
      <br />
      <Input.Password
        size="large"
        name="confirmPassword"
        placeholder="confirm password"
        prefix={<LockOutlined />}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        onChange={handleChange}
      />
      <Button
        className="auth-btn btn"
        type="primary"
        onClick={() => handleRegister(formData)}
      >
        Register
      </Button>
    </>
  );
}
