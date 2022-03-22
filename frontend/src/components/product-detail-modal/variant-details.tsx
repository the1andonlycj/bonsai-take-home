import OptionDetail from './option-detail';
import { Variant } from  "../../redux/constants/product-types";
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store';

function VariantDetails(variant: Variant) {
  const listedOptions = useSelector((state: RootStore) => state.productsList.selectedProduct.groupedOptions);

  return (
    <>
      {Object.keys(listedOptions).length > 0 &&
        Object.keys(listedOptions).map((type) => (
          <OptionDetail 
            type={type}
            values={listedOptions[type]}
          />
        ))     
      }
    </>
  )
}

export default VariantDetails