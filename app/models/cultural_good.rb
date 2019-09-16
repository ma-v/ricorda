class CulturalGood < ApplicationRecord
  validates :title, :cultural_type, :thematic, :creator, presence: true
  validates :cultural_type, inclusion: { in: ["Exhibition", "Cinema", "Book", "Comic", "Stand-up", "Theatre", "Opera", "Dancing", "Concert", "TV Show", "Documentary"] }
  belongs_to :creator
  has_many :memories
  accepts_nested_attributes_for :creator
end
