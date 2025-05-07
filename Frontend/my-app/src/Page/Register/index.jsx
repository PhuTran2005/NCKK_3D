import React, { useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { Form, Input, Button, Checkbox, message, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Register.scss"; // Nhớ tạo file CSS này

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    if (values.password === values.confirmPassword) {
      try {
        let name = values.username;
        let pw = values.password;

        const response = await fetch(
          "https://version-web-3d-64-5.onrender.com/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ loginName: name, password: pw }),
          }
        );
        const res = await response.json();
        console.log(res);

        notification.success({
          message: "Đăng ký thành công",
          description: "Bạn đã đăng kí thành công!",
          duration: 2, // thời gian hiện thông báo (giây)
        });
      } catch {
        notification.error({
          message: "Đăng ký thất bại",
          description: "Bạn đã đăng kí không thành công!",
          duration: 2, // thời gian hiện thông báo (giây)
        });
      }
    } else {
      notification.error({
        message: "Mật khẩu và xác nhận mật khẩu không khớp!",
        description: "Mật khẩu và xác nhận mật khẩu không khớp!!",
        duration: 2, // thời gian hiện thông báo (giây)
      });
    }

    setLoading(false);
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Đăng Ký</h2>

        <Form name="register" onFinish={onFinish} layout="vertical">
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

          <Form.Item name="agree" valuePropName="checked">
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
