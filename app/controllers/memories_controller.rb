class MemoriesController < ApplicationController
	before_action :set_memory, only: [:show, :edit, :update, :destroy]

	def home
		@memories = Memory.all
		@memory = Memory.new
	end

	def show
	end

	def new
		@memory = Memory.new
	end

	def create
		@memory = Memory.new(memories_params)
		@memory.user = current_user
		if @memory.save
		  redirect_to root_path
		else
		  render :new
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
	  params.require(:memories).permit(:date, :rating, :review, cultural_goods_attributes: [:title, :type, :thematic, creators_attributes: [:name]])
	end
end
