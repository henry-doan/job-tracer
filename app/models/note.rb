class Note < ApplicationRecord
  belongs_to :jobapp

  validates :subject, :body, presence: true
end
