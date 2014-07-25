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