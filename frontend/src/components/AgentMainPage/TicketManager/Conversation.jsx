function Conversation({
  customer_name,
  from_customer,
  customer_email,
  title,
  body,
}) {
  return (
    <div className="mb-10 border p-5">
      <div className="mb-4 text-gray-500">
        {from_customer ? (
          <div>
            {/* From customer email details */}
            <p>
              From: {customer_name} &lt;{customer_email}&gt;
            </p>
            <p>To: SmartAgent &lt;smartagents3@gmail.com&gt;</p>
          </div>
        ) : (
          <div>
            {/* To customer email details */}
            <p>From: SmartAgent &lt;smartagents3@gmail.com&gt;</p>
            <p>
              To: {customer_name} &lt;{customer_email}&gt;
            </p>
          </div>
        )}
        <p>Subject: {title} </p>
        <div className="flex-grow border-t border-gray-700 mt-4"></div>
      </div>
      <p className="text-2xl"></p>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}

export default Conversation;
