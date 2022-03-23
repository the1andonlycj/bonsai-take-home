import { useState } from "react";
import { useDispatch } from "react-redux";
import { SelectedOptions } from "../../redux/actions/productActions";

import './option-detail.css';

interface IProps {
  type: string,
  values: string[],
};

interface IPropsDropDown {
  label: string,
  value: string,
  options: string[],
  onChange: (a: any) => void
};

function OptionDetail({type, values}: IProps) {
  const dispatch = useDispatch();
  const filteredValues = values.filter((item, index) => values.indexOf(item) === index);
  const [selected, setSelected] = useState("");
  
  const setOption = (event: any) => {
    const value = event.target.value;
    setSelected(value);
    dispatch(SelectedOptions({type, value}));
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
    <Dropdown label={type} value={selected} options={filteredValues} onChange={setOption} />
  )
}

export default OptionDetail;