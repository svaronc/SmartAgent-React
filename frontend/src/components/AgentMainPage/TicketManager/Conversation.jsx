function Conversation({
  customer_name,
  from_customer,
  customer_email,
  title,
  body,
}) {
  console.log(from_customer)
  const getConversationDivClassName = (from_customer) => {
    return from_customer 
      ? "mb-10 border p-5 dark:bg-gray-700" 
      : "mb-10 border p-5 bg-gray-100 dark:bg-inherit";
  }

  const getConversationInfoDivClassName = (from_customer) => {
    return from_customer 
    ? "mb-4 text-gray-400" 
    : "mb-4 text-gray-500";
  }

  return (
    <div className={getConversationDivClassName(from_customer)}>
      <div className={getConversationInfoDivClassName(from_customer)}>
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
        <div className="flex-grow border-t dark:inherit mt-4"></div> {/* Divider */}
      </div>
      <div className="dark:text-white" dangerouslySetInnerHTML={{ __html: body }} /> {/* Body of conversation */}
    </div>
  );
}

export default Conversation;
