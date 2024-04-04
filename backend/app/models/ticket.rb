class Ticket < ApplicationRecord
  has_many :conversations
  has_many_attached :attachments
end
