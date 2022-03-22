import OptionDetail from './option-detail';
import { Variant } from  "../../redux/constants/product-types";
import { SelectedOption } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../redux/store';
import { useEffect } from 'react';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

function VariantDetails(variant: Variant) {
  const listedOptions = useSelector((state: RootStore) => state.productsList.selectedProduct.groupedOptions);
  
  

  // console.log("DoItDo?", listedOptions)

  return (
    <div>
      <div>
        <img className="modal-variant-image" src={variant.image}></img>
        {Object.keys(listedOptions).length > 0 &&
          Object.keys(listedOptions).map((type) => (
            <OptionDetail 
              type={type}
              values={listedOptions[type]}
            />

          ))
            
        }
        
      </div>
    </div>

  )
}

export default VariantDetails