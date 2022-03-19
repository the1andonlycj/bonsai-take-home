import { useState } from 'react';
import OptionDetails from './option-details';

interface Variant {
  id: string;
  image: string;
  isDiscontinued: boolean;
  priceCents: number;
  quantity: number;
  selectableOptions: {
      type: string;
      value: string;
  }[];
  number: number;
}

interface selectableOptions {
  type: string;
  value: string;
  // Does this one need the array at the end?
};


function VariantDetails(variant: Variant) {
  const [optionsToggled, setOptionsToggled] = useState(false)
  const [options, setOptions] = useState({})
  console.log("Props inside of VariantDetails", variant)
  return (
    <div>
      <div>
        <img className="modal-variant-image" src={variant.image} 
        // alt={`${variant.id} Variant: ${index + 1}`} 
        onClick={()=>{setOptionsToggled(true)}}></img>
        {variant.selectableOptions.map((selectableOptions: selectableOptions) => (
          <OptionDetails type={selectableOptions.type} value={selectableOptions.value}                        
          />
        ))}
      </div>
    </div>

  )
}

export default VariantDetails