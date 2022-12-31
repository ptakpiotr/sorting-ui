import React, { useEffect, useState } from "react";
import Switch from "./Universal/MySwitch";
import { useSettingsStore } from "../App";
import { ISettingsState } from "../Types";
function Settings() {
  const { settings, setSettingsOption } = useSettingsStore(
    (st: ISettingsState) => st
  );
  useEffect(() => {}, []);

  const changeOption = (optionKey: string, optionValue: boolean) => {
    console.log(settings);
    setSettingsOption({
      ...settings,
      [optionKey]: optionValue,
    });
  };
  return (
    <main>
      <table>
        <tbody>
          {Object.keys(settings).map((s) => {
            return (
              <tr>
                <td>{s}</td>
                <td>
                  <Switch
                    key={`setting-${s}`}
                    settingName={s}
                    basicChecked={true}
                    changeOption={changeOption}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default Settings;
