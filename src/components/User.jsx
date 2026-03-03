import { Flex, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateUserModal from "../layouts/UpdateUserModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserDetailModal from "../layouts/UserDetailModal";
import DeleUserPopup from "../layouts/DeleUserPopup";
const UserTable = ({ dataUsers, loadUser }) => {
  const [isModalUpdateOpen, serIsModalUpdateOpen] = useState(false);
  const [userDataUpdate, setUserDataUpdate] = useState(null);
  const [isModalUserDetailOpen, setIsModalUserDetailOpen] = useState(false);
  const [userDataDetail, setUserDataDetail] = useState(null);

  const [userDataDelete, setUserDataDelete] = useState(null);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      render: (_, record) => (
        <Space size="middle">
          <Link
            onClick={() => {
              setIsModalUserDetailOpen(true);
              setUserDataDetail(record);
            }}
          >
            {record.id}
          </Link>
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div
            style={{
              display: "flex",
              gap: "10px",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            <EditOutlined
              onClick={() => {
                serIsModalUpdateOpen(true);
                setUserDataUpdate(record);
              }}
            />
            <div onClick={() => setUserDataDelete(record.id)}>
              <DeleUserPopup
                loadUser={loadUser}
                userDataDelete={userDataDelete}
              />
            </div>
          </div>
        </Space>
      ),
    },
  ];
  // const data = [
  //   {
  //     id: "1",
  //     fullName: "John Brown",
  //     email: "kak1aks@gmail.com",
  //     phone: "New York No. 1 Lake Park",
  //   },
  // ];
  return (
    <>
      <Table rowKey="id" columns={columns} dataSource={dataUsers} />
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        serIsModalUpdateOpen={serIsModalUpdateOpen}
        userDataUpdate={userDataUpdate}
        setUserDataUpdate={setUserDataUpdate}
        loadUser={loadUser}
      />
      <UserDetailModal
        setIsModalUserDetailOpen={setIsModalUserDetailOpen}
        isModalUserDetailOpen={isModalUserDetailOpen}
        userDataDetail={userDataDetail}
      />
    </>
  );
};

export default UserTable;
