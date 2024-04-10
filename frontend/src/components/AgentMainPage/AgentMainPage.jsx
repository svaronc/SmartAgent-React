// import Navbar from "./Navbar"
// import IconSidebar from "./SidePanel/IconSidebar"
import TicketSidePanel from "./SidePanel/TicketSidePanel"
import TicketManager from "./TicketManager/TicketManager"

function AgentMainPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="flex flex-row flex-grow h-full">
        {/* <IconSidebar /> */}
        <TicketSidePanel/>
        <TicketManager />
      </div>
    </div>
  )
}

export default AgentMainPage
