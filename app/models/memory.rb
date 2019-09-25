class Memory < ApplicationRecord
  validates :date, :rating, :user_id, :venue, :cultural_good, presence: true
  validates :rating, inclusion: { in: 0..5 }
  belongs_to :user
  belongs_to :cultural_good
  belongs_to :venue
  accepts_nested_attributes_for :cultural_good
  accepts_nested_attributes_for :venue
  before_save :find_or_create_cultural_good

  private

  def find_or_create_cultural_good
    self.cultural_good = CulturalGood.find_or_create_by(movie_db_id: cultural_good.movie_db_id)
  end
end
