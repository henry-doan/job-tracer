class Api::JobappsController < ApplicationController
  before_action :set_jobapp, only: [:show, :update, :destroy]

  def index
    render json: current_user.jobapps
  end  
  
  def show
    render json: @jobapp
  end
  
  def create
    @jobapp = current_user.jobapps.new(jobapp_params)
    if @jobapp.save
      render json: @jobapp
    else
      render json: { errors: @jobapp.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    if @jobapp.update(jobapp_params)
      render json: @jobapp
    else
      render json: { errors: @jobapp.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @jobapp.destroy
    render json: { message: 'Job app deleted' }
  end  

  private
    def set_jobapp
      @jobapp = current_user.jobapps.find(params[:id])
    end

    def jobapp_params
      params.require(:jobapp).permit(:desc, :status, :location, :title, :address, :posting_url, :date_applied, :date_responded, :work_hours)
    end
end
