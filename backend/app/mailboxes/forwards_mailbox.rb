class ForwardsMailbox < ApplicationMailbox
  def process
    parent_conversation = Conversation.find_by(message_id: [mail.in_reply_to, *mail.references].compact)

    if parent_conversation
      # If a parent conversation exists, create a new conversation linked to the same request
      parent_conversation.request.conversations.create!(
        body: mail.html_part&.decoded || mail.body.decoded,
        from_customer: true,
        message_id: mail.message_id
      )
    else
      # If no such request exists, create a new request
      request = Request.create!(
        title: mail.subject,
        from_email: mail.from.first,
        customer_name: mail.from.first,
        default_status_id:,
        default_agent_id:
      )
      request.conversations.create!(
        body: clean_body(mail),
        from_customer: true,
        message_id: mail.message_id
      )
    end
  end

  private

  def default_status_id
    # ID of the default status
    1
  end

  def default_agent_id
    # ID of the default agent
    1
  end

  def clean_body(mail)
    body = (mail.html_part&.decoded || mail.body.decoded).split("\r\n\r\n", 2).first
    body.gsub(/(On\s.*wrote:\n>.*\n)+/m, '')
  end
end
