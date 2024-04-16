class AddForeignKeyToConversations < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :conversations, :agents
    add_index :conversations, :agent_id
  end
end
