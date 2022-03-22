import { useState, useEffect } from 'react';
import OptionDetail from './option-detail';
import { Variant } from "../../redux/constants/product-types";
import VariantDetails from './variant-details';
import { ToggleModal } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from '../../redux/store';

import './product-detail-modal.css';

const ProductDetailModal = () => {
  const listedOptions = useSelector((state: RootStore) => state.productsList.selectedProduct.groupedOptions);
  const selectedProduct = useSelector((state: RootStore) => state.productsList.selectedProduct);
  const [variantsToggled, setVariantsToggled] = useState(false);
  const [productDiscontinued, setProductDiscontinued] = useState(false);

  const dispatch = useDispatch();
  const _toggleModal = () => {
    dispatch(ToggleModal({
      name: '',
      id: '',
      description: '',
      defaultImage: '',
      variants: [],
      isDiscontinued: false,
    }))
  }

  useEffect(() => {
    if(selectedProduct.variants.length > 1) {
      // Variants are available; user must choose options:
      setProductDiscontinued(false)
      setVariantsToggled(true)
    } else if (selectedProduct.variants[0].quantity > 0) {
      // Variants are unavailable; user has only one option. 
      // If stock is available, allow them to add to cart.
      console.log("WE HAVE IT.")
      setProductDiscontinued(false)

    } else {
      // Product is discontinued, variant is out of stock. Variants are unavailable and product is discontinued:
      if(selectedProduct.variants[0].quantity < 1) {
        console.log("SORRY, CHIEF.")
        setProductDiscontinued(true)
      }
    }
  }, [])

  console.log("Let'sDoIt:", selectedProduct)
  
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
                {Object.keys(listedOptions).length > 0 &&
                  Object.keys(listedOptions).map((type) => (
                    <OptionDetail 
                      type={type}
                      values={listedOptions[type]}
                    />
                  ))     
                }
              </div>
            </div>) 
            : (!productDiscontinued ) ? (
              <div>
                <h1>Who needs options? This one is perfect as is:</h1>
                <img src={selectedProduct.variants[0].image}></img>
                <p>
                  Available with {selectedProduct.variants[0].selectableOptions[0].value.toLowerCase()} {selectedProduct.variants[0].selectableOptions[0].type.toLowerCase()}. 
                  Only ${((selectedProduct.variants[0].priceCents) / 100 ).toFixed(2)}, but you should act quickly: we only have {selectedProduct.variants[0].quantity} left. 
                </p>
                <button>Add to Cart</button>
              </div>
            ) 
            : (<h1>We're fresh out, boss.</h1>)
          }
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal;