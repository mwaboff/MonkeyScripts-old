class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  helper_method :current_user
  
  def current_user
    @chosen_one ||= User.find_by_session_token(session[:session_token])
  end
  
  def login!(lucky_user)
    session[:session_token] = lucky_user.reset_session_token!
  end
  
  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end
end