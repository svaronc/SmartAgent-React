class AddReadToDirectChats < ActiveRecord::Migration[7.1]
  def change
    add_column :direct_chats, :read, :boolean, default: false
  end
end
