class Note < ApplicationRecord
  belongs_to :ticket
  belongs_to :agent
end
