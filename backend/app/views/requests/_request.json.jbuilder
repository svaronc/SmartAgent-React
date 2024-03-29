json.extract! request, :id, :from_email, :to_email, :body, :created_at, :created_at, :updated_at
json.url request_url(request, format: :json)
