import { MdDashboard,MdEmail, MdOutlineChatBubble, MdLocalPhone,MdContacts,MdOutlineSettings    } from "react-icons/md";

function Sidebar() {
  return (
    <ul className="menu bg-base-200 content-center h-screen w-[100px] border-r-neutral-800 border-double">
  <li>
    <a className="tooltip tooltip-right mt-10" data-tip="Dashboard">
      <MdDashboard className="w-[30px] h-[30px] "/>
    </a>
  </li>
  <li>
    <a className="tooltip tooltip-right mt-10" data-tip="Emails">
    <MdEmail className="w-[30px] h-[30px] "/>
     
    </a>
  </li>
  <li>
    <a className="tooltip tooltip-right mt-10" data-tip="Chat">
    <MdOutlineChatBubble className="w-[30px] h-[30px] "/>
      
    </a>
  </li>
  <li>
    <a className="tooltip tooltip-right mt-10" data-tip="Calls">
    <MdLocalPhone className="w-[30px] h-[30px] "/>
      
    </a>
  </li>
  <li>
    <a className="tooltip tooltip-right mt-10" data-tip="Calls">
    <MdContacts className="w-[30px] h-[30px] "/>
      
    </a>
  </li>
  <li>
    <a className="tooltip tooltip-right mt-10" data-tip="Calls">
    <MdOutlineSettings className="w-[30px] h-[30px] "/>
      
    </a>
  </li>
</ul>
  )
}

export default Sidebar
