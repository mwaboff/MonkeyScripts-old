module Api
  class SessionsController < ApplicationController
    def create
      attempted_user = User.find_by_credentials(session_params[:email], 
                                                session_params[:password])
      if attempted_user
        login!(attempted_user)
        render json: attempted_user
      else
        render json: "Email or Password is incorrect.", status: :unprocessable_entity
      end
    end
  
    def destroy
      logout!
      render json: {}
    end
  
    private
    def session_params
      params.require(:session).permit(:email, :password)
    end
  end
end