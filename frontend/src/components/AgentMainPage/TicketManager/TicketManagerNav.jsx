import { useAppContext } from "../../../context/AppContext";

function TicketManagerNav() {
  const { state } = useAppContext();
  console.log(state)
  return (
    <nav>
        {state.ticketInboxView ? 
          <section className="flex content-start navbar bg-base-100 shadow-md pl-5 w-full">
            <div className="flex-col items-start">
              <h1 className="text-2xl font-bold mb-4">{state.ticketManagerView}</h1>
              <div className="mb-4">       
                <input type="search" name="search" id="search" placeholder=" Search" className="bg-slate-100"/>
              </div>
            </div> 
          </section> :
          <>
          {/* <h1 className="text-2xl font-bold mb-4">Ticket Assigned to: </h1> */}
          </>
        }
    </nav>
  )
}

export default TicketManagerNav;
