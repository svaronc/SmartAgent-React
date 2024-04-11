import { menuItems } from "../../../constants/sidebar-menu-items"
import { Link } from "react-router-dom"

function IconSidebar() {
  return (
    <ul className="menu bg-base-100 content-center w-[75px] border-r-8 border-double h-full">
    {menuItems.map((item, index) => (
      <li key={index}>
        <Link to={item.path} className="tooltip tooltip-right mt-10" data-tip={item.tooltip}>
          {item.icon}
        </Link>
      </li>
    ))}
  </ul>
  )
}

export default IconSidebar
