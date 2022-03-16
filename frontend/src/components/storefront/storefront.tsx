import { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/product-card"

import "./storefront.styles.css";

const Storefront = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  interface Product {
    id: string;
    name: string;
    isDiscontinued: boolean;
    variants: Variant[];
    description: string;
    imageSrc: string;
  }
  
  interface Variant {
    id: string;
    quantity: number;
    image: string;
    isDiscontinued: boolean;
    priceCents: number;
    selectableOptions: selectableOptions
  }
  
  // Not sure if I need these TWO selectableOptions and Option to be separate things(?)
  interface selectableOptions {
    options: Option[];
  }

  interface Option {
    type: string;
    value: string;
  }
  
  // Get products from server:
  // REFACTOR TO PUT THIS INSIDE OF useEffect:
  async function getProducts() {
    return await fetch("http://localhost:8000/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" }, 
    }).then((results) => {
      return results.json()
    }).then((res) => {
      setProductList(res.products)
    }).then(() => {
      console.log("ProductList?", productList)
    }).catch((err) => {
      // Install proper error handling for USER, not just admin!!!
      console.log("fetch err", err)
    })
  }  

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <h1>Storefront is showing up with no problems.</h1>
        <div className="products-listing">
          {productList && (
            productList.map((productItem) => (
            <ProductCard key={productItem.id} product={productItem} />
          )))}
        </div>
    </div>
  )
}

export default Storefront;