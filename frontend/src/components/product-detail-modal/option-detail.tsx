import { useState } from "react";
import './option-detail.css';

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
  const filteredValues = values.filter((item, index) => values.indexOf(item) === index);
  const [selected, setSelected] = useState("")
  const [numberOfOptionDropdowns, setNumberOfOptionDropdowns] = useState(0)
  
  // This is never triggered.
  const setOption = (event: any) => {
    console.log("Selected?", selected)
    setSelected(event.target.value)
  }

  
  const Dropdown = ({ label, value, options, onChange }: IPropsDropDown) => {
    return (
      <label className="option-detail">
        {label}: &nbsp;&nbsp;&nbsp;
        <select className="option" value={value} onChange={onChange}>
          {options.map((option) => (
            <option className="option" value={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <>
      <Dropdown label={type} value={selected} options={filteredValues} onChange={setOption} />
    </>
  )
}

export default OptionDetail