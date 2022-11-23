import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  icon: JSX.Element;
  title: string;
  href: string;
  fullWidth: boolean;
}

function MenuLink({ icon, title, href, fullWidth }: IProps) {
  return (
    <div className="menu-link">
      <Link to={href} title={title}>
        {icon}{" "}
        <span className="menu-link-content">{fullWidth ? title : ""}</span>
      </Link>
    </div>
  );
}

export default MenuLink;
