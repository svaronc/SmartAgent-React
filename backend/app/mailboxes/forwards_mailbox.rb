class ForwardsMailbox < ApplicationMailbox
  def process
    Request.create!(
      title: mail.subject,
      body: mail.text_part&.decoded || mail.body.decoded,
      from_email: mail.from.first,
      customer_name: mail.from.first,
      default_status_id:,
      default_agent_id:
    )
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
end
