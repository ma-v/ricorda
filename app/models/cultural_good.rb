class CulturalGood < ApplicationRecord
  validates :title, :type, :thematic, :creator_id, presence: true
  validates :type, inclusion: { in: ["Exhibition", "Cinema", "Book", "Comic", "Stand-up", "Theatre", "Opera", "Dancing", "Concert", "TV Show", "Documentary"] }
  belongs_to :creator
  has_many :memories
end
