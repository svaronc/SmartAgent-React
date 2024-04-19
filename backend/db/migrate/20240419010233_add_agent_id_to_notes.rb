class AddAgentIdToNotes < ActiveRecord::Migration[7.1]
  def change
    add_reference :notes, :agent, null: false, foreign_key: true
  end
end
