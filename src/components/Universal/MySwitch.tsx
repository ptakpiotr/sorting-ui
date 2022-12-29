import React, { useState } from "react";
import Switch from "react-switch";

interface IProps {
  settingName: string;
  changeOption: (optionKey: string, optionValue: boolean) => void;
}

function MySwitch({ settingName, changeOption }: IProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const onChanged = (checked: boolean) => {
    setChecked(checked);
    changeOption(settingName, checked);
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
