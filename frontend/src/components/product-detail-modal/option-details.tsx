import { Option } from "../../redux/constants/product-types";

function OptionDetails(selectableOptions: Option) {
  
  return (
    <>
      <h3>{selectableOptions.type}: {selectableOptions.value}</h3>
    </>
  )
}

export default OptionDetails