class CreateRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :requests do |t|
      t.string :from_email
      t.string :to_email
      t.text :body
      t.timestamps
    end
  end
end
