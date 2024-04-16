class AddAgentIdToConversations < ActiveRecord::Migration[7.1]
  def change
    add_column :conversations, :agent_id, :integer
  end
end
