import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserApi } from "../services/apiService";

const UserForm = ({ loadUser }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreateUser = async () => {
    const res = await createUserApi(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "create user",
        description: "ok",
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "error create user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setEmail("");
    setFullName("");
    setPassword("");
    setPhone("");
  };
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
        onOk={handleCreateUser}
        onCancel={() => resetAndCloseModal(false)}
        okText="Create"
      >
        <div>
          <label>Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label>Fullname</label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter fullName"
          />
        </div>
        <div>
          <label>phone</label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone"
          />
        </div>
        <div>
          <label>Password</label>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserForm;
