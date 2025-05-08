import "@ant-design/v5-patch-for-react-19";
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helper/cookies";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { username, password } = values;

      const response = await fetch(
        "https://version-web-3d-64-5.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginName: username, password: password }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.code == 200) {
        setCookie("token", data.token);
        setCookie("id", data.account_id);
        dispatch(loginSuccess(values));
        notification.success({
          message: data.message,
          description: data.message,
          duration: 2, // thời gian hiện thông báo (giây)
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        notification.error({
          message: data.message,
          description: data.message,
        });
      }
    } catch (error) {
      notification.error({
        message: error,
        description: error,
      });
    }
    setLoading(false);
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          padding: "40px 30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
            ]}
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
          <p>
            Chưa có tài khoản ? <a href="/register">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
