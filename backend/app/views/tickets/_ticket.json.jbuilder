json.extract! ticket, :id, :agent_id, :customer_id, :request_id, :status_id, :created_at, :updated_at
json.url ticket_url(ticket, format: :json)
