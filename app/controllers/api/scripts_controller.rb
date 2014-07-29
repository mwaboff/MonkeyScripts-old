module Api
  class ScriptsController < ApplicationController

    before_action :correct_user, only: [:update, :destroy]
    def create
      baby_script = Script.new(script_params)
      baby_script.user_id = current_user.id

      if baby_script.save
        render json: baby_script
      else
        render json: baby_script.errors.full_messages,
               status: :unprocessable_entity
      end
    end

    def show
      @found_script = Script.find(params[:id])

      if @found_script
        render :show
      else
        flash[:errors] = "Script not found"
        render json: flash[:errors],
               status: :not_found
      end
    end

    def index
      @all_scripts = Script.all
      @latest_scripts = Script.last(6).reverse
    end

    def destroy
    end

    def update
      @found_script ||= Script.find(params[:id])

      if @found_script.update(script_params)
        render json: @found_script
      else
        render @found_script.errors.full_message,
        status: :unprocessable_entity
      end
    end

    private
    def script_params
      params.require(:script).permit(:title, :short_desc, :description, :code)
    end

    def correct_user
      @found_script = Script.find(params[:id])
      unless @found_script.user_id.to_i == current_user.id
        flash[:errors] = "This is not your script to edit!"
        render json: flash[:errors],
               status: :unauthorized
      end
    end
  end
end