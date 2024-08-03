import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "./../Axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);
  return (
    <section className="card">
      <div className="text-content">
        <h3>{product.title}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <a href="https://www.web-leb.com/code">Buy</a>
      </div>
      <div className="visual">
	  <img src={product.image} alt="" />
      </div>
    </section>
  );
};

export default ProductDetail;
