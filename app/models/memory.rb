class Memory < ApplicationRecord
  validates :date, :rating, :user_id, :venue_id, :cultural_good_id, presence: true
  validates :rating, inclusion: { in: 0..5 }
  belongs_to :user
  belongs_to :cultural_good
  belongs_to :venue
end
