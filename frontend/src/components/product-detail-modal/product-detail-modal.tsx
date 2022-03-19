import { useState, useEffect } from 'react';

import './product-detail-modal.css';
import VariantDetails from './variant-details';

const ProductDetailModal = () => {
  const [variantsToggled, setVariantsToggled] = useState(false)


  // We're passing in THE ENTIRE PRODUCT here, not just the variant information, because we won't have name or description otherwise. 
  // Before modal is deployed, we need to know what kind of variants we're dealing with.
  // If we have a card selector layout for variants, we can then just have a simpler card structure for the variant itself, including its selectableOptions. 
  // if(variants.length = 1) {show a single card with its options}
  // if(variants.length > 1) {show something different so the user can understand that there are multiple variants, each of which, when toggled, will show the regular single card with its options modal}
  // We have DIFFERENT IMAGES for those variants, so we could show it using those images. Perhaps we take a few colors from Bonsai's pages to make a pallette, use those colors to put some borders around the boxes that the photos are in. If we do that, the view doesn't have to change too much. 

  // There can be many variants or just the one. If we pass in the variant array, it will look something like this: 
  let onlyOneVariant = {
    defaultImage: "https://picsum.photos/id/16/200",
    description: "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    id: "6ebc93ce-0487-4f66-9d46-c2a2bb5ae431",
    isDiscontinued: false,
    name: "Gorgeous Cotton Table",
    variants: [
      {
        id: "7d82c929-d50d-4473-b582-c14f9137a729",
        image: "https://picsum.photos/id/15/200",
        isDiscontinued: true,
        priceCents: 3033,
        quantity: 2,
        selectableOptions: [{
          type: "material",
          value: "Metal",
        }]
      }
    ]
  }

  let variantWithTwoSelectableOptions = { 
    defaultImage: "https://picsum.photos/id/16/200",
    description: "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    id: "6ebc93ce-0487-4f66-9d46-c2a2bb5ae431",
    isDiscontinued: false,
    name: "Gorgeous Cotton Table",
    variants: [
      {
        id: "4bce43f4-08ad-4886-b7c6-8abf6271e208",
        image: "https://picsum.photos/id/76/200",
        isDiscontinued: false,
        priceCents: 15546,
        quantity: 9,
        selectableOptions: [{
          type: "material",
          value: "Metal"
        },
        {
          type: "size",
          value: "S"
        }]
      }
    ]
  }

  let threeVariantsWithTheirOwnSelectableOptions = {
    defaultImage: "https://picsum.photos/id/16/200",
    description: "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    id: "6ebc93ce-0487-4f66-9d46-c2a2bb5ae431",
    isDiscontinued: false,
    name: "Gorgeous Cotton Table",
    variants: [
      {id: "c74355b2-c824-41e0-9ad6-f27597e92fb2",
        image: "https://picsum.photos/id/67/200",
        isDiscontinued: false,
        priceCents: 7722,
        quantity: 9,
        selectableOptions: [
          {
            type: "color",
            value: "red"
          },
          {
            type: "size",
            value: "S"
          }
        ]
      },
      {
        id: "9ef5c44e-2f35-41d5-8093-5cf858acfd2b",
        image: "https://picsum.photos/id/48/200",
        isDiscontinued: false,
        priceCents: 11595,
        quantity: 2,
        selectableOptions: [
          {
            type: "color",
            value: "blue"
          },
          {
          type: "size",
          value: "M"
          }
        ]
      },
      {
        id: "33514350-0f3f-4d77-963b-3b798b9a75a2",
        image: "https://picsum.photos/id/81/200",
        isDiscontinued: true,
        priceCents: 8319,
        quantity: 8,
        selectableOptions: [
          {
            type: "color",
            value: "blue"
          },
          {
            type: "size",
            value: "XL"
          }
        ]
      }
    ]
  }

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
  }

  let input = threeVariantsWithTheirOwnSelectableOptions;

  // Once you're doing types, make sure to include the input as params here!
  useEffect(() => {
    if(input.variants.length > 1) {
      setVariantsToggled(true)
    };
  }, [])
  
  return (
    <div className="product-detail-modal">
      <div className="modal-column-left">
        <img src={input.defaultImage} alt={input.name}></img>
        <div className='modal-text-container'>
          <h2>{input.name}</h2>
          <p>{input.description}</p>
        </div>
      </div>
      <div className="modal-column-right">
        <div className="modal-options-container">
          {/* INSTALL ONCLICK TO CLOSE MODAL: PASS FUNCTION DOWN FROM PARENT PRODUCT-CARD */}
          <button><strong>X Close</strong></button>
          {variantsToggled &&
            <div>
              <p>You've got options:</p>
                <div className="modal-variant-image-container">
                  {input.variants.map((variant: Variant, index: number) => (
                    // MISSING: Variants should have descriptive language for alt tags!!!
                    <VariantDetails 
                      id={variant.id} 
                      image={variant.image} 
                      isDiscontinued={variant.isDiscontinued} 
                      priceCents={variant.priceCents} 
                      quantity={variant.quantity} 
                      selectableOptions={variant.selectableOptions} 
                      number={index}
                    />
                  ))}
                </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal;