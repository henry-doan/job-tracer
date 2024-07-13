class AddJobapptoUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :jobapps, :user, foreign_key: true
  end
end
