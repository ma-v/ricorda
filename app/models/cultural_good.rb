class CulturalGood < ApplicationRecord
  validates :title, :cultural_type, :thematic, :creator, presence: true
  validates :cultural_type, inclusion: { in: ["Exhibition", "Cinema", "Book", "Comic", "Stand-up", "Theatre", "Opera", "Dancing", "Concert", "TV Show", "Documentary"] }
  belongs_to :creator
  has_many :memories
  accepts_nested_attributes_for :creator
  before_save :find_or_create_creator

  private

  def find_or_create_creator
    self.creator = Creator.find_or_create_by(name: creator.name)
  end
end
