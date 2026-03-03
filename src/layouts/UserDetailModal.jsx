import { Input, Modal } from "antd";
import { Button, Drawer } from "antd";
const UserDetailModal = ({
  setIsModalUserDetailOpen,
  isModalUserDetailOpen,
  userDataDetail,
}) => {
  return (
    <>
      <Drawer
        title="User Detail"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setIsModalUserDetailOpen(false)}
        open={isModalUserDetailOpen}
      >
        <p>Id: {userDataDetail?.id}</p>
        <p>Email: {userDataDetail?.email}</p>
        <p>Fullname: {userDataDetail?.fullName}</p>
        <p>Phone {userDataDetail?.phone}</p>
      </Drawer>
    </>
  );
};
export default UserDetailModal;
