class PagesController < ApplicationController
  layout 'simple', only: :install_script
  skip_before_action :verify_authenticity_token, only: :install_script

  def root
  end

  def install_script
    @chosen_script = Script.find(params[:id]);
    if @chosen_script
      respond_to do |format|
        format.js do
          @chosen_script.downloads += 1
          @chosen_script.save!
          render :install
        end
      end
    else
      render nothing: true, status: :not_found
    end
  end
end
