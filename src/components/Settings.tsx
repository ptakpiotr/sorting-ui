import * as React from "react";
import Switch from "./Universal/MySwitch";
import { useSettingsStore } from "../App";
import { ISettingsState } from "../Types";
import AuthComponent from "./Universal/AuthComponent";
import Admin from "./Admin";
import { useState } from "react";
function Settings() {
  const { settings, setSettingsOption } = useSettingsStore(
    (st: ISettingsState) => st
  );
  const [color, setColor] = useState<string>("");

  const changeOption = (optionKey: string, optionValue: boolean) => {
    setSettingsOption(
      {
        ...settings,
        [optionKey]: optionValue,
      },
      color
    );
  };
  return (
    <main>
      <table>
        <tbody>
          {Object.keys(settings)
            .slice(0, 2)
            .map((s) => {
              return (
                <tr>
                  <td>{s}</td>
                  <td>
                    <Switch
                      key={`setting-${s}`}
                      settingName={s}
                      basicChecked={(settings as any)[s]}
                      changeOption={changeOption}
                    />
                  </td>
                </tr>
              );
            })}
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setSettingsOption({ ...settings }, e.target.value);
              setColor(e.target.value);
            }}
            title="Color"
          />
        </tbody>
      </table>
      <AuthComponent verifyAdmin={true}>
        <Admin />
      </AuthComponent>
    </main>
  );
}

export default Settings;
