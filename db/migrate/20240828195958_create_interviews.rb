class CreateInterviews < ActiveRecord::Migration[7.0]
  def change
    create_table :interviews do |t|
      t.string :stage
      t.datetime :when
      t.belongs_to :jobapp, null: false, foreign_key: true

      t.timestamps
    end
  end
end
