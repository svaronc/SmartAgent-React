class Ticket < ApplicationRecord
  belongs_to :agent
  belongs_to :request
  belongs_to :status
end
