export const ProductRow = ({ product }) => {
  const redColor = { color: "red" };

  if (product.stocked) {
    return (
      <>
        <td>{product.name}</td>
        <td> {product.price}</td>
      </>
    );
  }

  return (
    <>
      <td style={redColor}>{product.name}</td>
      <td>{product.price}</td>
    </>
  );
};
