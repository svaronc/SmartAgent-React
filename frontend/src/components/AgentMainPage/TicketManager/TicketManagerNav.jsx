

function TicketManagerNav() {

  return (
    <nav>
      <section className="flex content-start navbar bg-base-100 shadow-md pl-5 w-full">
        <div className="flex-col">
          <h1 className="text-2xl font-bold mb-4">Triage - Open Tickets</h1>
          <div className="mb-4">       
            <input type="search" name="search" id="search" placeholder=" Search" className="bg-slate-100"/>
          </div>
        </div>
      </section>
    </nav>
  )
}

export default TicketManagerNav;
