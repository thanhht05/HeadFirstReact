import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm } from "antd";
import { deleteProductById } from "../services/apiService";

const DeleteBookPopup = ({ deleteBookData, loadProduct }) => {
  const [messageApi, holder] = message.useMessage();
  const confirm = async () => {
    const res = await deleteProductById(deleteBookData);
    if (res.data) {
      notification.success({
        message: "Delete product",
        description: "ok",
      });
      await loadProduct();
    } else {
      notification.error({
        message: "Error delete",
        description: "error",
      });
    }
  };
  const cancel = (e) => {
    console.log(e);
    messageApi.error("Click on No");
  };
  return (
    <>
      {holder}
      <Popconfirm
        title="Delete the product"
        description="Are you sure to delete this product?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined />
      </Popconfirm>
    </>
  );
};
export default DeleteBookPopup;
