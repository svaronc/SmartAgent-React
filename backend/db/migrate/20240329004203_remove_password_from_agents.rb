class RemovePasswordFromAgents < ActiveRecord::Migration[7.1]
  def change
    remove_column :agents, :password, :string
  end
end
