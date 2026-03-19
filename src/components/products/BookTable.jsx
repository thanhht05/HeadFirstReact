import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Flex, Modal, Space, Table, Tag } from "antd";
import ProductDetailModal from "../../layouts/BookDetailModal";
import { Link } from "react-router-dom";
import DeleUserPopup from "../../layouts/DeleUserPopup";
import DeleteBookPopup from "../../layouts/DeleteBookPopup";
import { Button } from "antd";
import { useState } from "react";
import UpdateUserModal from "../../layouts/UpdateUserModal";
import UpdateBookModal from "../../layouts/UpdateBookModal";

const BookTable = ({
  productData,
  loadProduct,
  page,
  pageSize,
  totalElements,
  setPage,
  setPageSize,
}) => {
  const [isModalBookDetailOpen, setIsModalBookDetailOpen] = useState(false);

  const [bookDetails, setBookDetails] = useState({});

  const [deleteBookData, setDeleteBookData] = useState(null);

  const [isModalUpdateBookOpen, setIsModalUpdateBookOpen] = useState(false);

  const [bookDataUpdate, setBookDataUpdate] = useState(null);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <Space>
          <Link
            onClick={() => {
              setBookDetails(record);
              setIsModalBookDetailOpen(true);
            }}
          >
            {record.id}
          </Link>
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              console.log("reocder side bootabkle", record);
              setIsModalUpdateBookOpen(true);
              setBookDataUpdate(record);
            }}
          >
            <EditOutlined />
          </a>
          <a onClick={() => setDeleteBookData(record.id)}>
            {/* <DeleteOutlined /> */}
            <DeleteBookPopup
              loadProduct={loadProduct}
              deleteBookData={deleteBookData}
            />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={productData}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: totalElements,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setPageSize(newPageSize);
          },
        }}
      />
      <ProductDetailModal
        bookDetails={bookDetails}
        isModalBookDetailOpen={isModalBookDetailOpen}
        setIsModalBookDetailOpen={setIsModalBookDetailOpen}
      />

      <UpdateBookModal
        isModalUpdateBookOpen={isModalUpdateBookOpen}
        bookDataUpdate={bookDataUpdate}
        setIsModalUpdateBookOpen={setIsModalUpdateBookOpen}
      />
    </>
  );
};
export default BookTable;
