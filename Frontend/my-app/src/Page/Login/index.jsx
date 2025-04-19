import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Features/Auth/authSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const usename = values.username;
      const password = values.password;

      const response = await fetch(
        "https://version-web-3d-64-5.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginName: usename,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    dispatch(loginSuccess(values));

    setLoading(false);
  };

  return (
    <div
      className="login-container"
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "50px 20px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Đăng Nhập</h2>

      <Form
        name="login"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Tên tài khoản"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <a href="/forgot-password">Quên mật khẩu?</a> |{" "}
        <a href="/signup">Đăng ký</a>
      </div>
    </div>
  );
};

export default Login;
