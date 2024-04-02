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
Status.destroy_all
Ticket.destroy_all
Conversation.destroy_all

# Seed data for roles
admin_role = Role.create(role: 'Admin', description: 'Administrator role')

# Seed data for agents table
Agent.create(email: 'triage@gmail.com', username: 'triage', password: 'password', role_id: admin_role.id)
Agent.create(email: 'sebastianvaron96@gmail.com', username: 'svaronc', password: 'password',
             role_id: admin_role.id)
Agent.create(email: 'glorialimartt@gmail.com', username: 'glowiep', password: 'password',
             role_id: admin_role.id)

# Seed data for statuses
Status.create(description: 'Open')
Status.create(description: 'Closed')

# Create some tickets
10.times do |i|
  ticket = Ticket.create!(
    title: "Ticket #{i + 1}",
    from_email: "customer#{i + 1}@example.com",
    customer_name: "Customer #{i + 1}",
    agent_id: 1,
    status_id: 1
  )
  6.times do |j|
    ticket.conversations.create!(
      body: "This is the body of conversation #{j + 1}",
      from_customer: j.even?
    )
  end
  Conversation.create!(
    body: "This is the body of ticket #{i + 1}",
    ticket_id: ticket.id
  )
end
