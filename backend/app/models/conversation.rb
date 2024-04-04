class Conversation < ApplicationRecord
  belongs_to :ticket
  has_many_attached :attachments

  def attachments_urls
    attachments.map do |attachment|
      Rails.application.routes.url_helpers.rails_blob_url(attachment)
    end
  end
end
