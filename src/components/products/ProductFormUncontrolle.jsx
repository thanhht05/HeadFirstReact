import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  notification,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { createProductAPi, uploadFileApi } from "../../services/apiService";
import { useForm } from "antd/es/form/Form";
const ProductFromUncontrolle = ({ loadProduct, page, pageSize }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);

    setPreview(undefined);
    setSelectedFile(undefined);
  };
  const onFinish = async (values) => {
    const resUpload = await uploadFileApi(selectedFile);
    const fileName = resUpload.data.fileName;
    const { name, price, quantity, category, description } = values;
    const res = await createProductAPi(
      name,
      price,
      quantity,
      fileName,
      category,
      description,
    );
    if (res.data) {
      notification.success({
        message: "Crate product",
        description: "OK",
      });
      await loadProduct(page, pageSize);
    }
    form.resetFields();
    setPreview(undefined);
    setSelectedFile(undefined);
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Button type="primary" onClick={showModal}>
          Create
        </Button>
      </div>
      <Modal
        title="Create book"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={true}
        onCancel={handleCancel}
        footer={null}
      >
        <>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input product name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please input quantity!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input price!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              hasFeedback
              rules={[{ required: true, message: "Please select category!" }]}
            >
              <Select
                placeholder="Please select a category"
                options={[
                  { label: "Beverages", value: "Beverages" },
                  { label: "U.S.A", value: "usa" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <div>
              <input type="file" onChange={onSelectFile} />
              {selectedFile && <img style={{ width: "100px" }} src={preview} />}
            </div>
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
        </>
      </Modal>
    </>
  );
};
export default ProductFromUncontrolle;
