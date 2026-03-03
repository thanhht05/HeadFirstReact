import { useEffect, useState } from "react";
import BookTable from "../components/BookTable";
import ProductForm from "../components/ProductForm";
import ProductFromUncontrolle from "../components/ProductFormUncontrolle";
import { fetchAllProduct } from "../services/apiService";

const BookPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [productData, setProductData] = useState([]);
  const [totalElements, seTtotalElements] = useState();
  const loadProduct = async () => {
    const res = await fetchAllProduct(page, pageSize);
    if (res.data) {
      setPage(res.data.meta.page);
      setPageSize(res.data.meta.pageSize);
      setProductData(res.data.results);
      seTtotalElements(res.data.meta.totalElements);
    }
  };

  useEffect(() => {
    loadProduct(page, pageSize);
  }, [page, pageSize]);
  return (
    <>
      <ProductFromUncontrolle
        loadProduct={loadProduct}
        page={page}
        pageSize={pageSize}
        totalElements={totalElements}
      />
      <BookTable
        productData={productData}
        loadProduct={loadProduct}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        totalElements={totalElements}
      />
      ;
    </>
  );
};
export default BookPage;
