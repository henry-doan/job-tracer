class Jobapp < ApplicationRecord
  belongs_to :user 
  has_many :notes, dependent: :destroy
  has_many :interviews, dependent: :destroy

  scope :filter_by_status, -> (status) { where status: status }
  scope :filter_by_starts_with, -> (name) { where("location like ?", "#{name}%")}

end
