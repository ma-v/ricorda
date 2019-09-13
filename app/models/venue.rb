class Venue < ApplicationRecord
	validates :name, presence: true
	has_many :memories
end
