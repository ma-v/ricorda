class MemoriesController < ApplicationController
	before_action :set_memory, only: [:show, :edit, :update, :destroy]

	def home
		@memories = policy_scope(Memory)
		@memory = current_user.memories.new
		authorize @memory
		cultural_good = @memory.build_cultural_good
		cultural_good.build_creator
		@memory.build_venue
	end

	def show
	end

	def create
		@memory = current_user.memories.new(memories_params)
		authorize @memory
		if @memory.save
		  redirect_to root_path
		else
		  render :home
		end
	end

	def edit
	end

	def update
		@memory.update(memories_params)
		redirect_to root_path, notice: "Your memory has been updated !"
	end

	def destroy
		@memory.destroy
		redirect_to root_path, notice: "Your memory has been deleted !"
	end

	private

	def set_memory
		@memory = Memory.find(params[:id])
		authorize @memory
	end

	def memories_params
	  params.require(:memory).permit(:date, :rating, :review, venue_attributes: [:name], cultural_good_attributes: [:title, :cultural_type, :thematic, :movie_db_id, creator_attributes: [:name]])
	end
end
