import Sidebar from "../Sidebar/Sidebar"
import SidePanel from "../Sidepanel/SidePanel"

function MainPage() {
  return (
    <div className="h-screen flex">
      <Sidebar/>
      <SidePanel/>
    </div>
  )
}

export default MainPage
