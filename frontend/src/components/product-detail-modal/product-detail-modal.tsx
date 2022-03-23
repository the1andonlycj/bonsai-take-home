import { useState, useEffect } from 'react';
import OptionDetail from './option-detail';
import { ICartItem } from '../../redux/constants/cart-types';
import { ToggleModal } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from '../../redux/store';
import { AddToCart, ToggleCart } from '../../redux/actions/cartActions';

import './product-detail-modal.css';

 
const ProductDetailModal = () => {
  const dispatch = useDispatch();
  const listedOptions = useSelector((state: RootStore) => state.productsList.selectedProduct.groupedOptions);
  const selectedProduct = useSelector((state: RootStore) => state.productsList.selectedProduct);
  const selectedOptions = useSelector((state: RootStore) => state.productsList.selectedOptions);

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

  // useEffect(() => {
  //   selectedProduct.variants.forEach(variant => {
  //     debugger;
  //     let match = false;
  //     variant.selectableOptions.forEach(option => {
  //       if (selectedOptions[option.type] === option.value) {
  //         match = true;
  //       } else {
  //         match = false
  //       }
  //     }) 

  //     if(match) {
  //       setProductDiscontinued(false);
  //     }
        
  //     })
  // }, [selectedOptions]);


  const addToCart = () => {
    const prodVariant = selectedProduct.variants[0] || []

    const newItem: ICartItem = {
      key: prodVariant.id,
      image: prodVariant?.image,
      price: Number(((prodVariant?.priceCents) / 100 ).toFixed(2)),
      name: selectedProduct.name,
      chosenType: prodVariant?.selectableOptions[0]?.type,
      chosenValue: prodVariant?.selectableOptions[0]?.value,
      quantityAvailable: prodVariant.quantity,
      id: prodVariant.id,
      quantityDesired: 1,
    }
    
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