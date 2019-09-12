class CulturalGood < ApplicationRecord
  validates :title, :type, :thematic, :creator_id, presence: true
  belongs_to :creator
  has_many :memories
end
