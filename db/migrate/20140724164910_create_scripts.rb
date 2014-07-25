class CreateScripts < ActiveRecord::Migration
  def change
    create_table :scripts do |t|
      t.string :title, null: false
      t.string :user_id, null: false
      t.text :description
      t.text :code
      t.integer :downloads, default: 0
      t.timestamps
    end

    add_index :scripts, :title
    add_index :scripts, :user_id
  end
end
