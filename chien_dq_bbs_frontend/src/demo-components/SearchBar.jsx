
export  function SearchBar({keyword, handleChange, isInstock, setIsInStock}) {
    return (<div className="search-bar">
      <div className="search-input">
        <input
          placeholder="Search..."
          value={keyword}
          onChange={handleChange}
        />
      </div>
      <label>
        <input
          onChange={() => {
            setIsInStock(!isInstock);
          }}
          checked={isInstock}
          type="checkbox"
        />
        Only show products in stock
      </label>
    </div>)};