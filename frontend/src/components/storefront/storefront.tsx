import { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/product-card";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../../redux/actions/productActions";
import ProductDetailModal from "../product-detail-modal/product-detail-modal";
import Cart from "../cart/cart";
import { RootStore } from "../../redux/store";

import "./storefront.styles.css";

const Storefront = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootStore) => state.productsList.products);
  console.log("PRODSWTF", products)
 
  useEffect(() => {
    // Do we need this?
    dispatch(GetProducts());
  },[])

  
  return (
    <div>
      <Cart />
      {/* <ProductDetailModal /> */}
      <div className="products-listing">
        {products && (
          products.products.map((productItem) => (
          <ProductCard key={productItem.id} product={productItem} />
        )))}
      </div>
    </div>
  )
}

export default Storefront;