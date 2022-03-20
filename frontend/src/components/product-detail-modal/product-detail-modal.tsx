import { useState, useEffect, useContext } from 'react';
import { IProduct, Variant, Option} from "../../redux/constants/product-types";
import VariantDetails from './variant-details';
import { ToggleModal } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from '../../redux/store';

import './product-detail-modal.css';

const ProductDetailModal = () => {
  const selectedProduct = useSelector((state: RootStore) => state.productsList.selectedProduct);
  const [variantsToggled, setVariantsToggled] = useState(false)
  const dispatch = useDispatch();
  const _toggleModal = () => {
    dispatch(ToggleModal({
      name: '',
      id: '',
      description: '',
      defaultImage: '',
      variants: []
    }))
  }

  let input = selectedProduct;
  console.log("INPUT", input)
  // Once you're doing types, make sure to include the input as params here!
  useEffect(() => {
    if(input.variants.length > 1) {
      setVariantsToggled(true)
    };
  }, [])
  
  return (
    <div className="product-detail-modal">
      <div className="modal-column-left">
        <img src={input.defaultImage} alt={input.name}></img>
        <div className='modal-text-container'>
          <h2>{input.name}</h2>
          <p>{input.description}</p>
        </div>
      </div>
      <div className="modal-column-right">
        <div className="modal-options-container">
          <button onClick={_toggleModal}><strong>X Close</strong></button>
          {variantsToggled ? (
            <div>
              <p>You've got options:</p>
                <div className="modal-variant-image-container">
                  {input.variants.map((variant: Variant, index: number) => (
                    <VariantDetails 
                      id={variant.id} 
                      image={variant.image} 
                      isDiscontinued={variant.isDiscontinued} 
                      priceCents={variant.priceCents} 
                      quantity={variant.quantity} 
                      selectableOptions={variant.selectableOptions} 
                      number={index}
                    />
                  ))}
                </div>
            </div>) : 
            (
              <div>
                <h1>Sorry, there are no options for this product.</h1>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal;