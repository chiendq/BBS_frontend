import React, { useEffect, useState } from "react";

export const Button = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="preview-blogs">
      <button onClick={handleClick}>Click me : {count}</button>
    </div>
  );
};
