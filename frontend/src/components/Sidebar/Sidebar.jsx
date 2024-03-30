import { menuItems } from "../../constants/index"

function Sidebar() {
  return (
    <ul className="menu bg-base-200 content-center h-screen w-[75px] border-r-8 border-double">
    {menuItems.map((item, index) => (
      <li key={index}>
        <a className="tooltip tooltip-right mt-10" data-tip={item.tooltip}>
          {item.icon}
        </a>
      </li>
    ))}
  </ul>
  )
}

export default Sidebar
