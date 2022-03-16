import { FC, ReactElement } from "react";

import "./product-card.styles.css";

export interface IProduct {
  name: string;
  description: string;
  defaultImage: string;
}

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }): ReactElement => {
  const { name, defaultImage, description } = product;
  // console.log("IMAGESOURCE:", defaultImage, name, description)
  return (
    <div className="product-card-container">
      <img src={defaultImage} alt={description}/>
      <div className="product-card-details">
        <span className="product-name">{name} </span>
        <span className="product-description"> {description} </span>
      </div>
    </div>
  );
};

export default ProductCard;
