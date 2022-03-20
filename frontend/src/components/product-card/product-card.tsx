import { FC, ReactElement, useContext, useState } from "react";
import ProductDetailModal from "../product-detail-modal/product-detail-modal";
import { IProduct, Variant, SelectableOptions, Option} from "../../redux/constants/product-types";
import { ToggleModal } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";

import "./product-card.styles.css";

interface IProductCardProps {
  product: IProduct;
}


const ProductCard: FC<IProductCardProps> = ({ product }): ReactElement => {
  const dispatch = useDispatch();
  const _toggleModal = () => {
    dispatch(ToggleModal(product))
  }
  console.log("PRODUCT")
  const [showDetails, setShowDetails] = useState(false)
  const { name, defaultImage, description, variants } = product;
  
  return (
    <div className="product-card-container" onClick={_toggleModal}>
      <img src={defaultImage} alt={description}/>
      <div className="product-card-details">
        <span className="product-name">{name} </span>
        <span className="product-description"> {description} </span>
      </div>
    </div>
  );
};

export default ProductCard;
