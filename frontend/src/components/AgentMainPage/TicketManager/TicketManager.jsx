import { useAppContext } from "../../../context/AppContext";

// Components
import TicketManagerNav from "./TicketManagerNav";
import TicketInbox from "./TicketInbox";
import TicketInfo from "./TicketInfo";

function TicketManager() {
  const { state } = useAppContext();

  return (
    <section className="flex flex-col w-full">
      <TicketManagerNav />
      {state.ticketInboxView ? <TicketInbox /> : <TicketInfo />}
    </section>
  );
}

export default TicketManager;
