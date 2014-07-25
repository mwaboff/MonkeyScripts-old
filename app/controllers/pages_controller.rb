class PagesController < ApplicationController
  layout 'simple', only: :install_script
  
  def root
  end

  def install_script
    @chosen_script = Script.find(params[:id]);
    if @chosen_script
      render :install
    else
      render json: "not found", status: :not_found
    end
  end
end
