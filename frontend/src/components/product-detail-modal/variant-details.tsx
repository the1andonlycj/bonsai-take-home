import OptionDetails from './option-details';
import { Variant, Option } from  "../../redux/constants/product-types";
import { SelectedOption } from '../../redux/actions/productActions';
import { useDispatch } from 'react-redux';

function VariantDetails(variant: Variant) {
  console.log("Variant:", variant)
  const dispatch = useDispatch();
  // what they chose gets sent to state
  // cart button appears
  // styling changes to show what was selected

  // Get the categories and combine their potential values into dropdowns.
  // Allow user to select those dropdowns.
  // Check if the dropdowns represent a valid product before allowing them to send it to the cart.
  variant.selectableOptions.map((option) => {
    console.log("OPTIONS", option.type)
  })



  // const userSelected = (option) => {
  //   dispatch(SelectedOption({
      
  //   }))

  return (
    <div>
      <div>
        <img className="modal-variant-image" src={variant.image}></img>
        {variant.selectableOptions.map((selectableOption: Option) => (
          <OptionDetails type={selectableOption.type} value={selectableOption.value}
          />
        ))}
      </div>
    </div>

  )
}

export default VariantDetails