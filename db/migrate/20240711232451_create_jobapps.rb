class CreateJobapps < ActiveRecord::Migration[7.0]
  def change
    create_table :jobapps do |t|
      t.text :desc
      t.string :status
      t.string :location
      t.string :title
      t.string :address
      t.string :posting_url
      t.datetime :date_applied
      t.datetime :date_responded
      t.string :work_hours

      t.timestamps
    end
  end
end
