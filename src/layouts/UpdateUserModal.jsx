import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { createUserApi, updateUserApi } from "../services/apiService";

const UpdateUserModal = ({
  isModalUpdateOpen,
  serIsModalUpdateOpen,
  userDataUpdate,
  setUserDataUpdate,
  loadUser,
}) => {
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (userDataUpdate) {
      setId(userDataUpdate.id);
      setFullName(userDataUpdate.fullName);
      setPhone(userDataUpdate.phone);
    }
  }, [userDataUpdate]);
  const handleUpdateUser = async () => {
    const res = await updateUserApi(id, fullName, phone);
    console.log(res);
    if (res.data) {
      notification.success({
        message: "Update user",
        description: "ok",
      });
      await loadUser();
      resetAndCloseModal();
      //   await loadUser();
    } else {
      notification.error({
        message: "error update user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const resetAndCloseModal = () => {
    serIsModalUpdateOpen(false);
    setFullName("");
    setPhone("");
    setId("");
    setUserDataUpdate(null);
  };
  return (
    <Modal
      title="Update user"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalUpdateOpen}
      onOk={handleUpdateUser}
      onCancel={() => resetAndCloseModal(false)}
      okText="Update"
    >
      <div>
        <label>Id</label>
        <Input value={id} disabled />
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
    </Modal>
  );
};
export default UpdateUserModal;
