import * as React from "react";
import Switch from "./Universal/MySwitch";
import { HexColorPicker } from "react-colorful";
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
      <h3
        style={{
          display: "inline-block",
        }}
      >
        Settings
      </h3>
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

          <tr>
            <td>barColor</td>
            <td>
              <HexColorPicker
                color={color}
                onChange={(val) => {
                  setSettingsOption({ ...settings }, val);
                  setColor(val);
                }}
                title="Color"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <AuthComponent verifyAdmin={true}>
        <Admin />
      </AuthComponent>
    </main>
  );
}

export default Settings;
