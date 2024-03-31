class Request < ApplicationRecord
  attr_accessor :default_status_id, :default_agent_id
  has_many :tickets
  after_create :create_ticket

  private

  def create_ticket
    Ticket.create!(request_id: self.id, status_id: default_status_id, agent_id: default_agent_id)
  end
end
