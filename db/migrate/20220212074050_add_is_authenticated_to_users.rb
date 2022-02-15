class AddIsAuthenticatedToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :isAuthenticated, :boolean , :default => false
  end
end
