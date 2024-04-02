class ApplicationMailer < ActionMailer::Base
  default from: 'smartagents3@gmail.com'
  layout 'mailer'

  def ticket_response(ticket, response)
    @ticket = ticket
    @response = response

    # Create a new conversation for the ticket with the body of the response
    @ticket.conversations.create!(
      body: @response,
      from_customer: false
    )

    mail(to: @ticket.from_email, subject: "Re: [##{@ticket.id}] Ticket response")
  end
end
