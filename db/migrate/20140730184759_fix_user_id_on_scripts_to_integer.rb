class FixUserIdOnScriptsToInteger < ActiveRecord::Migration
  def change
    remove_column :scripts, :user_id
    add_column :scripts, :user_id, :integer, null: false
  end
end
