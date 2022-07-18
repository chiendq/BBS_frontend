import React, { useEffect, useState } from "react";
import { PreviewBlogs } from "./components/PreviewBlogs";

const initialData = [
  {
    id: 1,
    category: "Fruits",
    price: "$1",
    stocked: true,
    name: "Apple",
  },
  {
    id: 2,
    category: "Fruits",
    price: "$1",
    stocked: true,
    name: "Dragonfruit",
  },
  {
    id: 3,
    category: "Fruits",
    price: "$2",
    stocked: false,
    name: "Passionfruit",
  },
  {
    id: 4,
    category: "Vegetables",
    price: "$2",
    stocked: true,
    name: "Spinach",
  },
  {
    id: 5,
    category: "Vegetables",
    price: "$4",
    stocked: false,
    name: "Pumpkin",
  },
  {
    id: 6,
    category: "Vegetables",
    price: "$1",
    stocked: true,
    name: "Peas",
  },
];

const Category = {
  Fruits: "Fruits",
  Vegetables: "Vegetables",
};

function App() {
  const [isInstock, setIsInstock] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [data, setData] = useState(initialData);
  const [dataFiltered, setDataFiltered] = useState(initialData);

  useEffect(() => {
    handleClick();
  }, [isInstock]);

  const vegetablesCategory = dataFiltered.filter(
    (product) => product.category === Category.Vegetables
  );

  const fruitsCategory = dataFiltered.filter(
    (product) => product.category === Category.Fruits
  );

  function handleChange(event) {
    setKeyword(event.target.value);
    setDataFiltered(
      data.filter((e) =>
        e.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      )
    );
  }

  console.log({ data });

  function handleClick() {
    console.log("asd");
    setDataFiltered(data.filter((e) => !isInstock || e.stocked));
  }

  // return (
  //   <div className="App">
  //     <table className="product-table">
  //       <SearchBar
  //         keyword={keyword}
  //         handleChange={handleChange}
  //         isInstock={isInstock}
  //         setIsInStock={setIsInstock}
  //       />
  //       <thead>
  //         <tr>
  //           <th>Name</th>
  //           <th>Price</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <ProductCategory
  //           key={Category.Fruits}
  //           products={fruitsCategory}
  //           productCategoryname={Category.Fruits}
  //         />
  //         <ProductCategory
  //           key={Category.Vegetables}
  //           products={vegetablesCategory}
  //           productCategoryname={Category.Vegetables}
  //         />
  //       </tbody>
  //     </table>
  //   </div>
  // );

  return (
    <div className="App">
      <PreviewBlogs />
    </div>
  );
}

export default App;
