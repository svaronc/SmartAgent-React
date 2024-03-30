import { MdDashboard,MdEmail, MdOutlineChatBubble, MdLocalPhone,MdContacts,MdOutlineSettings    } from "react-icons/md";


export const menuItems = [
  { icon: <MdDashboard className="w-[30px] h-[30px] "/>, tooltip: 'Dashboard' },
  { icon: <MdEmail className="w-[30px] h-[30px] "/>, tooltip: 'Emails' },
  { icon: <MdOutlineChatBubble className="w-[30px] h-[30px] "/>, tooltip: 'AI Chatbot' },
  { icon: <MdContacts className="w-[30px] h-[30px] "/>, tooltip: 'Contacts' },
  { icon: <MdOutlineSettings className="w-[30px] h-[30px] "/>, tooltip: 'Settings' },
];