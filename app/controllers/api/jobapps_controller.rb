class Api::JobappsController < ApplicationController
  before_action :set_jobapp, only: [:show, :update, :destroy]

  def index
    @jobapps = current_user.jobapps.order(:created_at)
    # weird bug of when going to a diffent status then back to all it returns empty need to debug more
    @jobapps = current_user.jobapps.filter_by_status(params[:status]) if params[:status].present? && params[:status] != 'ALL'
    @jobapps = current_user.jobapps.filter_by_starts_with(params[:term]) if params[:term].present?
    @jobapps = @jobapps.paginate(page: params[:page], per_page: 25)
    render json: { 
      jobapps: @jobapps, 
      current_page: @jobapps.current_page, 
      total_pages: @jobapps.total_pages, 
    }
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

  def jobapp_stats
    status_counts = User.first.jobapps.group(:status).count

    total_jobapp = status_counts.values.sum
    total_applied = status_counts["Applied"] || 0
    total_rejected = status_counts["Rejected"] || 0
    total_pending = status_counts["Pending"] || 0
    total_offer = status_counts["Offer"] || 0
    total_hired = status_counts["Hired"] || 0

    render json: { 
      total_jobapps: total_jobapp, 
      applied: total_applied, 
      rejected: total_rejected, 
      pending: total_pending, 
      offer: total_offer, 
      hired: total_hired, 
    }
  end

  def total_interview_count
    @total_interview_count = current_user.jobapps.joins(:interviews).count
    render json: @total_interview_count
  end

  def unique_interview_count
    @unique_interview_count = current_user.jobapps.joins(:interviews).distinct.count('interviews.jobapp_id')
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
