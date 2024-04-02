# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
Agent.destroy_all
Role.destroy_all
Request.destroy_all
Status.destroy_all
Ticket.destroy_all
Conversation.destroy_all

# Seed data for roles
role_admin = Role.create(role: 'Admin', description: 'Administrator role')
role_user = Role.create(role: 'User', description: 'User role')

# Seed data for agents table
agent_triage = Agent.create(email: 'triage@gmail.com', username: 'triage', password: 'password', role_id: role_admin.id)
agent_sebastian = Agent.create(email: 'sebastianvaron96@gmail.com', username: 'svaronc', password: 'password',
                               role_id: role_admin.id)
agent_gloria = Agent.create(email: 'glorialimartt@gmail.com', username: 'glowiep', password: 'password',
                            role_id: role_admin.id)

# Seed data for statuses
status_open = Status.create(description: 'Open')
status_closed = Status.create(description: 'Closed')

# Seed data for requests and conversations
request1 = Request.create(from_email: 'john@example.com', customer_name: 'John Doe',
                          title: 'Test Request 1', default_status_id: status_open.id, default_agent_id: agent_triage.id)
Conversation.create(request_id: request1.id, body: 'This is a test request', from_customer: true)

request2 = Request.create(from_email: 'jane@example.com', customer_name: 'Jane Smith',
                          title: 'Test Request 2', default_status_id: status_open.id, default_agent_id: agent_triage.id)
Conversation.create(request_id: request2.id, body: 'This is another test request', from_customer: true)
