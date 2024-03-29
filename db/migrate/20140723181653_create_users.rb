class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :encrypted_pass, null: false
      t.string :session_token, null: false
      
      t.timestamps
    end
    
    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
  end
end
