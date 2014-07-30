class AddValueToTagJoinTables < ActiveRecord::Migration
  def change
    add_column :tag_joins, :value, :integer
    change_column :tag_joins, :value, :integer, null: true
  end
end
