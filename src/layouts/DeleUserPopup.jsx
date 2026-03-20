import { Button, message, notification, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteUserByIdApi } from "../services/apiService";
import { useDispatch } from "react-redux";
import { deleteUserRedux } from "../redux/action/actions";

const DeleUserPopup = ({ userDataDelete }) => {
  const dispatch = useDispatch();
  const [messageApi, holder] = message.useMessage();
  const confirm = () => {
    dispatch(deleteUserRedux(userDataDelete));
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
