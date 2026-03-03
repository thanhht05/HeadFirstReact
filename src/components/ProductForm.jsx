import { Button, Modal, Form, Input, Select, Space, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { createProductAPi, uploadFileApi } from "../services/apiService";

const ProductForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [cate, setCate] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
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

  const handleChange = (value) => {
    setCate(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const resUpload = await uploadFileApi(selectedFile);
    const fileName = resUpload.data.fileName;

    const res = await createProductAPi(
      name,
      price,
      quantity,
      fileName,
      cate,
      description,
    );

    if (res.data) {
      notification.success({
        message: "Crate product",
        description: "OK",
      });
    }

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setName("");
    setQuantity("");
    setPrice("");
    setDescription("");
    setPreview(undefined);
    setSelectedFile(undefined);
  };
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
        title="Create product"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ marginBottom: "12px" }}>
          <label style={{ float: "left" }}>Name:</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ float: "left" }}>Quantity:</label>
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ float: "left" }}>Price:</label>
          <Input
            value={preview}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ float: "left" }}>Category:</label>
          <Select
            value={cate}
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "Beverages", label: "Beverages" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
            ]}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ float: "left" }}>description:</label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="maxLength is 6"
            maxLength={6}
          />
        </div>
        <div>
          <input type="file" onChange={onSelectFile} />
          {selectedFile && <img style={{ width: "100px" }} src={preview} />}
        </div>
      </Modal>
    </>
  );
};
export default ProductForm;
