class Creator < ApplicationRecord
	validates :name, presence: true
	has_many :cultural_goods
	has_many :memories, through: :cultural_goods
end
