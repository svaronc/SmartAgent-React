function Conversation({ 
  customer_name, 
  from_customer, 
  customer_email, 
  title, 
  body 
}) {
  return (
    <div className="mb-10 border p-5">
      <div className="mb-4 text-gray-500">
        <p>From: {from_customer ? `${customer_name} <${customer_email}>` : `SmartAgent <smartagents3@gmail.com>`}</p>
        <p>To: smartagents3@gmail.com</p>
        <p>Subject: {title} </p>
        <div className="flex-grow border-t border-gray-700 mt-4"></div>
      </div>
      <p className="text-2xl"></p>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      {/* {body} */}
    </div>
  )
};

export default Conversation;