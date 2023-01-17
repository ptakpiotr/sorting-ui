import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSettingsStore } from "../App";
import { ISettingsState } from "../Types";
import { init } from "../createPage";
function Logout() {
  const { settings } = useSettingsStore((st: ISettingsState) => st);

  useEffect(() => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/profile`,
        {
          ...settings,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => {
        console.error("Couldn't update user profile settings");
      });

    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    window.location.href = "./index.html";
  }, []);

  return <></>;
}

init(<Logout />);
