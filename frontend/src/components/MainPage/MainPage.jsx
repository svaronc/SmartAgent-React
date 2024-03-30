import Sidebar from "../Sidebar/Sidebar"
import SidePanel from "../SidePanel/SidePanel"
import TicketManager from "../TicketManager/TicketManager"

function MainPage() {
  return (
    <div className="h-screen flex">
      <Sidebar/>
      <SidePanel/>
      <TicketManager />
    </div>
  )
}

export default MainPage
