import { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/product-card";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../../redux/actions/productActions";
import ProductDetailModal from "../product-detail-modal/product-detail-modal";
import Cart from "../cart/cart";
import { RootStore } from "../../redux/store";

import "./storefront.styles.css";
import { IProduct } from "../../redux/constants/product-types";


const Storefront = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootStore) => state.productsList.products);
  const isLoading = useSelector((state: RootStore) => state.productsList.isLoading);
  const isModalOpen = useSelector((state: RootStore) => state.productsList.isModalOpen);
  const isCartOpen = useSelector((state: RootStore) => state.cart.isCartOpen);
  
  useEffect(() => {
    dispatch(GetProducts());
  },[])
  
  return (
    <div>
      {isCartOpen && <Cart />}
      {isModalOpen && <ProductDetailModal />}
      
      <div className="products-listing">
        {isLoading === false && (
          products?.map((productItem: IProduct) => (
          <ProductCard key={productItem.id} product={productItem} />
        )))}
      </div>
    </div>
  )
}

export default Storefront;