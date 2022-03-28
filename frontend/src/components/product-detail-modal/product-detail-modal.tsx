import { useState, useEffect } from 'react';
import OptionDetail from './option-detail';
import { ICartItem } from '../../redux/constants/cart-types';
import { ToggleModal, SetSelectedVariant } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from '../../redux/store';
import { AddToCart, ToggleCart } from '../../redux/actions/cartActions';

import './product-detail-modal.css';

 
const ProductDetailModal = () => {
  const dispatch = useDispatch();
  const listedOptions = useSelector((state: RootStore) => state.productsList.selectedProduct.groupedOptions);
  const selectedProduct = useSelector((state: RootStore) => state.productsList.selectedProduct);
  const selectedOptions = useSelector((state: RootStore) => state.productsList.selectedOptions);
  const selectedVariantId = useSelector((state: RootStore) => state.productsList.selectedVariantId);
  const cartProducts = useSelector((state: RootStore) => state.cart.cart);

  const [variantsToggled, setVariantsToggled] = useState(false);
  const [productDiscontinued, setProductDiscontinued] = useState(false);
  
  const _toggleModalClosed = () => {
    dispatch(ToggleModal({
      name: '',
      id: '',
      description: '',
      defaultImage: '',
      variants: [],
      isDiscontinued: false,
    }));
  };

  useEffect(() => {
    if(selectedProduct.variants.length > 1) {
      // Variants are available; user must choose options:
      setProductDiscontinued(false);
      setVariantsToggled(true);
    } else if (selectedProduct.variants[0]?.quantity > 0) {
      // Variants are unavailable; user has only one option. If stock is available, allow add to cart.
      setProductDiscontinued(false);
    } else {
      // Variants are unavailable and product is discontinued. Show out of stock:
      if(selectedProduct.variants[0]?.quantity < 1) {
        setProductDiscontinued(true);
      }
    }
  }, []);

  useEffect(() => {
    // Options have changed; reset value for variantId to empty string:
    dispatch(SetSelectedVariant(''))
    // Establish empty object for variant option sets:
    selectedProduct.variants.forEach(variant => {
      const checkableOptions = {}
      // Creating a more easily checkable set of options:
      variant.selectableOptions.forEach(option => {
        checkableOptions[option.type] = option.value
      })
      if (JSON.stringify(checkableOptions) === JSON.stringify(selectedOptions) && !variant.isDiscontinued && variant.quantity > 0) {
        // Positive match:
        dispatch(SetSelectedVariant(variant.id))
      }

    })
  }, [selectedOptions]);


  const addToCart = () => {
    // Establish empty prodVariant:
    let prodVariant:ICartItem = {
      image: '',
      price: 0,
      name: '',
      chosenOptions: [],
      quantityAvailable: 0,
      id: '',
      key: ''
    };

    if(selectedVariantId) {
      selectedProduct.variants.forEach((variant, index) => {
        if(variant.id === selectedVariantId) {
          prodVariant = selectedProduct.variants[index]
        }
        console.log("PRODVAR", prodVariant)
      }
      )} else {
        prodVariant = selectedProduct.variants[0]
    }

    
    const newItem: ICartItem = {
      key: prodVariant.id,
      image: prodVariant?.image,
      price: Number(((prodVariant?.priceCents) / 100 ).toFixed(2)),
      name: selectedProduct.name,
      chosenOptions: prodVariant.selectableOptions,
      quantityAvailable: prodVariant.quantity,
      id: prodVariant.id,
      quantityDesired: 1,
    }      
   

    console.log("NEWITEMBB", newItem)
    
    if (!cartProducts.includes(newItem)) {
      dispatch(AddToCart(newItem));
    }
    dispatch(ToggleCart(true))
    _toggleModalClosed();
  }

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
          <button onClick={_toggleModalClosed}><strong>X Close</strong></button>
          {variantsToggled ? (
            <div className="modal-selectors-container">
              <h1>You've got options:</h1>
              <div className="options-container">
                <p>Please select your</p>
                {Object.keys(listedOptions).length > 0 &&
                  Object.keys(listedOptions).map((type: string, index: number) => (
                    <OptionDetail 
                      type={type}
                      key={index}
                      values={listedOptions[type]}
                    />
                  ))     
                }
                {selectedVariantId && <button onClick={addToCart}>Add to Cart</button>}
              </div>
            </div>) 
            : (!productDiscontinued ) ? (
              <div>
                <h1>Who needs options? This one is perfect as is:</h1>
                <img src={selectedProduct.variants[0]?.image}></img>
                <p>
                  Available with {selectedProduct.variants[0]?.selectableOptions[0]?.value.toLowerCase()} {selectedProduct.variants[0]?.selectableOptions[0]?.type.toLowerCase()}. 
                  Only ${((selectedProduct.variants[0]?.priceCents) / 100 ).toFixed(2)}, but you should act quickly: we only have {selectedProduct.variants[0]?.quantity} left. 
                </p>
                <button onClick={addToCart}>Add to Cart</button>
              </div>
            ) 
            : (
              <div>
                <h1>Unfortunately, we're fresh out of stock on this one.</h1>
                <img src={selectedProduct.variants[0]?.image}></img>
                <p>
                  With enough interest, it may be available again. The standard version comes with {selectedProduct.variants[0]?.selectableOptions[0]?.value.toLowerCase()} {selectedProduct.variants[0]?.selectableOptions[0]?.type.toLowerCase()} for only ${((selectedProduct.variants[0]?.priceCents) / 100 ).toFixed(2)}. 
                </p>
                <button onClick={()=>{alert('This feature needs to be linked to the database!')}} >Let us know if you'd like to be notified when it comes back in stock.</button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal;