import { Modal } from "antd";

const UpdateBookModal = ({
  isModalUpdateBookOpen,
  setIsModalUpdateBookOpen,
  bookDataUpdate,
}) => {
  const resetAndCloseModal = () => {
    setIsModalUpdateBookOpen(false);
  };
  const handelUpdateBook = () => {};
  console.log("bookdaup", bookDataUpdate);
  return (
    <>
      <>
        <Modal
          title="Basic Modal"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalUpdateBookOpen}
          onOk={handelUpdateBook}
          onCancel={resetAndCloseModal}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    </>
  );
};
export default UpdateBookModal;
