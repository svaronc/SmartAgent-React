class CreateAgents < ActiveRecord::Migration[7.1]
  def change
    create_table :agents do |t|
      t.string :username
      t.string :password
      t.string :role
      t.timestamps
    end
  end
end
