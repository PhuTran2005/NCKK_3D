import React, { useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm(); // 1. Khởi tạo form instance
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    if (values.password === values.confirmPassword) {
      try {
        const { username, password } = values;

        const response = await fetch(
          "https://version-web-3d-64-5.onrender.com/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ loginName: username, password }),
          }
        );
        const data = await response.json();
        console.log(data);

        if (data.code === 200) {
          notification.success({
            message: data.message,
            description: data.message,
            duration: 2,
          });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else if (data.code === 400) {
          // 2. Set lỗi cho field username
          form.setFields([
            {
              name: "username",
              errors: ["Tên tài khoản đã tồn tại"],
            },
          ]);
        } else {
          notification.error({
            message: "Đăng ký thất bại",
            description: data.message || "Đã xảy ra lỗi.",
          });
        }
      } catch (err) {
        notification.error({
          message: err,
          description: err,
          duration: 2,
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Đăng Ký</h2>

        <Form form={form} name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
              { min: 6, message: "Username phải có độ dài ít nhất 6 kí tự" },
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
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có độ dài ít nhất 6 kí tự" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu và xác nhận mật khẩu không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Bạn phải đồng ý với điều khoản sử dụng!")
                      ),
              },
            ]}
          >
            <Checkbox>
              Tôi đồng ý với <a href="/terms">Điều khoản sử dụng</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>

        <div className="register-footer">
          <p>
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
