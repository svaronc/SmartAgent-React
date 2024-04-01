class Ticket < ApplicationRecord
  belongs_to :agent
  belongs_to :request, dependent: :destroy
  belongs_to :status
end
