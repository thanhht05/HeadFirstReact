import { Button, Input, notification, Modal, Form } from "antd";
import { useEffect, useState } from "react";
import { createUserApi } from "../../services/apiService";
import { createUserRedux } from "../../redux/action/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";

const UserForm = ({ loadUser }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreateUser = (values) => {
    const { fullName, email, password, phone } = values;
    dispatch(createUserRedux(fullName, email, password, phone));
  };
  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    // setEmail("");
    // setFullName("");
    // setPassword("");
    // setPhone("");
  };
  const isCreated = useSelector((state) => state.user.isCreated);
  const isErrorCreateUser = useSelector(
    (state) => state.user.isErrorCreateUser,
  );

  console.log("isErorr", isErrorCreateUser);
  console.log("isCreate", isCreated);
  useEffect(() => {
    if (isCreated) {
      notification.success({
        message: "Success",
        description: "User created successfully!",
      });

      resetAndCloseModal();

      // dispatch({ type: RESET_CREATE_USER });
    }
  }, [isCreated]);

  useEffect(() => {
    if (isErrorCreateUser) {
      notification.error({
        message: "Error",
        description: "Create user failed!",
      });
    }
  }, [isErrorCreateUser]);
  return (
    <div style={{ padding: "10px" }}>
      <div style={{ textAlign: "right" }}>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Create
        </Button>
      </div>

      <Modal
        title="Create user"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={true}
        onCancel={() => resetAndCloseModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateUser}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input emai!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="FulName"
            name="fullName"
            rules={[{ required: true, message: "Please input fullName !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input phone !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password !" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              style={{ marginTop: "20px" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserForm;
