import { useEffect } from "react";
import ProductCard from "../../components/product-card/product-card"

import "./storefront.styles.css";

const Storefront = () => {

  // REPLACE WITH API FETCHED ITEMS
  const TEMPORARY_ITEMS = [
    {
      id: 1,
      name: 'Hat',
      description:
        'Fashion moves so quickly that, unless you have a strong point of view, you can lose integrity.',
      imageSrc:
        'https://media.istockphoto.com/photos/hat-on-white-background-picture-id526131500?b=1&k=20&m=526131500&s=170667a&w=0&h=TVhckgzmxLZ6b1V74eel7XbFy73tldESzBcH0ZG6g0c=',
    },
    {
      id: 2,
      name: 'Shirt',
      description: 'Fashion never stops. There is always the new project, the new opportunity.',
      imageSrc:
        'https://media.istockphoto.com/photos/blank-white-tshirt-front-with-clipping-path-picture-id482948743?b=1&k=20&m=482948743&s=170667a&w=0&h=DetzN8rTsgQDTyBDSWvc7gUNz0gae0CUQecM-KNN3WY=',
    },
  ];

  // Get products from server:
  async function getProducts() {
    return await fetch("http://localhost:8000/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" }, 
    }).then((results) => {
      return results.json()
    }).then((res) => {
      console.log("GOT A RES: ", res)
    }).catch((err) => {
      // Install proper error handling for USER, not just admin!!
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
          {TEMPORARY_ITEMS.map((productItem) => (
            <ProductCard key={productItem.id} product={productItem} />
          ))}
        </div>
    </div>
  )
}

export default Storefront