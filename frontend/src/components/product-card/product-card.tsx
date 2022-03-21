import { FC, ReactElement, useContext, useEffect, useState } from "react";
import ProductDetailModal from "../product-detail-modal/product-detail-modal";
import { IProduct, Variant, Option} from "../../redux/constants/product-types";
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
  const { name, defaultImage, description, variants } = product;
  
  let groupedTypes;

  useEffect(() => {
    const allOptions = variants.map((variant) => {
      return variant.selectableOptions
    })

    let flattenedOptions: Option[] = allOptions.reduce(
      function(previousValue, currentValue) {
        return previousValue.concat(currentValue)
      },
      []
    )
      // I know that using any is bad practice, but I really need to talk to someone about this situation here:
    function groupBy(objectArray: any, property: any) {
      return objectArray.reduce(function (acc: any, obj: any) {
        let key = obj[property]
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(obj)
        return acc
      }, {})
    }
    
    groupedTypes = groupBy(flattenedOptions, 'type')
    console.log("GT", groupedTypes)
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
