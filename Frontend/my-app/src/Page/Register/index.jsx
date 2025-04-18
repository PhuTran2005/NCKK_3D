import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    // Giả sử bạn sẽ gửi thông tin này tới API để tạo tài khoản người dùng
    console.log("Thông tin đăng ký: ", values);

    // Mô phỏng hành động đăng ký thành công
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
        const res = response;
        console.log(res);
      } catch {
        console.log("erro");
      }
      message.success("Đăng ký thành công!");
      // Chuyển hướng hoặc redirect sau khi đăng ký thành công
    } else {
      message.error("Mật khẩu và xác nhận mật khẩu không khớp!");
    }
    setLoading(false);
  };

  return (
    <div
      className="register-container"
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "50px 20px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Đăng Ký</h2>

      <Form
        name="register"
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
          hasFeedback
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

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <p>
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
