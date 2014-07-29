class CreateTagJoins < ActiveRecord::Migration
  def change
    create_table :tag_joins do |t|
      t.integer :script_id, null: false
      t.integer :tag_id, null: false
      t.timestamps
    end

    add_index :tag_joins, :script_id
    add_index :tag_joins, :tag_id
  end
end
