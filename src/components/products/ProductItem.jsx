import { Card } from "antd";

const ProductItem = ({ product }) => {
  const { Meta } = Card;

  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            draggable={false}
            alt="example"
            src={`${import.meta.env.VITE_BACKEND_URL}/upload/${product.img}`}
          />
        }
      >
        <Meta title={product.name} description={product.price} />
      </Card>
    </>
  );
};
export default ProductItem;
