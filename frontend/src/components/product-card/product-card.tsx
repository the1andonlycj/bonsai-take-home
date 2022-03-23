import { FC, ReactElement } from "react";
import { IProduct } from "../../redux/constants/product-types";
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

  const { name, defaultImage, description } = product;

  return (
    <div className="product-card-container" onClick={_toggleModal}>
      <img src={defaultImage} alt={description}/>
      <div className="product-card-details">
        <span className="product-name">{name}</span>
        <span className="product-description">{description}</span>
      </div>
    </div>
  );
};

export default ProductCard;
