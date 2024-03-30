import { sidePanelItems } from "../../constants/side-panel-items"

function SidePanel() {
  return (
    <div className="bg-base-200 mr-5 ml-5 border-r-4 border-double">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      {/* <input type="search" name="search" id="search" placeholder="search" /> */}
      
      <div>
        <ul>
          {sidePanelItems.map((item, index) => (
            <li class="ring-yellow-600/20 mr-5 mb-1 pt-1 pb-1 pl-2 pr-2 hover:bg-blue-50 rounded cursor-pointer">
              <span class="inline-flex items-center mr-2 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                #
              </span>
              <label class="cursor-pointer" htmlFor="status">{item.title}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SidePanel;
