import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { fetchAllProduct } from "../services/apiService";
import { Pagination } from "antd";

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchALlProduct = async () => {
      const res = await fetchAllProduct(page, pageSize);

      if (res.data) {
        setProductData(res.data.results);
        setPage(res.data.meta.page);
        setPageSize(res.data.meta.pageSize);
        setTotalElements(res.data.meta.totalElements);
      }
    };
    fetchALlProduct();
  }, [page]);

  const handleOnChangePagination = (page) => {
    setPage(page);
    // await fetchAllProduct(page, pageSize)
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        {productData.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
      <div
        style={{
          padding: " 10px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          current={page}
          showSizeChanger={false}
          total={totalElements} // tổng số item
          pageSize={pageSize} // số item mỗi trang
          onChange={handleOnChangePagination}
        />
      </div>
    </>
  );
};
export default ProductList;
