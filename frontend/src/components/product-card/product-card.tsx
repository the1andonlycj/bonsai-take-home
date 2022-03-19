import { FC, ReactElement, useState } from "react";
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

interface Content {
  content: Variant[];
}

interface ModalContent {
  isOpen: boolean;
  productVariants: Content;
  onToggle: () => void;
}

// This is how the cart context works:
// import { createContext, useState, FC } from "react";

// interface ICartContext {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// }

// // Why does setIsOpen show null here but void above? Just inconsistent?
// export const CartContext = createContext<ICartContext>({
//   isOpen: false,
//   setIsOpen: () => null,
// });

// export const CartProvider: FC = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const value = { isOpen, setIsOpen };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };


const ProductCard: FC<IProductCardProps> = ({ product }): ReactElement => {
  const [modalDetails, setModalDetails] = useState({isOpen: false, content: ""})
  const onOpenModal = (content: Content) => {
    // setModalDetails({isOpen: true, productVariants: content})
  }

  const onCloseModal = () => {
    // setModalDetails({isOpen: false, content: ""})
  }

  // Use modal features to black out the rest of the screen/make everything else unresponsive so that multiple cards can't show their details at the same time.
  const [showDetails, setShowDetails] = useState(false)
  const { name, defaultImage, description, variants } = product;
  console.log("PRODUCT:", product)
  // console.log("IMAGESOURCE:", defaultImage, name, description)
  return (
    <div className="product-card-container">
      <img src={defaultImage} alt={description}/>
      <div className="product-card-details">
        <span className="product-name">{name} </span>
        <span className="product-description"> {description} </span>
      </div>
      <div className="product-options-container">
        {product.variants.length > 0 &&
        // OnClick this button to expand into details version of the page.
          <button onClick={() => setShowDetails(true)} className="product-options-button">Details</button> 
        }
        {modalDetails.isOpen && (<ProductDetailModal 
        // product={modalDetails.content} onClose={() => onCloseModal} 
        />)}

      </div>
    </div>
  );
};

export default ProductCard;
