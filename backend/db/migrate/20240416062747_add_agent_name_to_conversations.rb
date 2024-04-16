class AddAgentNameToConversations < ActiveRecord::Migration[7.1]
  def change
    add_column :conversations, :agent_name, :string
  end
end
