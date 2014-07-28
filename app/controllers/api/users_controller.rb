module Api
  class UsersController < ApplicationController
    def create
      newbie = User.new(user_params)
    
      if newbie.save
        login!(newbie)
        render json: newbie
      else
        render json: newbie.errors.full_messages.join('. '),
               status: :unprocessable_entity
      end
    end

    def show
      @found_user = User.find(params[:id])
      @total_downloads = @found_user.scripts().sum(:downloads)
      @total_scripts = @found_user.scripts().count

      if @found_user
        render :show
      else
        render json: "User not found",
               status: :not_found
      end
    end
  
    def update
      if current_user.update(user_params)
        current_user.save!
        render json: current_user
      else
        render json: current_user.errors.full_messages.join('. '),
               status: :unprocessable_entity
      end
    end
    
    private
    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
  end
end