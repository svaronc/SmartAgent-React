import Sidebar from "../Sidebar/Sidebar"
import SidePanel from "../SidePanel/SidePanel"

function MainPage() {
  return (
    <div className="h-screen flex">
      <Sidebar/>
      <SidePanel/>
    </div>
  )
}

export default MainPage
