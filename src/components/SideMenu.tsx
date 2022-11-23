import React, { useEffect, useRef, useState } from "react";
import {
  AiFillHome,
  AiFillContacts,
  AiFillPushpin,
  AiOutlineUserSwitch,
  AiOutlineUserAdd,
} from "react-icons/ai";
import MenuLink from "./MenuLink";
function SideMenu() {
  const asideRef = useRef<HTMLDivElement>(null);
  const [fullWidthClass, setFullWidthClass] = useState<string>("");
  const [alwaysFull, setAlwaysFull] = useState<boolean>(false);

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
        href={"/"}
        title="Home"
        fullWidth={fullWidthClass.length > 0 || alwaysFull}
      />
      <MenuLink
        icon={<AiFillContacts color={"whitesmoke"} />}
        href={"/about"}
        title="About"
        fullWidth={fullWidthClass.length > 0 || alwaysFull}
      />
      <MenuLink
        icon={<AiOutlineUserSwitch color={"whitesmoke"} />}
        href={"/login"}
        title="Login"
        fullWidth={fullWidthClass.length > 0 || alwaysFull}
      />
      <MenuLink
        icon={<AiOutlineUserAdd color={"whitesmoke"} />}
        href={"/register"}
        title="Register"
        fullWidth={fullWidthClass.length > 0 || alwaysFull}
      />
    </aside>
  );
}

export default SideMenu;
