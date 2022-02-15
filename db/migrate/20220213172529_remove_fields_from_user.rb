class RemoveFieldsFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :name, :string
    remove_column :users, :company, :string
    remove_column :users, :status, :string
    remove_column :users, :last_update, :string
    remove_column :users, :notes, :string
    
  end
end
