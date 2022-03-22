import { useState, useEffect } from 'react';
import OptionDetail from './option-detail';
import { Variant } from "../../redux/constants/product-types";
import { AddToCart, ToggleModal, ToggleCart } from "../../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from '../../redux/store';

import './product-detail-modal.css';


// In order to ensure that options have been selected, we need to know how many options have been presented to the user.
// Then, we need to know what they've selected for all of those options.
// Once we know what they've set for all included options, we have to compare their selections to the available variants and ensure that they match.
// If they match, we show them the add-to-cart button and allow them to add to cart.
// If they do not match, we show an apology.
// All of this processing needs to happen at a higher level than the option itself. The option-detail modal must pass the information up to the store so it can be checked here, so that this page can display the appropriate information. 


const ProductDetailModal = () => {
  const dispatch = useDispatch();
  // It feels like PRODUCTSLIST being in the middle of each of these is a HUGE mistake, but I can't see where I've begun this pattern or how to fix it? It's strange.
  const listedOptions = useSelector((state: RootStore) => state.productsList.selectedProduct.groupedOptions);
  const selectedProduct = useSelector((state: RootStore) => state.productsList.selectedProduct);

  // WHY ARE YOU WRITING THIS TO PRODUCT LIST?
  const cartProducts = useSelector((state: RootStore) => state.productsList.cart);

  const [variantsToggled, setVariantsToggled] = useState(false);
  const [productDiscontinued, setProductDiscontinued] = useState(false);
  const isCartOpen = useSelector((state: RootStore) => state.productsList.isCartOpen);
  
  const _toggleModalClosed = () => {
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
      // Variants are unavailable; user has only one option. If stock is available, allow add to cart.
      setProductDiscontinued(false)

    } else {
      // Variants are unavailable and product is discontinued. Show out of stock:
      if(selectedProduct.variants[0].quantity < 1) {
        setProductDiscontinued(true)
      }
    }
  }, [])

  const addToCart = () => {
    const itemGoingToCart = {
      image: selectedProduct.variants[0].image,
      price: Number(((selectedProduct.variants[0].priceCents) / 100 ).toFixed(2)),
      name: selectedProduct.name,
      chosenType: selectedProduct.variants[0].selectableOptions[0].type,
      chosenValue: selectedProduct.variants[0].selectableOptions[0].value,
      quantityAvailable: selectedProduct.variants[0].quantity,
      id: selectedProduct.variants[0].id,
      quantityDesired: 1,
    }

    if(cartProducts.length > 0) {

      // THIS CHECK IS FAILING WHEN WE GET TO THREE PRODUCTS IN THE CART.
      
      console.log("THERE'S SOMETIN IN HERE")
      for(let alreadyInCartItem of cartProducts) {
        console.log("ALREADYINTHERE:", alreadyInCartItem)
        if(JSON.stringify(alreadyInCartItem) === JSON.stringify(itemGoingToCart)) {
          // This item is already in cart:  cart opens to show user and closes detail modal:
          dispatch(ToggleCart(true))
          _toggleModalClosed()
        } else {
          // This item is not in the cart, go ahead and add it.
          dispatch(AddToCart(itemGoingToCart))
          dispatch(ToggleCart(true))
          _toggleModalClosed()
        }
      }
    } else {
      // Cart is empty, add the item to the cart, no questions asked:
      console.log("Cart was empty. Adding product.")
      dispatch(AddToCart(itemGoingToCart))
      dispatch(ToggleCart(true))
      _toggleModalClosed()
    }
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
                  Available with {selectedProduct.variants[0].selectableOptions[0].value.toLowerCase()} {selectedProduct.variants[0].selectableOptions[0].type.toLowerCase()}. 
                  Only ${((selectedProduct.variants[0].priceCents) / 100 ).toFixed(2)}, but you should act quickly: we only have {selectedProduct.variants[0].quantity} left. 
                </p>
                <button onClick={addToCart}>Add to Cart</button>
              </div>
            ) 
            : (
              <div>
                {/* I don't think there's an instance wherein this code will naturally run. */}
                <h1>Unfortunately, we're fresh out of stock on this one.</h1>
                <img src={selectedProduct.variants[0].image}></img>
                <p>
                  With enough interest, it may be available again. The standard version comes with {selectedProduct.variants[0].selectableOptions[0].value.toLowerCase()} {selectedProduct.variants[0].selectableOptions[0].type.toLowerCase()} for only ${((selectedProduct.variants[0].priceCents) / 100 ).toFixed(2)}. 
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