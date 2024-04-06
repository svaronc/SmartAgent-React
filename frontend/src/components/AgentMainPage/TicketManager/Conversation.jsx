function Conversation({
  customer_name,
  from_customer,
  customer_email,
  created_at,
  title,
  body,
}) {
  const getConversationDivClassName = (from_customer) => {
    return from_customer
      ? "mb-10 border p-5 dark:bg-gray-700"
      : "mb-10 border p-5 bg-gray-100 dark:bg-inherit";
  };

  const getConversationInfoDivClassName = (from_customer) => {
    return from_customer ? "mb-4 text-gray-400" : "mb-4 text-gray-500";
  };

  const initial = Array.from(customer_name)[0];

  return (
    <div className={getConversationDivClassName(from_customer)}>
      <div
        id="conversation-info-heading"
        className="flex flex-row justify-between"
      >
        <div className={getConversationInfoDivClassName(from_customer)}>
          {from_customer ? (
            <div>
              <div className="conversation-author flex flex-row gap-2 font-bold text-white text-2xl mb-1">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8">
                    <span className="text-xs">{initial}</span>
                  </div>
                </div>
                {customer_name}
                <span className="font-normal"> wrote</span>
              </div>

              {/* From customer email details */}
              <p>
                From: {customer_name} &lt;{customer_email}&gt;
              </p>
              <p>To: SmartAgent &lt;smartagents3@gmail.com&gt;</p>
            </div>
          ) : (
            <div>
              <div className="conversation-author flex flex-row gap-2 font-bold text-white text-2xl mb-1">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8">
                    <span className="text-xs">S</span>
                  </div>
                </div>
                SmartAgent
                <span className="font-normal"> wrote</span>
              </div>

              {/* To customer email details */}
              <p>From: SmartAgent &lt;smartagents3@gmail.com&gt;</p>
              <p>
                To: {customer_name} &lt;{customer_email}&gt;
              </p>
            </div>
          )}
          <p>Subject: {title} </p>
        </div>
        <div>{created_at}</div> {/* Need to format datetime */}
      </div>
      <div className="flex-grow border-t dark:inherit mb-4"></div>{" "}
      {/* Divider */}
      <div
        className="dark:text-white"
        dangerouslySetInnerHTML={{ __html: body }}
      />{" "}
      {/* Body of conversation */}
    </div>
  );
}

export default Conversation;
