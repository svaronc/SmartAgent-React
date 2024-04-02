class RequestMailer < ApplicationMailer
  def request_mail(request, conversation)
    @conversation = conversation
    @request = request
    mail(to: '0bf1972c471cd20068ab250c48230595@inbound.postmarkapp.com', subject: @request.title,
         from: @request.from_email, reply_to: @request.from_email)
  end
end
