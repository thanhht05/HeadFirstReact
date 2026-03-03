import { Button, Checkbox, Form, Input, notification } from "antd";
import { registerUserApi } from "../services/apiService";
import { Navigate, useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();

  const registerUser = async (value) => {
    const { email, fullName, password, phone } = value;

    const res = await registerUserApi(fullName, email, password, phone);

    if (res.data) {
      notification.success({
        message: "Register user",
        description: "ok",
      });
      navigate("/users");
    } else {
      notification.error({
        message: "error create user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const onFinish = (value) => {
    registerUser(value);
  };
  return (
    <div style={{ padding: "12px", marginTop: "20px" }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="fullName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              pattern: new RegExp(/\d+/g),
              message: "Invalid phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterPage;
