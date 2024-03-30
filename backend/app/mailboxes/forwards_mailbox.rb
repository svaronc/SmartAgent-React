class ForwardsMailbox < ApplicationMailbox
  def process
    Request.create!(
      title: mail.subject,
      body: mail.text_part&.decoded || mail.body.decoded,
      from_email: mail.from.first,
      customer_name: mail.from.first
    )
  end
end
