import IconSidebar from "./SidePanel/IconSidebar"
import TicketSidePanel from "./SidePanel/TicketSidePanel"
import TicketManager from "./TicketManager/TicketManager"

function AgentMainPage() {
  return (
    <div className="h-screen flex">
      <IconSidebar/>
      <TicketSidePanel/>
      <TicketManager />
    </div>
  )
}

export default AgentMainPage
