class ForwardsMailbox < ApplicationMailbox
  def process
    ticket_id = mail.subject[/\[#(\d+)\]/, 1] # Extract ticket id from subject
    ticket = Ticket.find_by(id: ticket_id) if ticket_id

    if ticket
      # If a ticket with the id exists, create a new conversation for it
      ticket.conversations.create!(
        body: clean_body(mail),
        from_customer: true,
        ticket_id:
      )
    else
      # If no such ticket exists, create a new ticket and a new conversation
      ticket = Ticket.create!(
        title: mail.subject,
        from_email: mail.from.first,
        customer_name: mail.from.first,
        status_id: 1,
        agent_id: 1
      )
      ticket.conversations.create!(
        body: clean_body(mail),
        from_customer: true,
        ticket_id:
      )
    end
  end

  private

  def clean_body(mail)
    body = (mail.html_part&.decoded || mail.body.decoded).split("\r\n\r\n", 2).first
    body.gsub(/(On\s.*wrote:\n>.*\n)+/m, '')
    body.gsub(/(El\s.*escribió:\n>.*\n)+/m, '')
    body.gsub(/<div class="gmail_quote">.*/m, '')
  end
end
