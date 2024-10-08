# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_08_28_195958) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "interviews", force: :cascade do |t|
    t.string "stage"
    t.datetime "when"
    t.bigint "jobapp_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jobapp_id"], name: "index_interviews_on_jobapp_id"
  end

  create_table "jobapps", force: :cascade do |t|
    t.text "desc"
    t.string "status"
    t.string "location"
    t.string "title"
    t.string "address"
    t.string "posting_url"
    t.datetime "date_applied"
    t.datetime "date_responded"
    t.string "work_hours"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_jobapps_on_user_id"
  end

  create_table "notes", force: :cascade do |t|
    t.string "subject"
    t.text "body"
    t.bigint "jobapp_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jobapp_id"], name: "index_notes_on_jobapp_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sign_in_count", default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "interviews", "jobapps"
  add_foreign_key "jobapps", "users"
  add_foreign_key "notes", "jobapps"
end
