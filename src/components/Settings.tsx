import React, { useEffect, useState } from "react";
import Switch from "./Universal/MySwitch";
import { ISettings } from "../Types";
import { useSettingsStore } from "../App";
function Settings() {
  const { settings, setSettingsOption } = useSettingsStore((st: any) => st);
  useEffect(() => {}, []);

  const changeOption = (optionKey: string, optionValue: boolean) => {
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
