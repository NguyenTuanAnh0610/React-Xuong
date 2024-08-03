import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "./../contexts/ProductContext";
const HomePage = () => {
  const { state } = useContext(ProductContext);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const query =
      new URLSearchParams(location.search).get("query") || "";
    setSearchQuery(query); // Đặt giá trị của input tìm 
	
    if (query) {
      const results = state.products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(state.products);
    }
  }, [location.search, state.products]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Thay đổi URL để kích hoạt lọc sản phẩm
      window.history.pushState({}, "", `?query=${searchQuery}`);
    }
  };

  return (
    <>
      <h1>San pham ban chay</h1>
      <div className="row">
        <div className="search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
        </div>

        {filteredProducts.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="productItem">
              <Link to={`/product-detail/${item.id}`}>
                <img src={item.image} alt={item.title} />
              </Link>
              <div className="content">
                <Link to={`/product-detail/${item.id}`}>
                  <h2>{item.title}</h2>
                </Link>
                <p>Gia: {item.price}</p>
                <button className="btn btn-danger w-100">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
	  
    </>
  );
};
export default HomePage;
