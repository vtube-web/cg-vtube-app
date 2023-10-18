
import { NavLink, useMatch } from "react-router-dom";

const NavItem = ({ menu }) => {

  const match = useMatch({
    path: menu.to,
    exact: true,
  });

  const isActive = match !== null;

  return (
    <>
      <li className="nav-item">
        <NavLink to={menu.to} className={isActive ? "current" : ""}>
          {menu.title}
        </NavLink>
      </li>
    </>
  );
};

export default NavItem;