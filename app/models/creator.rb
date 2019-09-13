class Creator < ApplicationRecord
	validates :name, presence: true
	has_many :cultural_goods
end
