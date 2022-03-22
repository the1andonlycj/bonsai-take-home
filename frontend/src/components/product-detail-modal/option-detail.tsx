import { useState } from "react";
import { Option } from "../../redux/constants/product-types";
import { SelectableOption } from "../../redux/constants/product-types";

interface IProps {
  type: string,
  values: string[],
}

interface IPropsDropDown {
  label: string,
  value: string,
  options: string[],
  onChange: (a: any) => void
}

function OptionDetail({type, values}: IProps) {
  console.log("SHOWMEVALUES", values)
  const [selected, setSelected] = useState("")
  // Returns a list where no values are repeated:
  const filteredValues = values.filter((item, index) => values.indexOf(item) === index);

  const setOption = (event: any) => {
    setSelected(event.target.value)
  }

  const Dropdown = ({ label, value, options, onChange }: IPropsDropDown) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <>
      {/* {filteredValues.map((value: string) => ( */}
        <Dropdown label={type} value={selected} options={filteredValues} onChange={setOption} />
      {/* ))} */}
    </>
  )
}

export default OptionDetail

// IDEAL: color: [red, blue, green], material: [stuff, thing, doodad]