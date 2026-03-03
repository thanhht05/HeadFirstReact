import { Button, message, notification, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteUserByIdApi } from "../services/apiService";

const DeleUserPopup = ({ userDataDelete, loadUser }) => {
  const [messageApi, holder] = message.useMessage();
  const confirm = async () => {
    const res = await deleteUserByIdApi(userDataDelete);
    if (res.data) {
      notification.success({
        message: "Delete user",
        description: "ok",
      });
      await loadUser();
    } else {
      notification.error({
        message: "Error delte user",
        description: "Error",
      });
    }
  };

  return (
    <>
      {holder}
      <Popconfirm
        title="Delete the user"
        description="Are you sure to delete this user?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined />
      </Popconfirm>
    </>
  );
};
export default DeleUserPopup;
