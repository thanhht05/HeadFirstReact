import { Button, Drawer } from "antd";

const BookDetailModal = ({
  bookDetails,
  isModalBookDetailOpen,
  setIsModalBookDetailOpen,
}) => {
  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setIsModalBookDetailOpen(false)}
        open={isModalBookDetailOpen}
      >
        <p>ID: {bookDetails.id}</p>
        <p>Name: {bookDetails.name}</p>
        <p>Price: {bookDetails.price}</p>
        <p>Quantity: {bookDetails.quantity}</p>
        <img
          style={{ width: "200px", height: "200px", objectFit: "contain" }}
          draggable={false}
          alt="example"
          src={`${import.meta.env.VITE_BACKEND_URL}/upload/${bookDetails.img}`}
        />
      </Drawer>
    </>
  );
};

export default BookDetailModal;
