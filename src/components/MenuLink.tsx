import * as React from "react";

interface IProps {
  icon: JSX.Element;
  title: string;
  href: string;
  fullWidth: boolean;
}

function MenuLink({ icon, title, href, fullWidth }: IProps) {
  return (
    <div className="menu-link">
      <a href={href} title={title}>
        {icon}{" "}
        <span className="menu-link-content">{fullWidth ? title : ""}</span>
      </a>
    </div>
  );
}

export default MenuLink;
