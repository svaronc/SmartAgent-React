class ApplicationMailer < ActionMailer::Base
  default from: 'smartagents3@gmail.com'
  layout 'mailer'

  def ticket_response(ticket, response)
    @ticket = ticket
    @response = response
    mail(to: @ticket.request.from_email, subject: 'Ticket response', body: @response)
  end
end
