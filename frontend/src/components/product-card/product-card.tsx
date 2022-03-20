import { FC, ReactElement, useContext, useState } from "react";
import ProductDetailModal from "../product-detail-modal/product-detail-modal";


import "./product-card.styles.css";

export interface IProduct {
  name: string;
  description: string;
  defaultImage: string;
  variants: Variant[];  
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

interface IProductCardProps {
  product: IProduct;
}

interface ModalContent {
  isOpen: boolean;
  productVariants: Variant[];
  onToggle: () => void;
};

const ProductCard: FC<IProductCardProps> = ({ product }): ReactElement => {
  const [showDetails, setShowDetails] = useState(false)
  const { name, defaultImage, description, variants } = product;
  
  return (
    <div className="product-card-container">
      <img src={defaultImage} alt={description}/>
      <div className="product-card-details">
        <span className="product-name">{name} </span>
        <span className="product-description"> {description} </span>
      </div>
      {/* <div className="product-options-container">
        {product.variants.length > 0 &&
        // OnClick this button to expand into details version of the page.
          <button onClick={() => setIsModalOpen(true) setModalDetails(product)} className="product-options-button">Details</button> 
        }
        {isModalOpen && <ProductDetailModal  />}

      </div> */}
    </div>
  );
};

export default ProductCard;
