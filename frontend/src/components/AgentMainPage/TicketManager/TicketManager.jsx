import TicketManagerNav from "./TicketManagerNav";
import TicketInbox from "./TicketInbox";

function TicketManager() {

  return (
    <section className="flex flex-col w-full">
      <TicketManagerNav />
      <TicketInbox />
    </section>
  );
}

export default TicketManager;
