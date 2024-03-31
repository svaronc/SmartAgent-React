import { useAppContext } from "../../../context/AppContext";

function TicketManagerNav() {
  const { state } = useAppContext();

  return (
    <nav>
      <section className="flex content-start navbar bg-base-100 shadow-md pl-5 w-full">
        <div className="flex-col items-start">
          <h1 className="text-2xl font-bold mb-4">{state.ticketManagerView}</h1>
          <div className="mb-4">       
            <input type="search" name="search" id="search" placeholder=" Search" className="bg-slate-100"/>
          </div>
        </div>
      </section>
    </nav>
  )
}

export default TicketManagerNav;
