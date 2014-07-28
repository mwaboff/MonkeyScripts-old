module Api
  class ScriptsController < ApplicationController
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
        render json: "Script not found",
               status: :not_found
      end
    end

    def destroy
    end

    def update
    end

    private
    def script_params
      params.require(:script).permit(:title, :description, :code)
    end
  end
end