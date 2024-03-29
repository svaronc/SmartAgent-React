class Ticket < ApplicationRecord
  belongs_to :agent
  belongs_to :customer
  belongs_to :request
  belongs_to :status
end
