import { useState, useEffect } from 'react';
import { Variant } from "../../redux/constants/product-types";
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
      variants: [],
    }))
  }

  useEffect(() => {
    if(selectedProduct.variants.length > 1) {
      setVariantsToggled(true)
    };
  }, [])
  
  return (
    <div className="product-detail-modal">
      <div className="modal-column-left">
        <img src={selectedProduct.defaultImage} alt={selectedProduct.name}></img>
        <div className='modal-text-container'>
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
        </div>
      </div>
      <div className="modal-column-right">
        <div className="modal-options-container">
          <button onClick={_toggleModal}><strong>X Close</strong></button>
          {variantsToggled ? (
            <div>
              <p>You've got options:</p>
                <div className="modal-variant-image-container">
                  {selectedProduct.variants.map((variant: Variant) => (
                    <VariantDetails 
                      id={variant.id} 
                      image={variant.image} 
                      isDiscontinued={variant.isDiscontinued} 
                      priceCents={variant.priceCents} 
                      quantity={variant.quantity} 
                      selectableOptions={variant.selectableOptions} 
                      key={variant.id}
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