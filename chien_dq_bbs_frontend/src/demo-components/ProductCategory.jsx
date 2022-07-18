import { ProductRow } from "./ProductRow";

export const ProductCategory = ({ products, productCategoryname }) => {
  const productsRender = products.map((product) => (
    <tr key={product.id}>
      <ProductRow product={product} />
    </tr>
  ));

  return (
    <>
      <th className="product-category">{productCategoryname}</th>
      {productsRender}
    </>
  );
};
