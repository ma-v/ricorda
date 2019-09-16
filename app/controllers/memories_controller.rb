class MemoriesController < ApplicationController
	before_action :set_memory, only: [:show, :edit, :update, :destroy]

	def home
		@memories = Memory.all
		@memory = Memory.new
		cultural_good = @memory.build_cultural_good
		cultural_good.build_creator
		@memory.build_venue
	end

	def show
	end

	# def new
	# 	@memory = Memory.new
	# end

	def create
		@memory = Memory.new(memories_params)
		@memory.user = current_user
		if @memory.save
		  redirect_to root_path
		else
		  puts "-------------"
		  puts @memory.errors.to_h
		  render :home
		end
	end

	def edit
	end

	def update
	end

	def delete
	end

	private

	def set_memory
		@memory = Memory.find(params[:id])
	end

	def memories_params
	  params.require(:memory).permit(:date, :rating, :review, :venue_id, venue_attributes: [:name, :id], cultural_good_attributes: [:title, :cultural_type, :thematic, creator_attributes: [:name]])
	end
end
