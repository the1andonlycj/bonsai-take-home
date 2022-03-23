import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card";
import ProductDetailModal from "../product-detail-modal/product-detail-modal";
import Cart from "../cart/cart";
import { GetProducts } from "../../redux/actions/productActions";
import { RootStore } from "../../redux/store";
import { IProduct } from "../../redux/constants/product-types";

import "./storefront.styles.css";


const Storefront = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootStore) => state.productsList.products);
  const isLoading = useSelector((state: RootStore) => state.productsList.isLoading);
  const isModalOpen = useSelector((state: RootStore) => state.productsList.isModalOpen);
  const isCartOpen = useSelector((state: RootStore) => state.cart.isCartOpen);
  
  useEffect(() => {
    dispatch(GetProducts());
  },[]);
  
  return (
    <div>
      {isCartOpen && <Cart />}
      {isModalOpen && <ProductDetailModal />}
      
      <div className="products-listing">
        {!isLoading && (
          products?.map((productItem: IProduct) => (
          <ProductCard key={productItem.id} product={productItem} />
        )))}
      </div>
    </div>
  )
}

export default Storefront;