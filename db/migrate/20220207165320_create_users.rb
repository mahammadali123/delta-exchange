class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :company
      t.string :status
      t.string :last_update
      t.string :notes

      t.timestamps
    end
  end
end
