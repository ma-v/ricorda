class Memory < ApplicationRecord
  validates :date, :rating, :user_id, :venue, :cultural_good, presence: true
  validates :rating, inclusion: { in: 0..5 }
  belongs_to :user
  belongs_to :cultural_good
  belongs_to :venue
  accepts_nested_attributes_for :cultural_good
  accepts_nested_attributes_for :venue
end
