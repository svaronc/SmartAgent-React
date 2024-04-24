class ForwardsMailbox < ApplicationMailbox
  def process
    ticket_id = mail.subject[/\[#(\d+)\]/, 1] # Extract ticket id from subject
    ticket = Ticket.find_by(id: ticket_id) if ticket_id

    if ticket
      ticket.update!(status_id: 1)
    else
      ticket = Ticket.create!(
        title: mail.subject,
        from_email: mail.from.first,
        customer_name: mail.from.first,
        status_id: 1,
        agent_id: 1
      )
    end

    conversation = ticket.conversations.create!(
      body: clean_body(mail),
      from_customer: true,
      ticket_id:
      )
    # ActionCable.server.broadcast('tickets', ticket)
    ActionCable.server.broadcast('tickets', ticket.as_json(include: {
        conversations: {
          methods: :attachments_urls
        },
        agent: { 
          only: [:id, :full_name] 
        }
      }))
    ActionCable.server.broadcast('conversations', conversation)
    mail.attachments.each do |attachment|
      filename = attachment.decoded
      file = StringIO.new(filename)
      conversation.attachments.attach(io: file, filename: attachment.filename)
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
