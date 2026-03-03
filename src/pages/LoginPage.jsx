import { Button, Checkbox, Flex, Form, Input, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { loginUserApi } from "../services/apiService";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleLogin = async (value) => {
    setIsLoading(true);
    const res = await loginUserApi(value.email, value.password);
    if (res.data) {
      notification.success({
        message: "Login user",
        description: "OK",
      });
      const userLogin = res.data.userLogin;

      localStorage.setItem("accessToken", res.data.accessToken);
      setUser({
        id: userLogin.id,
        email: userLogin.email,
        fullName: userLogin.fullname,
        role: {
          name: userLogin.role?.name,
        },
      });
      navigate("/users");
    } else {
      notification.error({
        message: "Login user",
        description: res.message,
      });
    }
    setIsLoading(false);
  };
  const onFinish = (value) => {
    handleLogin(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360, margin: "auto" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                form.submit;
              }
            }}
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} block type="primary" htmlType="submit">
            Log in
          </Button>
          or <Link to="/register">Register now</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
