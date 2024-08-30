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

  def total_interview_count
    @total_interview_count = 0

    current_user.jobapps.each do |j|
      @total_interview_count += j.interviews.count
    end
    
    render json: @total_interview_count
  end

  def unique_interview_count
    @all_interviews = current_user.jobapps.collect { |jobapp| jobapp.interviews }.sum
    @unique_interview_count = @all_interviews.pluck(:jobapp_id).uniq.count
    
    render json: @unique_interview_count
  end

  private
    def set_jobapp
      @jobapp = current_user.jobapps.find(params[:id])
    end

    def jobapp_params
      params.require(:jobapp).permit(:desc, :status, :location, :title, :address, :posting_url, :date_applied, :date_responded, :work_hours)
    end
end
