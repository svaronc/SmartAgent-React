import axios from "axios";
import { useEffect, useState } from "react";
import { FaNotesMedical } from "react-icons/fa6";

function NotesSidePanel({ ticket_id }) {
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    axios.get("api/v1/notes").then((response) => {
      const filterNotes = response.data.filter(
        (note) => note.ticket_id === ticket_id
      );
      setnotes(filterNotes);
    });
  }, [ticket_id]);

  return (
    <div className="bg-white border-r-4 border-double absolute z-10 h-[90%] w-[25%] right-0 rounded-2xl shadow-2xl overflow-scroll">
      <div className="flex justify-between mt-5">
        <a className="btn btn-ghost lg:text-3xl text-xl font-bold mb-8">
          <img src="/SmartAgent-icon.svg" alt="SmartAgent icon" width="45" />
          Tickets Notes
        </a>
        <button className="btn btn-ghost lg:text-3xl text-xl font-bold mb-8">
          <FaNotesMedical className="w-6 h-6"/>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4 ml-4 mt-2">Notes</h1>
      <div>
        {notes.map((note) => {
          const date = new Date(note.updated_at);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
          return (
            <ul key={note.id}>
              <li className="ring-yellow-600/20 ml-2 mr-2 mb-1 pt-1 pb-1 pl-2 pr-2  w-[90%]">
                <p className="text-slate-400">{formattedDate}</p>
                <span className="inline-flex items-center mr-2 rounded-sm bg-yellow-50 px-2 py-1 font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                  {note.body}
                </span>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default NotesSidePanel;
