import { useAppContext } from "../../../context/AppContext";

// Components
import TicketManagerNav from "./TicketManagerNav";
import TicketInbox from "./TicketInbox";
import TicketInfo from "./TicketInfo";
import useApplicationData from "../../../hooks/useApplicationData";

function TicketManager() {
  const { state } = useAppContext();
  const { getTicketCounts } = useApplicationData();
  getTicketCounts();
  return (
    <section className="flex flex-col w-full">
      <TicketManagerNav />
      {state.ticketInboxView ? <TicketInbox /> : <TicketInfo />}
    </section>
  );
}

export default TicketManager;
