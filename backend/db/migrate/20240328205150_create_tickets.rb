class CreateTickets < ActiveRecord::Migration[7.1]
  def change
    create_table :tickets do |t|
      t.references :agent, null: false, foreign_key: true
      t.references :customer, null: false, foreign_key: true
      t.references :request, null: false, foreign_key: true
      t.references :status, null: false, foreign_key: true
      t.timestamps
    end
  end
end
