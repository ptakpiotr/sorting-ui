import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  AiFillHome,
  AiFillContacts,
  AiFillPushpin,
  AiOutlineUserSwitch,
  AiOutlineUserAdd,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineHistory,
} from "react-icons/ai";
import MenuLink from "./MenuLink";
function SideMenu() {
  const asideRef = useRef<HTMLDivElement>(null);
  const [fullWidthClass, setFullWidthClass] = useState<string>("");
  const [alwaysFull, setAlwaysFull] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") !== null);
  }, []);

  const handleHover = (enter: boolean) => {
    setFullWidthClass(enter ? "full-aside" : "");
  };
  return (
    <aside
      onMouseEnter={() => {
        handleHover(true);
      }}
      onMouseLeave={() => {
        handleHover(false);
      }}
      ref={asideRef}
      className={fullWidthClass}
    >
      <div
        style={{
          display: fullWidthClass.length > 0 || alwaysFull ? "block" : "none",
        }}
        className="side-menu-pin"
      >
        <AiFillPushpin
          onClick={() => {
            setAlwaysFull((prev) => !prev);
          }}
        />
      </div>
      <MenuLink
        icon={<AiFillHome color={"whitesmoke"} />}
        href={"./index.html"}
        title="Home"
        fullWidth={fullWidthClass.length > 0 || alwaysFull}
      />
      <MenuLink
        icon={<AiFillContacts color={"whitesmoke"} />}
        href={"./about.html"}
        title="About"
        fullWidth={fullWidthClass.length > 0 || alwaysFull}
      />
      <MenuLink
        icon={<AiOutlineHistory color={"whitesmoke"} />}
        href={"./history.html"}
        title="History"
        fullWidth={fullWidthClass.length > 0 || alwaysFull}
      />
      <MenuLink
        icon={<AiOutlineSetting color={"whitesmoke"} />}
        href={"./settings.html"}
        title="Settings"
        fullWidth={fullWidthClass.length > 0 || alwaysFull}
      />
      {loggedIn ? (
        <MenuLink
          icon={<AiOutlineLogout color={"whitesmoke"} />}
          href={"./logout.html"}
          title="Logout"
          fullWidth={fullWidthClass.length > 0 || alwaysFull}
        />
      ) : (
        <>
          <MenuLink
            icon={<AiOutlineUserSwitch color={"whitesmoke"} />}
            href={"./login.html"}
            title="Login"
            fullWidth={fullWidthClass.length > 0 || alwaysFull}
          />
          <MenuLink
            icon={<AiOutlineUserAdd color={"whitesmoke"} />}
            href={"./register.html"}
            title="Register"
            fullWidth={fullWidthClass.length > 0 || alwaysFull}
          />
        </>
      )}
    </aside>
  );
}

export default SideMenu;
