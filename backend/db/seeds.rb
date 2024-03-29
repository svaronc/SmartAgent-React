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
Request.destroy_all
Status.destroy_all
Ticket.destroy_all

# # Seed data for roles
Role.create(role: "Admin", description: "Administrator role")
Role.create(role: "User", description: "User role")
# # # Seed data for agents table
Agent.create(email: "sebastianvaron96@gmail.com",username: "svaronc", password: "password", role_id: 1)
Agent.create(email: "glorialimartt@gmail.com",username: "glowiep", password: "password", role_id: 1)

# # Seed data for requests
Request.create(from_email: "john@example.com", body: "This is a test request", customer_name: "John Doe", title: "Test Request 1")
Request.create(from_email: "jane@example.com", body: "This is another test request", customer_name: "Jane Smith", title: "Test Request 2")


# # Seed data for statuses
Status.create(description: "Open")
Status.create(description: "Closed")

# # Seed data for tickets
Ticket.create(agent_id: 1, request_id: 1, status_id: 1)
Ticket.create(agent_id: 2, request_id: 2, status_id: 1)