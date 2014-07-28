class AddShortDescriptionToScripts < ActiveRecord::Migration
  def change
    add_column :scripts, :short_desc, :text
    change_column :scripts, :short_desc, :text, null: false
  end
end
