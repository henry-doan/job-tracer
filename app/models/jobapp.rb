class Jobapp < ApplicationRecord
  belongs_to :user 
  has_many :notes, dependent: :destroy
  has_many :interviews, dependent: :destroy
end
