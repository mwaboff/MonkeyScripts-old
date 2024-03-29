# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140730184759) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "scripts", force: true do |t|
    t.string   "title",                   null: false
    t.text     "description"
    t.text     "code"
    t.integer  "downloads",   default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "short_desc",              null: false
    t.integer  "user_id",                 null: false
  end

  add_index "scripts", ["title"], name: "index_scripts_on_title", using: :btree

  create_table "tag_joins", force: true do |t|
    t.integer  "script_id",  null: false
    t.integer  "tag_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "value"
  end

  add_index "tag_joins", ["script_id"], name: "index_tag_joins_on_script_id", using: :btree
  add_index "tag_joins", ["tag_id"], name: "index_tag_joins_on_tag_id", using: :btree

  create_table "tags", force: true do |t|
    t.string   "tag_name",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tags", ["tag_name"], name: "index_tags_on_tag_name", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "email",          null: false
    t.string   "username",       null: false
    t.string   "encrypted_pass", null: false
    t.string   "session_token",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
