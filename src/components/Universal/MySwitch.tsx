import React, { useState } from "react";
import Switch from "react-switch";

function MySwitch() {
  const [checked, setChecked] = useState<boolean>(false);
  const onChanged = (checked: boolean) => {
    setChecked(checked);
  };
  return (
    <Switch
      onChange={onChanged}
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      onColor="#00bfff"
    />
  );
}

export default MySwitch;
