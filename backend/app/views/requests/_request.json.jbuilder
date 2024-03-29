json.extract! request, :id, :from_email, :customer_name, :title, :body,:created_at, :updated_at
json.url request_url(request, format: :json)
