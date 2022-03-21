import { FC, ReactElement, useContext, useEffect, useState } from "react";
import ProductDetailModal from "../product-detail-modal/product-detail-modal";
import { IProduct, Variant, Option} from "../../redux/constants/product-types";
import { ToggleModal } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";

import "./product-card.styles.css";
import { forEachTrailingCommentRange } from "typescript";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }): ReactElement => {
  const dispatch = useDispatch();
  const _toggleModal = () => {
    dispatch(ToggleModal(product))
  }
  const { name, defaultImage, description, variants } = product;
  
  useEffect(() => {
    let optionsObject: object = {}
    let typeObject: {} = {}
    variants.map((variant) => {
      // console.log("VART", variant.selectableOptions)
      variant.selectableOptions.map((option) => {
        if(typeObject.hasOwnProperty(option.type)) {
          typeObject[option.type].push(option.value)
        } else {
          typeObject[option.type] = [option.value];
        }
      })
      console.log("TYPARR", typeObject)
    })
    
    // DROPDOWN DATA HAS BEEN MADE, We just need to make the elements.
  }, [])
  

  // Loop through the available selectableOptions.
  // As we go, we will have a type and a value for each option.
  // We need an object to come back, with type as the key and the values from ALL of the options in the value.
  // If we can create an array of values for each type, we can then compile them together. 

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
