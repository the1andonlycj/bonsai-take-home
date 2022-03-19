
interface selectableOptions {
  type: string;
  value: string;
};

function OptionDetails(selectableOptions: selectableOptions) {
  console.log("SELECOPTIONS?", selectableOptions)
  return (
    <>
      <h3>{selectableOptions.type}: {selectableOptions.value}</h3>
    </>
  )
}

export default OptionDetails